const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.REACT_APP_API_URL ||
  "https://backend-sh16.onrender.com/api/v1";

export async function fetchPublishedBlogs(params = {}) {
  const search = new URLSearchParams(params).toString();
  const url = `${API_BASE}/blogs${search ? `?${search}` : ""}`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
    credentials: "omit",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to load blogs");
  const json = await res.json();
  return json.data || [];
}

export async function fetchBlogBySlug(slug) {
  const res = await fetch(`${API_BASE}/blogs/${slug}`, {
    next: { revalidate: 60 },
    credentials: "omit",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export function blocksToPlainText(sections = []) {
  return sections
    .flatMap((s) => s.blocks || [])
    .map((b) => {
      if (b.type === "table") return (b.table?.columns || []).join(" ");
      return b.text || "";
    })
    .join(" ")
    .slice(0, 200);
}
