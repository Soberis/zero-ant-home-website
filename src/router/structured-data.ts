import type { StructuredData } from "@/utils/seo";
import {
  safeTranslate,
  safeTranslateArray,
  getCompanyName,
  getPostalAddress,
  getPublisher,
  buildLocalizedAbsoluteUrl,
} from "./seo-helpers";

export function getCareerStructuredJobs(baseUrl: string): StructuredData[] {
  const jobKeys = ["softwareEngineer", "robotSystemsEngineer", "electricalEngineer"] as const;

  return jobKeys.map((jobKey) => {
    const title = safeTranslate(`careers.positions.${jobKey}.title`);
    const requirements = safeTranslateArray(`careers.positions.${jobKey}.requirements`);
    const qualifications = requirements.join("；");

    return {
      "@type": "JobPosting",
      title,
      description: `${title} - ${safeTranslate("careers.heroSubtitle")}`,
      employmentType: "FULL_TIME",
      jobLocation: {
        "@type": "Place",
        address: getPostalAddress(),
      },
      hiringOrganization: {
        "@type": "Organization",
        name: getCompanyName(),
        sameAs: baseUrl,
        logo: `${baseUrl}/logo.webp`,
      },
      ...(qualifications ? { qualifications } : {}),
    };
  });
}

export function buildBreadcrumbStructuredData(
  baseUrl: string,
  locale: string,
  items: Array<{ name: string; path: string }>
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildLocalizedAbsoluteUrl(baseUrl, locale, item.path),
    })),
  };
}

