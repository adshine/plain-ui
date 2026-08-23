/**
 * Plain UI - Light-DOM Toast Queue Manager (<1KB)
 * Native popover="manual" queue, auto-dismiss with hover pause, type presets, and HTML trigger binding.
 * Idempotent init(root) for Static HTML, Astro, and htmx.
 */

let cont = null;
const seen = new WeakSet();

const ICONS = {
  success: '<svg class="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7"/><path fill="#fff" d="M11.3 5.3l-4.6 5-2-2 .7-.7 1.3 1.3 3.9-4.3z"/></svg>',
  error: '<svg class="w-4 h-4 text-rose-500 shrink-0" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7"/><path stroke="#fff" stroke-width="1.5" d="M5.5 5.5l5 5m0-5l-5 5"/></svg>',
  warning: '<svg class="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l7 13H1z"/><path fill="#fff" d="M7 6h2v4H7zm0 5h2v2H7z"/></svg>',
  info: '<svg class="w-4 h-4 text-sky-500 shrink-0" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7"/><path fill="#fff" d="M7 4h2v2H7zm0 3h2v5H7z"/></svg>'
};

function getContainer() {
  if (cont && document.body.contains(cont)) return cont;
  cont = document.getElementById("plain-toast-container");
  if (!cont) {
    cont = document.createElement("div");
    cont.id = "plain-toast-container";
    cont.setAttribute("popover", "manual");
    cont.setAttribute("aria-live", "polite");
    cont.setAttribute("aria-atomic", "true");
    cont.className = "fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none p-0 m-0 border-0 bg-transparent overflow-visible";
    document.body.appendChild(cont);
    if (typeof cont.showPopover === "function") {
      try { cont.showPopover(); } catch (_) {}
    }
  }
  return cont;
}

export function dismissToast(el) {
  if (!el || el._done) return;
  el._done = true;
  el.style.opacity = "0";
  el.style.transform = "translateY(12px) scale(0.95)";
  el.style.transition = "all 150ms cubic-bezier(0.4, 0, 1, 1)";
  setTimeout(() => el.remove(), 160);
}

export function createToast(msg, opts = {}) {
  const c = getContainer();
  const opt = typeof opts === "string" ? { description: opts } : opts;
  const { type = "default", description = "", duration = 4000, action = null, dismissible = true } = opt;

  const el = document.createElement("div");
  el.className = "pointer-events-auto flex items-start gap-3 w-80 sm:w-96 p-4 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur text-zinc-900 dark:text-zinc-100 text-sm transition-all duration-200 ease-out transform translate-y-2 opacity-0";

  const icon = ICONS[type] || "";
  const act = action?.label ? `<button type="button" class="plain-toast-action ml-auto text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-opacity">${action.label}</button>` : "";
  const close = dismissible ? '<button type="button" class="plain-toast-close text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5 rounded ml-auto" aria-label="Close"><svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>' : "";

  el.innerHTML = `${icon}<div class="flex-1 min-w-0"><div class="font-medium leading-5">${msg}</div>${description ? `<div class="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-normal">${description}</div>` : ""}</div>${act}${close}`;

  if (action?.onClick) {
    el.querySelector(".plain-toast-action")?.addEventListener("click", (e) => {
      action.onClick(e);
      dismissToast(el);
    });
  }

  el.querySelector(".plain-toast-close")?.addEventListener("click", () => dismissToast(el));
  c.appendChild(el);

  requestAnimationFrame(() => {
    el.classList.remove("translate-y-2", "opacity-0");
    el.classList.add("translate-y-0", "opacity-100");
  });

  if (duration > 0) {
    let rem = duration, start = Date.now(), t = null;
    const run = () => { start = Date.now(); t = setTimeout(() => dismissToast(el), rem); };
    const pause = () => { clearTimeout(t); rem -= Date.now() - start; };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", run);
    run();
  }

  return el;
}

export const toast = (msg, opts) => createToast(msg, opts);
toast.success = (msg, opts) => createToast(msg, { ...opts, type: "success" });
toast.error = (msg, opts) => createToast(msg, { ...opts, type: "error" });
toast.warning = (msg, opts) => createToast(msg, { ...opts, type: "warning" });
toast.info = (msg, opts) => createToast(msg, { ...opts, type: "info" });
toast.dismiss = dismissToast;

export function init(root = document) {
  if (seen.has(root)) return;
  seen.add(root);

  root.addEventListener("click", (e) => {
    const trg = e.target.closest("[data-toast]");
    if (trg) {
      const msg = trg.dataset.toast;
      const desc = trg.dataset.toastDescription || "";
      const type = trg.dataset.toastType || "default";
      const dur = trg.dataset.toastDuration ? parseInt(trg.dataset.toastDuration, 10) : 4000;
      createToast(msg, { description: desc, type, duration: dur });
    }
  });
}

export const initToast = init;
export default { init, toast, createToast, dismissToast };