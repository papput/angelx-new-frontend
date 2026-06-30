import DOMPurify from "isomorphic-dompurify";

export function sanitizeBlogHtml(html = "") {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "strike",
      "a",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "span",
      "mark",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "title", "class", "style", "id"],
    ALLOW_DATA_ATTR: false,
  });
}
