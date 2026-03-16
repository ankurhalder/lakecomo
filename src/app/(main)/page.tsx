import type { Metadata } from "next";
import { getLandingPageData } from "@/sanity/lib/getLandingPage";
import { getFaqPageData } from "@/sanity/lib/getFaqPage";
import LandingPage from "./sections/LandingPage";
import { generateMetadata as createMetadata } from "@/lib/seo/generateMetadata";
import {
  getEventJsonLd,
  getFaqJsonLd,
  getTouristExperienceJsonLd,
} from "@/lib/seo/structuredData";
import JsonLd from "@/components/shared/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLandingPageData();

  return createMetadata({
    title:
      data?.seo?.seoTitle ||
      "Spies of Style | Immersive Spy Experiences on Lake Como",
    description:
      data?.seo?.seoDescription ||
      "Step into an immersive espionage experience on the shores of Lake Como. Solve clues, uncover secret missions, and enjoy cinematic themed dinners inspired by real WWII spy stories.",
    canonical: data?.seo?.canonicalUrl || "/",
    keywords: [
      "Lake Como experiences",
      "spy themed dinner",
      "Lake Como private events",
      "immersive dinner Italy",
      "luxury Lake Como events",
      "interactive dinner experience",
    ],
    openGraph: {
      type: "website",
      image: data?.seo?.seoImageUrl || undefined,
    },
    twitter: {
      image: data?.seo?.seoImageUrl || undefined,
    },
  });
}

export default async function Home() {
  const [data, faqData] = await Promise.all([
    getLandingPageData(),
    getFaqPageData(),
  ]);

  if (!data) return null;

  const eventJsonLd = getEventJsonLd(data.events || []);
  const touristExperienceJsonLd = getTouristExperienceJsonLd();
  const faqJsonLd = getFaqJsonLd(faqData?.faqs || []);

  return (
    <main
      id="main-content"
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {eventJsonLd.map((eventSchema, index) => (
        <JsonLd key={`event-jsonld-${index}`} data={eventSchema} />
      ))}
      {touristExperienceJsonLd.map((experienceSchema, index) => (
        <JsonLd
          key={`tourist-experience-jsonld-${index}`}
          data={experienceSchema}
        />
      ))}
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <LandingPage data={data} />
    </main>
  );
}
