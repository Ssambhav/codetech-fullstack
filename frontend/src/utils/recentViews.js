export function addRecentView(item) {
  const maxItems = 10;
  const stored = JSON.parse(localStorage.getItem("recentViews")) || [];

  const filtered = stored.filter((v) => v.id !== item.id);

  const updated = [item, ...filtered].slice(0, maxItems);
  localStorage.setItem("recentViews", JSON.stringify(updated));
}
