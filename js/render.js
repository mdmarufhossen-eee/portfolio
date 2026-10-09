import { bindFilter } from "./filter.js";

const LABELS = { web: "Web", hardware: "Hardware", analysis: "Analysis" };

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null) continue;
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  node.append(...children.filter(Boolean));
  return node;
}

async function load(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.json();
}

function safeUrl(u) {
  if (!u || typeof u !== "string") return null;
  try {
    const url = new URL(u, location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch (e) {
    return null;
  }
}

function message(container, text) {
  container.replaceChildren(el("p", { class: "empty-state", text }));
}

/* Skills */
async function renderSkills() {
  const list = document.getElementById("skill-list");
  const desc = document.getElementById("skill-desc");
  const filters = document.getElementById("skill-filters");
  if (!list) return;
  let skills;
  try {
    skills = await load("content/skills.json");
  } catch (e) {
    list.replaceChildren(el("li", { text: "Skills could not be loaded. Please refresh." }));
    return;
  }
  const draw = (cat) => {
    const shown = skills.filter((s) => cat === "all" || s.category === cat);
    // MATLAB is in two categories; show unique names within "All".
    const seen = new Set();
    const items = shown.filter((s) => !seen.has(s.name) && seen.add(s.name));
    list.replaceChildren(
      ...items.map((s) => {
        const b = el("button", { class: "badge", type: "button", "aria-pressed": "false", text: s.name });
        b.addEventListener("click", () => {
          list.querySelectorAll(".badge").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          desc.textContent = `${s.name}: ${s.description}`;
        });
        return el("li", {}, b);
      })
    );
    desc.textContent = `${items.length} skill${items.length === 1 ? "" : "s"} shown. Select one to see details.`;
  };
  draw("all");
  bindFilter(filters, draw);
}

/* Projects */
function projectCard(p) {
  const links = [];
  const demo = safeUrl(p.links?.demo);
  const src = safeUrl(p.links?.source);
  if (demo) links.push(el("a", { class: "btn btn--primary", href: demo, target: "_blank", rel: "noopener noreferrer", text: "Live Demo" }));
  if (src) links.push(el("a", { class: "btn btn--secondary", href: src, target: "_blank", rel: "noopener noreferrer", text: "GitHub" }));
  return el(
    "article",
    { class: "card project", "data-category": p.category },
    el(
      "div",
      { class: "project__body" },
      el("p", { class: "project__cat", text: `${LABELS[p.category] || p.category}${p.year ? ` · ${p.year}` : ""}` }),
      el("h3", { class: "card__title", text: p.title }),
      el("p", { text: p.summary }),
      el("ul", { class: "tags", role: "list" }, ...(p.tags || []).map((t) => el("li", { class: "tag", text: t }))),
      links.length ? el("div", { class: "actions" }, ...links) : null
    )
  );
}

async function renderProjects() {
  const list = document.getElementById("project-list");
  const count = document.getElementById("project-count");
  if (!list) return;
  let projects;
  try {
    projects = await load("content/projects.json");
  } catch (e) {
    message(list, "Projects could not be loaded. Please refresh.");
    return;
  }
  const draw = (cat) => {
    const shown = projects.filter((p) => cat === "all" || p.category === cat);
    if (!shown.length) {
      message(list, `No ${LABELS[cat] || ""} projects yet. New work is added as I build it.`);
    } else {
      list.replaceChildren(...shown.map(projectCard));
    }
    if (count) count.textContent = `${shown.length} project${shown.length === 1 ? "" : "s"} shown`;
  };
  draw("all");
  bindFilter(document.getElementById("project-filters"), draw);
}

/* Simple list sections: hidden entirely when there is no data */
async function renderList(path, sectionId, listId, build) {
  const section = document.getElementById(sectionId);
  const list = document.getElementById(listId);
  if (!section || !list) return;
  try {
    const items = await load(path);
    if (!items.length) return;
    list.replaceChildren(...items.map((i) => el("li", { class: "card" }, ...build(i))));
    section.hidden = false;
  } catch (e) {
    /* optional content; stay hidden */
  }
}

export async function init() {
  await Promise.allSettled([
    renderSkills(),
    renderProjects(),
    renderList("content/achievements.json", "achievements", "achievement-list", (a) => [
      el("h4", { class: "card__title", text: a.title }),
      el("p", { text: [a.issuer, a.date].filter(Boolean).join(" · ") }),
      a.description ? el("p", { text: a.description }) : null,
    ]),
    renderList("content/research.json", "research", "research-list", (r) => {
      const url = safeUrl(r.url);
      return [
        el("h4", { class: "card__title" }, url ? el("a", { href: url, target: "_blank", rel: "noopener noreferrer", text: r.title }) : r.title),
        el("p", { text: [r.type, r.date].filter(Boolean).join(" · ") }),
        r.summary ? el("p", { text: r.summary }) : null,
      ];
    }),
  ]);
}
