import { ref, onMounted, onUnmounted, nextTick } from 'vue';

export function useAutoScroll(
  scrollRef: any,
  options = { interval: 20, step: 1.5 }
) {
  const timer = ref<any>(null);

  // 自动滚动
  const autoScroll = () => {
    if (!scrollRef.value) return;
    const el = scrollRef.value;
    el.scrollLeft += options.step;
    if (el.scrollLeft >= el.scrollWidth / 2) {
      el.scrollLeft = 0;
    }
  };

  // 暂停自动滚动
  const pauseScroll = () => {
    if (timer.value) clearInterval(timer.value);
  };

  // 恢复自动滚动
  const resumeScroll = () => {
    if (timer.value) clearInterval(timer.value);
    timer.value = setInterval(autoScroll, options.interval);
  };

  // 平滑滚动指定距离
  const smoothScrollBy = (distance: number, duration = 600) => {
    const el = scrollRef.value;
    if (!el) return;
    const start = el.scrollLeft;
    const end = start + distance;
    const startTime = performance.now();
    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      el.scrollLeft = start + (end - start) * eased;
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  };

  onMounted(() => {
    nextTick(() => {
      timer.value = setInterval(autoScroll, options.interval);
    });
  });
  onUnmounted(() => {
    if (timer.value) clearInterval(timer.value);
    timer.value = null;
  });

  return {
    pauseScroll,
    resumeScroll,
    smoothScrollBy,
    autoScroll,
    timer,
  };
}
