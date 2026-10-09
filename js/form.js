import { config } from "./config.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function init() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");
  const submit = document.getElementById("form-submit");
  const fields = ["name", "email", "message"].map((n) => ({
    input: form.elements[n],
    error: document.getElementById(`f-${n}-err`),
    name: n,
  }));

  if (config.formEndpoint) form.action = config.formEndpoint;

  const show = (state, text) => {
    status.hidden = false;
    status.dataset.state = state;
    status.textContent = text;
  };

  function validate() {
    let first = null;
    for (const f of fields) {
      const v = f.input.value.trim();
      let msg = "";
      if (!v) msg = "This field is required.";
      else if (f.name === "email" && !EMAIL_RE.test(v)) msg = "Enter a valid email address.";
      f.error.textContent = msg;
      f.input.setAttribute("aria-invalid", String(Boolean(msg)));
      if (msg && !first) first = f.input;
    }
    first?.focus();
    return !first;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.hidden = true;
    if (!validate()) return;
    if (form.elements._gotcha.value) return; // honeypot: silently drop

    const data = Object.fromEntries(fields.map((f) => [f.name, f.input.value.trim()]));

    if (!config.formEndpoint) {
      // No form backend configured yet: open the visitor's mail app with the message pre-filled.
      const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
      show("success", "Opening your email app. If nothing happens, email me directly at " + config.email + ".");
      return;
    }

    submit.disabled = true;
    try {
      const res = await fetch(config.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      show("success", "Thanks! Your message was sent. I'll reply soon.");
    } catch (err) {
      show("error", "Something went wrong. Please try again or email me directly.");
    } finally {
      submit.disabled = false;
    }
  });
}
