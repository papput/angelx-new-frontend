export function slugifyAnchor(text = "") {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function stripHtml(html = "") {
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function headingLevel(block) {
  const raw = block.level || "h2";
  const n = parseInt(String(raw).replace(/^h/i, ""), 10);
  return Number.isFinite(n) ? Math.min(6, Math.max(2, n)) : 2;
}

export function extractTocItems(sections = []) {
  const items = [];
  const used = new Set();

  for (const section of sections) {
    for (const block of section.blocks || []) {
      if (block.type !== "heading") continue;
      const level = headingLevel(block);
      const label = stripHtml(block.html) || (block.text || "").trim();
      if (!label) continue;

      let anchorId = block.anchorId || slugifyAnchor(label);
      if (!anchorId) anchorId = `heading-${block.id}`;
      let unique = anchorId;
      let i = 2;
      while (used.has(unique)) {
        unique = `${anchorId}-${i++}`;
      }
      used.add(unique);

      items.push({
        level,
        label,
        anchorId: unique,
        href: `#${unique}`,
      });
    }
  }

  return items;
}
