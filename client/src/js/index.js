// COMMENT: imports the header
import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";

// COMMENT: defines the main element
const main = document.querySelector("#main");
main.innerHTML = "";

// COMMENT: creates a method to load the spinner
const loadSpinner = () => {
     const spinner = document.createElement("div");
     spinner.classList.add("spinner");
     spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
     main.appendChild(spinner);
};

// COMMENT: creates a new instance of the editor
const editor = new Editor();

// COMMENT: loads the spinner if the editor is undefined
if (typeof editor === "undefined") {
     loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
     // register workbox service worker
     const workboxSW = new Workbox("/src-sw.js");
     workboxSW.register();
} else {
     console.error("Service workers are not supported in this browser.");
}
