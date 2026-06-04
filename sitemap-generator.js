const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

async function generateSitemap() {
  const links = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/exchange", changefreq: "daily", priority: 0.9 },
    { url: "/about-us", changefreq: "monthly", priority: 0.6 },
    { url: "/contact-us", changefreq: "monthly", priority: 0.6 },
    { url: "/disclaimer", changefreq: "yearly", priority: 0.5 },
    { url: "/refund-policy", changefreq: "yearly", priority: 0.5 },
    { url: "/terms&conditions", changefreq: "yearly", priority: 0.5 },
    { url: "/profile", changefreq: "weekly", priority: 0.8 },
  ];

  const sitemap = new SitemapStream({
    hostname: "https://angelx.exchange",
  });

  links.forEach((link) => sitemap.write(link));
  sitemap.end();

  const data = await streamToPromise(sitemap);

  require("fs").writeFileSync("./public/sitemap.xml", data.toString());
  console.log("✅ Sitemap generated successfully!");
}

generateSitemap();
