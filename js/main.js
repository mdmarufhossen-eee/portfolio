import { config } from "./config.js";
import * as theme from "./theme.js";
import * as nav from "./nav.js";
import * as render from "./render.js";
import * as reveal from "./reveal.js";
import * as form from "./form.js";

function setupLinks() {
  const set = (id, href) => {
    const el = document.getElementById(id);
    if (el && href) {
      el.href = href;
      el.hidden = false;
    }
  };
  set("github-link", config.github);
  set("linkedin-link", config.linkedin);
  const cv = document.getElementById("cv-btn");
  if (cv && config.cvPath) {
    cv.href = config.cvPath;
    cv.hidden = false;
    cv.addEventListener("click", () => {
      window.open(cv.href, "_blank", "noopener,noreferrer");
    });
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

for (const [name, mod] of Object.entries({ setupLinks: { init: setupLinks }, theme, nav, render, reveal, form })) {
  try {
    const result = mod.init();
    if (result && typeof result.catch === "function") result.catch((e) => console.warn(`${name} failed`, e));
  } catch (e) {
    console.warn(`${name} failed`, e);
  }
}
