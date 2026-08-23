/**
 * Plain UI - Light-DOM Command Palette Micro-controller (<1KB)
 * Global Cmd+K trigger, keyboard navigation, group search filtering.
 * Idempotent init(root) for Static HTML, Astro, and htmx.
 */

const seen = new WeakSet();

export function openCommand(dlg) {
  if (!dlg) return;
  if (typeof dlg.showModal === "function" && !dlg.open) dlg.showModal();
  else {
    dlg.removeAttribute("hidden");
    dlg.setAttribute("aria-hidden", "false");
    dlg.dataset.state = "open";
  }
  const input = dlg.querySelector("[data-command-input]");
  if (input) {
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  }
}

export function closeCommand(dlg) {
  if (!dlg) return;
  if (typeof dlg.close === "function" && dlg.open) dlg.close();
  else {
    dlg.setAttribute("hidden", "");
    dlg.setAttribute("aria-hidden", "true");
    dlg.dataset.state = "closed";
  }
}

export function init(root = document) {
  if (typeof window !== "undefined" && !window._cmdInit) {
    window._cmdInit = true;
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        const dlg = document.querySelector("[data-command-dialog]");
        if (dlg) {
          e.preventDefault();
          (dlg.open || dlg.dataset.state === "open") ? closeCommand(dlg) : openCommand(dlg);
        }
      }
    });
  }

  root.querySelectorAll?.("[data-command-trigger]").forEach((t) => {
    if (seen.has(t)) return;
    seen.add(t);
    t.addEventListener("click", (e) => {
      e.preventDefault();
      const id = t.dataset.commandTrigger;
      const dlg = id ? document.getElementById(id) : document.querySelector("[data-command-dialog]");
      if (dlg) openCommand(dlg);
    });
  });

  const dialogs = root.matches?.("[data-command-dialog]") ? [root] : Array.from(root.querySelectorAll?.("[data-command-dialog]") || []);
  dialogs.forEach((dlg) => {
    if (seen.has(dlg)) return;
    seen.add(dlg);

    const input = dlg.querySelector("[data-command-input]");
    const list = dlg.querySelector("[data-command-list]");
    const empty = dlg.querySelector("[data-command-empty]");
    if (!input || !list) return;

    let active = 0;
    const items = () => Array.from(list.querySelectorAll("[data-command-item]:not([hidden])"));

    const setActive = (idx) => {
      const opts = items();
      opts.forEach((it) => {
        it.removeAttribute("data-active");
        it.classList.remove("is-active");
        it.setAttribute("aria-selected", "false");
      });
      if (opts.length > 0) {
        active = Math.max(0, Math.min(idx, opts.length - 1));
        const it = opts[active];
        it.setAttribute("data-active", "true");
        it.setAttribute("aria-selected", "true");
        it.classList.add("is-active");
        input.setAttribute("aria-activedescendant", it.id || "");
        it.scrollIntoView({ block: "nearest" });
      } else {
        active = -1;
        input.removeAttribute("aria-activedescendant");
      }
    };

    const filter = (val = "") => {
      const q = val.trim().toLowerCase();
      const grps = Array.from(dlg.querySelectorAll("[data-command-group]"));
      let total = 0;
      if (grps.length > 0) {
        grps.forEach((g) => {
          let gc = 0;
          g.querySelectorAll("[data-command-item]").forEach((it) => {
            const hit = !q || (it.dataset.value || it.textContent || "").toLowerCase().includes(q);
            it.hidden = !hit;
            if (hit) { gc++; total++; }
          });
          g.hidden = gc === 0;
        });
      } else {
        list.querySelectorAll("[data-command-item]").forEach((it) => {
          const hit = !q || (it.dataset.value || it.textContent || "").toLowerCase().includes(q);
          it.hidden = !hit;
          if (hit) total++;
        });
      }
      if (empty) empty.hidden = total > 0;
      setActive(0);
    };

    const exec = (it) => {
      if (!it) return;
      closeCommand(dlg);
      dlg.dispatchEvent(new CustomEvent("command-select", { bubbles: true, detail: { value: it.dataset.value || it.textContent.trim(), item: it } }));
      if (it.tagName === "A" && it.href) window.location.href = it.href;
      else it.click();
    };

    input.addEventListener("input", () => filter(input.value));

    dlg.addEventListener("keydown", (e) => {
      const opts = items();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((active + 1) % (opts.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((active - 1 + opts.length) % (opts.length || 1));
      } else if (e.key === "Enter" && opts[active]) {
        e.preventDefault();
        exec(opts[active]);
      } else if (e.key === "Escape") {
        closeCommand(dlg);
      }
    });

    list.addEventListener("click", (e) => {
      const it = e.target.closest("[data-command-item]");
      if (it) exec(it);
    });

    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) closeCommand(dlg);
    });

    dlg.querySelectorAll("[data-command-close]").forEach((btn) => {
      btn.addEventListener("click", () => closeCommand(dlg));
    });
  });
}

export const initCommand = init;
export default { init, open: openCommand, close: closeCommand };