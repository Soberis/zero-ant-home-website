// 物理层 I18n 锁定：在 JS 加载前，强制同步 html.lang 属性，消除语义抖动
// 此脚本必须在 <head> 中同步加载，早于所有渲染
(function () {
  var pathname = window.location.pathname || "/";
  var lang = pathname === "/en" || pathname.indexOf("/en/") === 0 ? "en" : "zh";
  document.documentElement.setAttribute("lang", lang);
})();
