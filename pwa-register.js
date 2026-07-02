(() => {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js?v=219", { scope: "/" }).catch(() => {});
  });
})();
