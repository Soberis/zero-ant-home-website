const DEFAULT_RETRY_DELAY_MS = 140;
const PAGE_TRANSITION_DELAY_MS = 460;

interface ScheduleScrollToTopOptions {
  afterTransition?: boolean;
}

function forceScrollToTop(): void {
  if (typeof window === "undefined") {
    return;
  }

  const scrollConfig: ScrollToOptions = {
    top: 0,
    left: 0,
    behavior: "auto",
  };

  const scrollingElement = document.scrollingElement || document.documentElement;

  window.scrollTo(scrollConfig);
  scrollingElement.scrollTo?.(scrollConfig);
  document.body.scrollTo?.(scrollConfig);
  scrollingElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function scheduleScrollToTop(
  options: ScheduleScrollToTopOptions = {}
): void {
  const { afterTransition = false } = options;

  forceScrollToTop();

  window.requestAnimationFrame(() => {
    forceScrollToTop();
  });

  window.setTimeout(() => {
    forceScrollToTop();
  }, DEFAULT_RETRY_DELAY_MS);

  if (!afterTransition) {
    return;
  }

  window.setTimeout(() => {
    forceScrollToTop();
  }, PAGE_TRANSITION_DELAY_MS);
}

export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