export function getHomeStructuredData(
  baseUrl: string,
  currentUrl: string,
  locale: string,
  pageTitle: string,
  pageDescription: string,
  contactTel: string
): StructuredData[] {
  const postalAddress = getPostalAddress();
  const companyName = getCompanyName();
  const siteName = safeTranslate("seo.siteName");
  const description = safeTranslate("seo.defaultDescription");

  const webPage: StructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: currentUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: baseUrl,
    },
    publisher: getPublisher(baseUrl),
  };

  const organization: StructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyName,
    alternateName: "ZeroAnt Technology",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.webp`,
      width: 200,
      height: 200,
    },
    description,
    foundingDate: "2025",
    address: postalAddress,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactTel,
      contactType: "customer service",
      availableLanguage: ["Chinese", "English"],
    },
    industry: "Industrial Automation",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 20,
    },
    knowsAbout: [
      "Industrial Robots",
      "Automation Equipment",
      "Smart Manufacturing",
      "Machine Vision",
      "Robotic Operating Systems",
    ],
  };

  const localBusiness: StructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyName,
    image: `${baseUrl}/logo.webp`,
    "@id": baseUrl,
    url: baseUrl,
    telephone: contactTel,
    address: postalAddress,
  };

  return [webPage, organization, localBusiness];
}

export function getSolutionsStructuredData(
  baseUrl: string,
  currentUrl: string,
  locale: string
): StructuredData[] {
  const pageTitle = safeTranslate("seo.solutions.title");
  const pageDescription = safeTranslate("seo.solutions.description");
  const siteName = safeTranslate("seo.siteName");
  const faqEntries = [
    {
      question: safeTranslate("seo.structuredData.solutionsFaq.q1"),
      answer: safeTranslate("seo.structuredData.solutionsFaq.a1"),
    },
    {
      question: safeTranslate("seo.structuredData.solutionsFaq.q2"),
      answer: safeTranslate("seo.structuredData.solutionsFaq.a2"),
    },
    {
      question: safeTranslate("seo.structuredData.solutionsFaq.q3"),
      answer: safeTranslate("seo.structuredData.solutionsFaq.a3"),
    },
    {
      question: safeTranslate("seo.structuredData.solutionsFaq.q4"),
      answer: safeTranslate("seo.structuredData.solutionsFaq.a4"),
    },
  ];

  const collectionPage: StructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: currentUrl,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", name: siteName, url: baseUrl },
    publisher: {
      ...getPublisher(baseUrl),
      name: siteName,
      url: baseUrl,
      logo: { "@type": "ImageObject", url: `${baseUrl}/logo.webp` },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "Service",
          name: safeTranslate("seo.structuredData.solutions.precisionWorkcell.name"),
          description: safeTranslate("seo.structuredData.solutions.precisionWorkcell.description"),
          provider: { "@type": "Organization", name: getCompanyName() },
        },
        {
          "@type": "Service",
          name: safeTranslate("seo.structuredData.solutions.mobileCollaboration.name"),
          description: safeTranslate(
            "seo.structuredData.solutions.mobileCollaboration.description"
          ),
          provider: { "@type": "Organization", name: getCompanyName() },
        },
        {
          "@type": "Service",
          name: safeTranslate("seo.structuredData.solutions.embodiedDevelopment.name"),
          description: safeTranslate(
            "seo.structuredData.solutions.embodiedDevelopment.description"
          ),
          provider: { "@type": "Organization", name: getCompanyName() },
        },
      ],
    },
  };

  const faqPage: StructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumb = buildBreadcrumbStructuredData(baseUrl, locale, [
    { name: safeTranslate("nav.home"), path: "/" },
    { name: pageTitle, path: "/solutions" },
  ]);

  return [collectionPage, faqPage, breadcrumb];
}

export function getAboutStructuredData(
  baseUrl: string,
  currentUrl: string,
  locale: string
): StructuredData[] {
  const pageTitle = safeTranslate("seo.about.title");
  const pageDescription = safeTranslate("seo.about.description");
  const siteName = safeTranslate("seo.siteName");

  const aboutPage: StructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: pageTitle,
    description: pageDescription,
    url: currentUrl,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", name: siteName, url: baseUrl },
    publisher: {
      ...getPublisher(baseUrl),
      name: siteName,
      url: baseUrl,
      logo: { "@type": "ImageObject", url: `${baseUrl}/logo.webp` },
    },
  };

  const breadcrumb = buildBreadcrumbStructuredData(baseUrl, locale, [
    { name: safeTranslate("nav.home"), path: "/" },
    { name: pageTitle, path: "/about" },
  ]);

  return [aboutPage, breadcrumb];
}

export function getCareersStructuredData(
  baseUrl: string,
  currentUrl: string,
  locale: string
): StructuredData[] {
  const pageTitle = safeTranslate("seo.careers.title");
  const pageDescription = safeTranslate("seo.careers.description");
  const siteName = safeTranslate("seo.siteName");

  const collectionPage: StructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: currentUrl,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", name: siteName, url: baseUrl },
    publisher: {
      ...getPublisher(baseUrl),
      name: siteName,
      url: baseUrl,
      logo: { "@type": "ImageObject", url: `${baseUrl}/logo.webp` },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: getCareerStructuredJobs(baseUrl),
    },
  };

  const breadcrumb = buildBreadcrumbStructuredData(baseUrl, locale, [
    { name: safeTranslate("nav.home"), path: "/" },
    { name: pageTitle, path: "/careers" },
  ]);

  return [collectionPage, breadcrumb];
}

export function getApplicationDetailStructuredData(
  baseUrl: string,
  currentUrl: string,
  locale: string,
  applicationTitle: string,
  applicationDescription: string,
  thumbnailUrl: string,
  currentPath: string
): StructuredData[] {
  const techArticle: StructuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: applicationTitle,
    description: applicationDescription,
    inLanguage: locale,
    articleSection: safeTranslate("common.section.applications"),
    image: thumbnailUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": currentUrl },
    author: getPublisher(baseUrl),
    publisher: getPublisher(baseUrl),
    keywords: `${applicationTitle}, ${safeTranslate("seo.solutions.keywords")}`,
  };

  const breadcrumb = buildBreadcrumbStructuredData(baseUrl, locale, [
    { name: safeTranslate("nav.home"), path: "/" },
    { name: safeTranslate("nav.solutions"), path: "/solutions" },
    { name: applicationTitle, path: currentPath },
  ]);

  return [techArticle, breadcrumb];
}

export function getVideoDetailStructuredData(
  baseUrl: string,
  currentUrl: string,
  locale: string,
  videoTitle: string,
  videoDescription: string,
  thumbnailUrl: string,
  videoUrl: string,
  isVideoMedia: boolean,
  videoType: string,
  publishDate?: string,
  currentPath?: string
): StructuredData[] {
  const mediaData: StructuredData = isVideoMedia
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: videoTitle,
        description: videoDescription,
        inLanguage: locale,
        thumbnailUrl,
        contentUrl: videoUrl,
        embedUrl: videoType === "bilibili" ? videoUrl : undefined,
        uploadDate: publishDate,
        mainEntityOfPage: currentUrl,
        publisher: getPublisher(baseUrl),
        author: getPublisher(baseUrl),
      }
    : {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        name: videoTitle,
        description: videoDescription,
        inLanguage: locale,
        contentUrl: videoUrl,
        thumbnailUrl,
        author: getPublisher(baseUrl),
      };

  const breadcrumb = buildBreadcrumbStructuredData(baseUrl, locale, [
    { name: safeTranslate("nav.home"), path: "/" },
    { name: safeTranslate("common.section.videoCases"), path: "/solutions" },
    { name: videoTitle, path: currentPath || "/solutions" },
  ]);

  return [mediaData, breadcrumb];
}

export function getProductDetailStructuredData(
  baseUrl: string,
  currentUrl: string,
  locale: string,
  productName: string,
  productDesc: string,
  productImage: string,
  productId: string,
  familyTitleKey: string,
  currentPath?: string
): StructuredData[] {
  const siteName = safeTranslate("seo.siteName");

  const product: StructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: productDesc,
    image: [productImage],
    url: currentUrl,
    sku: productId,
    category: safeTranslate(familyTitleKey),
    inLanguage: locale,
    brand: { "@type": "Brand", name: siteName },
    manufacturer: { "@type": "Organization", name: siteName },
    offers: {
      "@type": "Offer",
      url: currentUrl,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: siteName },
    },
  };

  const breadcrumb = buildBreadcrumbStructuredData(baseUrl, locale, [
    { name: safeTranslate("nav.home"), path: "/" },
    { name: safeTranslate("nav.products"), path: "/products" },
    { name: productName, path: currentPath || "/products" },
  ]);

  return [product, breadcrumb];
}

export function getSupportStructuredData(
  baseUrl: string,
  currentUrl: string,
  locale: string
): StructuredData[] {
  const pageTitle = safeTranslate("seo.support.title");
  const pageDescription = safeTranslate("seo.support.description");
  const siteName = safeTranslate("seo.siteName");

  const faqPage: StructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: pageTitle,
    description: pageDescription,
    url: currentUrl,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", name: siteName, url: baseUrl },
    publisher: {
      ...getPublisher(baseUrl),
      name: siteName,
      url: baseUrl,
      logo: { "@type": "ImageObject", url: `${baseUrl}/logo.webp` },
    },
    mainEntity: [
      {
        "@type": "Question",
        name: safeTranslate("seo.structuredData.support.q1"),
        acceptedAnswer: { "@type": "Answer", text: safeTranslate("seo.structuredData.support.a1") },
      },
      {
        "@type": "Question",
        name: safeTranslate("seo.structuredData.support.q2"),
        acceptedAnswer: { "@type": "Answer", text: safeTranslate("seo.structuredData.support.a2") },
      },
      {
        "@type": "Question",
        name: safeTranslate("seo.structuredData.support.q3"),
        acceptedAnswer: { "@type": "Answer", text: safeTranslate("seo.structuredData.support.a3") },
      },
      {
        "@type": "Question",
        name: safeTranslate("seo.structuredData.support.q4"),
        acceptedAnswer: { "@type": "Answer", text: safeTranslate("seo.structuredData.support.a4") },
      },
    ],
  };

  const breadcrumb = buildBreadcrumbStructuredData(baseUrl, locale, [
    { name: safeTranslate("nav.home"), path: "/" },
    { name: safeTranslate("nav.support"), path: "/support" },
  ]);

  return [faqPage, breadcrumb];
}
