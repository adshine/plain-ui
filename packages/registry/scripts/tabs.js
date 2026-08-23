/**
 * Plain UI - Light-DOM Tabs Micro-controller (<1KB)
 * Accessible roving tabindex, Left/Right/Home/End keyboard navigation, aria-selected.
 * Idempotent init(root) for Static HTML, Astro, and htmx.
 */

const seen = new WeakSet();

export function selectTab(tab, focus = true) {
  const list = tab?.closest?.('[role="tablist"]');
  if (!list) return;
  list.querySelectorAll('[role="tab"]').forEach((t) => {
    const sel = t === tab;
    t.setAttribute("aria-selected", String(sel));
    t.setAttribute("tabindex", sel ? "0" : "-1");
    t.dataset.state = sel ? "active" : "inactive";
    const panelId = t.getAttribute("aria-controls");
    if (panelId) {
      const panel = document.getElementById(panelId) || list.parentElement?.querySelector(`#${panelId}`);
      if (panel) {
        panel.hidden = !sel;
        panel.dataset.state = sel ? "active" : "inactive";
      }
    }
  });
  if (focus) tab.focus();
  tab.dispatchEvent(new CustomEvent("tab-change", { bubbles: true, detail: { tab, value: tab.dataset.value || tab.id } }));
}

export function init(root = document) {
  const lists = root.matches?.('[role="tablist"]') ? [root] : Array.from(root.querySelectorAll?.('[role="tablist"]') || []);
  lists.forEach((list) => {
    if (seen.has(list)) return;
    seen.add(list);

    list.addEventListener("click", (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (tab && list.contains(tab)) selectTab(tab, false);
    });

    list.addEventListener("keydown", (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (!tab || !list.contains(tab)) return;
      const tabs = Array.from(list.querySelectorAll('[role="tab"]:not([disabled])'));
      const i = tabs.indexOf(tab);
      if (i === -1) return;

      const vert = list.getAttribute("aria-orientation") === "vertical";
      const keys = {
        [vert ? "ArrowDown" : "ArrowRight"]: (i + 1) % tabs.length,
        [vert ? "ArrowUp" : "ArrowLeft"]: (i - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      };

      if (e.key in keys) {
        e.preventDefault();
        selectTab(tabs[keys[e.key]], true);
      }
    });
  });
}

export const initTabs = init;
export default { init, selectTab };