(() => {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js?v=221", { scope: "/" }).catch(() => {});
  });
})();
