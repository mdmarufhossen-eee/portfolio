// Wires a button group (buttons with data-filter) to a callback; keeps aria-pressed in sync.
export function bindFilter(group, onChange) {
  if (!group) return;
  group.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    group.querySelectorAll("button[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    onChange(btn.dataset.filter);
  });
}
