import { seoConfig } from "./seoConfig";
import type { EventData } from "@/sanity/lib/getLandingPage";

export interface OrganizationData {
  logo?: string | null;
  email?: string;
  sameAs?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const normalizedPath = pathOrUrl.startsWith("/")
    ? pathOrUrl
    : `/${pathOrUrl}`;
  return `${seoConfig.siteUrl}${normalizedPath}`;
}

export function getOrganizationJsonLd(data: OrganizationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: data.logo
      ? absoluteUrl(data.logo)
      : absoluteUrl(seoConfig.defaultImage),
    email: data.email,
    sameAs: data.sameAs || [],
  };
}

export function getEventJsonLd(events: EventData[]) {
  return events
    .filter((event) => !!event.date)
    .map((event) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.title,
      description:
        event.description ||
        `Immersive spy event by ${seoConfig.siteName} on Lake Como.`,
      startDate: event.date,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: event.imageUrl
        ? [absoluteUrl(event.imageUrl)]
        : [absoluteUrl(seoConfig.defaultImage)],
      organizer: {
        "@type": "Organization",
        name: seoConfig.siteName,
        url: seoConfig.siteUrl,
      },
      location: {
        "@type": "Place",
        name: event.location || "Lake Como",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lake Como",
          addressCountry: "IT",
        },
      },
      offers: {
        "@type": "Offer",
        url: `${seoConfig.siteUrl}/#contact`,
        availability: "https://schema.org/InStock",
        priceCurrency: "EUR",
      },
    }));
}

export function getTouristExperienceJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "TouristExperience",
      name: "Mission Experience",
      description:
        "A cinematic mission-led tourist experience on Lake Como inspired by real WWII intelligence stories.",
      provider: {
        "@type": "Organization",
        name: seoConfig.siteName,
        url: seoConfig.siteUrl,
      },
      url: `${seoConfig.siteUrl}/#mission-experience`,
      areaServed: "Lake Como, Italy",
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristExperience",
      name: "Private Events",
      description:
        "Private spy-themed events and immersive luxury gatherings tailored for villas and destination celebrations on Lake Como.",
      provider: {
        "@type": "Organization",
        name: seoConfig.siteName,
        url: seoConfig.siteUrl,
      },
      url: `${seoConfig.siteUrl}/#private-events`,
      areaServed: "Lake Como, Italy",
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristExperience",
      name: "Weekly Events",
      description:
        "Recurring immersive weekly experiences and themed dinners around Lake Como.",
      provider: {
        "@type": "Organization",
        name: seoConfig.siteName,
        url: seoConfig.siteUrl,
      },
      url: `${seoConfig.siteUrl}/#upcoming-events`,
      areaServed: "Lake Como, Italy",
    },
  ];
}

export function getFaqJsonLd(items: FaqItem[]) {
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
