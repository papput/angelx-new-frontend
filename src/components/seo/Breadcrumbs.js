import Link from "next/link";
import "./Breadcrumbs.css";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={item.url}>
            {i < items.length - 1 ? (
              <Link href={item.url}>{item.name}</Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
            {i < items.length - 1 && <span className="sep">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
