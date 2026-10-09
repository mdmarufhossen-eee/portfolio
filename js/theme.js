const root = document.documentElement;
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function current() {
  return root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
}

function paint(btn) {
  const next = current() === "dark" ? "light" : "dark";
  btn.setAttribute("aria-label", `Switch to ${next} theme`);
  const color = current() === "dark" ? "#0b1220" : "#ffffff";
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", color));
}

export function init() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  paint(btn);
  btn.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    paint(btn);
    document.dispatchEvent(new CustomEvent("theme:change", { detail: next }));
  });
  systemDark.addEventListener("change", () => paint(btn));
}
