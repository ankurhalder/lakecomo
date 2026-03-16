import type { Metadata } from "next";
import { seoConfig } from "./seoConfig";

type OpenGraphType = "website" | "article" | "profile";

export interface SeoMetadataInput {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: OpenGraphType;
    url?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
  robots?: Metadata["robots"];
  keywords?: string[];
  alternates?: Metadata["alternates"];
}

function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${seoConfig.siteUrl}${normalizedPath}`;
}

export function generateMetadata(input: SeoMetadataInput = {}): Metadata {
  const title = input.title || seoConfig.defaultTitle;
  const description = input.description || seoConfig.defaultDescription;

  const canonical = input.canonical
    ? toAbsoluteUrl(input.canonical)
    : seoConfig.siteUrl;

  const ogImage = toAbsoluteUrl(input.openGraph?.image || seoConfig.defaultImage);
  const twitterImage = toAbsoluteUrl(input.twitter?.image || input.openGraph?.image || seoConfig.defaultImage);
  const ogUrl = toAbsoluteUrl(input.openGraph?.url || canonical);

  return {
    metadataBase: new URL(seoConfig.siteUrl),
    title,
    description,
    keywords: input.keywords,
    alternates: input.alternates || { canonical },
    robots: input.robots || {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: input.openGraph?.title || title,
      description: input.openGraph?.description || description,
      url: ogUrl,
      type: input.openGraph?.type || "website",
      siteName: seoConfig.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: input.openGraph?.title || title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      creator: seoConfig.twitterHandle,
      title: input.twitter?.title || title,
      description: input.twitter?.description || description,
      images: [twitterImage],
    },
  };
}
