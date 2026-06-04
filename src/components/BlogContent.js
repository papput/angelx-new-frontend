"use client";

import "./Blogs.css";

function TableBlock({ block }) {
  const table = block.table || {};
  const columns = table.columns || [];
  const rows = table.rows || [];

  return (
    <div className="blog-table-wrap">
      <table
        className={`blog-table ${table.stripe ? "striped" : ""}`}
      >
        {table.header && columns.length > 0 && (
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block }) {
  if (block.type === "heading") {
    if (block.level === "h3") {
      return <h3 className="blog-block-heading blog-block-heading--h3">{block.text}</h3>;
    }
    return <h2 className="blog-block-heading">{block.text}</h2>;
  }
  if (block.type === "table") {
    return <TableBlock block={block} />;
  }
  return (
    <p className="blog-block-paragraph">
      {block.text?.split("\n").map((line, i, arr) => (
        <span key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

export default function BlogContent({ sections = [] }) {
  return (
    <article className="blog-article-body">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="blog-section">
          {section.title && (
            <div className="blog-section-label">
              <span className="blog-section-label-line" aria-hidden />
              <h2 className="blog-section-title">{section.title}</h2>
            </div>
          )}
          {(section.blocks || []).map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </section>
      ))}
    </article>
  );
}
