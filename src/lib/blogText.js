export function isExternalHref(href = "") {
  return /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");
}

const INLINE_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export function parseInlineLinks(text = "") {
  if (!text) return [{ type: "text", value: "" }];

  const segments = [];
  let lastIndex = 0;
  let match;

  while ((match = INLINE_LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    segments.push({
      type: "link",
      text: match[1],
      href: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }

  return segments.length ? segments : [{ type: "text", value: text }];
}

export function linkRelForHref(href, target) {
  if (target === "_blank" || isExternalHref(href)) {
    return "noopener noreferrer";
  }
  return undefined;
}

export function linkTargetForHref(href, target) {
  if (target) return target;
  return isExternalHref(href) ? "_blank" : undefined;
}
