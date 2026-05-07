type BaiduAnalyticsCommand = [command: string, ...args: string[]];

const BAIDU_ANALYTICS_SCRIPT_ID = "baidu-analytics";

export function initBaiduAnalytics(): void {
  const siteId = import.meta.env.VITE_BAIDU_ANALYTICS_ID;

  if (!siteId || typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const analyticsWindow = window as Window & {
    _hmt?: BaiduAnalyticsCommand[];
  };

  analyticsWindow._hmt = analyticsWindow._hmt || [];

  if (document.getElementById(BAIDU_ANALYTICS_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = BAIDU_ANALYTICS_SCRIPT_ID;
  script.async = true;
  script.src = `https://hm.baidu.com/hm.js?${encodeURIComponent(siteId)}`;
  document.head.appendChild(script);
}
