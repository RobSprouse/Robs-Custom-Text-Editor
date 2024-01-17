// COMMENT: defines the button that will install the PWA
const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
if (window.matchMedia("(display-mode: standalone)").matches) {
     butInstall.classList.toggle("hidden", true);
     console.log("display-mode is standalone");
} else {
     // COMMENT: defines the event listener for the `beforeinstallprompt` event
     window.addEventListener("beforeinstallprompt", (event) => {
          window.deferredPrompt = event;
          butInstall.classList.toggle("hidden", false);
     });

     // COMMENT: defines the event listener for the `click` event
     butInstall.addEventListener("click", async () => {
          const promptEvent = window.deferredPrompt;
          if (!promptEvent) {
               return;
          }
          promptEvent.prompt();
          window.deferredPrompt = null;
          butInstall.classList.toggle("hidden", true);
     });

     // COMMENT: defines the event listener for the `appinstalled` event
     window.addEventListener("appinstalled", (event) => {
          window.deferredPrompt = null;
     });
}
