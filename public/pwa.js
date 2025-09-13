// PWA Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Install prompt
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show install button or notification
  showInstallPrompt();
});

function showInstallPrompt() {
  // You can show a custom install button here
  console.log("App can be installed");
}

// Handle install button click
window.addEventListener("appinstalled", (evt) => {
  console.log("App was installed");
});

