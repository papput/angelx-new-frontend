import { ORGANIZATION, SITE_URL, SITE_NAME } from "./config";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    email: ORGANIZATION.email,
    sameAs: ORGANIZATION.sameAs,
    description: ORGANIZATION.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: ORGANIZATION.email,
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: ORGANIZATION.description,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: ORGANIZATION.name },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blogs?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AngelX App",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Android",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "AngelX App is the official mobile application for USDT to INR exchange on the AngelX digital asset platform.",
  };
}

export function mobileApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "AngelX App",
    operatingSystem: "Android",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Trade USDT on AngelX Exchange — India's trusted USDT trading platform with fast INR settlement.",
  };
}

export function faqPageSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function articleSchema({ title, description, slug, datePublished, authorName, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image || `${SITE_URL}/logo512.png`,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: datePublished || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: authorName || "AngelX Team",
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      logo: { "@type": "ImageObject", url: ORGANIZATION.logo },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };
}

export function siteNavigationSchema() {
  const nav = [
    { name: "Home", url: "/" },
    { name: "Exchange", url: "/exchange" },
    { name: "About", url: "/about-us" },
    { name: "FAQ", url: "/faq" },
    { name: "Blog", url: "/blogs" },
    { name: "Contact", url: "/contact-us" },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: nav.map((n) => n.name),
    url: nav.map((n) => `${SITE_URL}${n.url}`),
  };
}

export function reviewSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "AngelX USDT Exchange",
    description: "USDT to INR digital asset exchange on AngelX Platform",
    brand: { "@type": "Brand", name: "AngelX" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1250",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Rahul M." },
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody:
          "Fast USDT to INR settlement with transparent AngelX rates. The AngelX app makes selling USDT simple.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Priya S." },
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody:
          "Reliable AngelX Exchange platform with quick bank transfers after USDT deposit.",
      },
    ],
  };
}

export function globalSchemas() {
  return [
    organizationSchema(),
    webSiteSchema(),
    softwareApplicationSchema(),
    siteNavigationSchema(),
  ];
}
