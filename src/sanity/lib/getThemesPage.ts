import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export interface HeroSlide {
  url: string;
  alt?: string;
}

export interface AssignmentCardData {
  title?: string;
  duration?: string;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string | null;
}

export interface CtaButtonData {
  text: string;
  link: string;
}

export interface ThemesPageData {
  title?: string;

  heroSlides?: HeroSlide[];

  hero?: {
    blinkingLabel?: string;
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaLink?: string;
  };

  real007Section?: {
    heading?: string;
    paragraph1?: string;
    paragraph2?: string;
    bullets?: string[];
    imageUrl?: string | null;
  };

  assignmentsSection?: {
    sectionTitle?: string;
    cards?: AssignmentCardData[];
  };

  privateVillaSection?: {
    title?: string;
    description?: string;
    features?: string[];
    ctaText?: string;
    ctaLink?: string;
    imageUrl?: string | null;
  };

  ctaSection?: {
    title?: string;
    quote?: string;
    ctas?: CtaButtonData[];
    backgroundImageUrl?: string | null;
  };

  whatsIncludedSection?: {
    title?: string;
    items?: string[];
  };
}

// ─── GROQ QUERY ───────────────────────────────────────────────────────────────

const query = `
  *[_type == "themesPage"][0] {
    title,

    "heroSlides": heroSlides[] {
      asset,
      hotspot,
      "alt": alt
    },

    hero {
      blinkingLabel,
      headline,
      subheadline,
      ctaText,
      ctaLink
    },

    real007Section {
      heading,
      paragraph1,
      paragraph2,
      bullets,
      image
    },

    assignmentsSection {
      sectionTitle,
      cards[] {
        title,
        duration,
        features,
        ctaText,
        ctaLink,
        image
      }
    },

    privateVillaSection {
      title,
      description,
      features,
      ctaText,
      ctaLink,
      image
    },

    ctaSection {
      title,
      quote,
      ctas[] { text, link },
      backgroundImage
    },

    whatsIncludedSection {
      title,
      items
    }
  }
`;

// ─── DATA TRANSFORMATION ──────────────────────────────────────────────────────

function processImageToUrl(
  image: unknown,
  width?: number,
  quality = 85,
): string | null {
  if (!image) return null;
  try {
    let builder = urlFor(image).auto("format").quality(quality);
    if (width) builder = builder.width(width);
    return builder.url();
  } catch {
    return null;
  }
}

const fetchThemesPageData = async (): Promise<ThemesPageData | null> => {
  try {
    const raw = await client.fetch(query);
    if (!raw) return null;

    const data: ThemesPageData = {
      title: raw.title,

      heroSlides: (raw.heroSlides ?? [])
        .map((img: { alt?: string; [key: string]: unknown }) => ({
          url: processImageToUrl(img, 2560) ?? "",
          alt: img.alt ?? "",
        }))
        .filter((s: HeroSlide) => s.url),

      hero: raw.hero
        ? {
            blinkingLabel: raw.hero.blinkingLabel,
            headline: raw.hero.headline,
            subheadline: raw.hero.subheadline,
            ctaText: raw.hero.ctaText,
            ctaLink: raw.hero.ctaLink,
          }
        : undefined,

      real007Section: raw.real007Section
        ? {
            heading: raw.real007Section.heading,
            paragraph1: raw.real007Section.paragraph1,
            paragraph2: raw.real007Section.paragraph2,
            bullets: raw.real007Section.bullets ?? [],
            imageUrl: processImageToUrl(raw.real007Section.image, 1000),
          }
        : undefined,

      assignmentsSection: raw.assignmentsSection
        ? {
            sectionTitle: raw.assignmentsSection.sectionTitle,
            cards: (raw.assignmentsSection.cards ?? []).map(
              (card: {
                title?: string;
                duration?: string;
                features?: string[];
                ctaText?: string;
                ctaLink?: string;
                image?: unknown;
              }) => ({
                title: card.title,
                duration: card.duration,
                features: card.features ?? [],
                ctaText: card.ctaText,
                ctaLink: card.ctaLink,
                imageUrl: processImageToUrl(card.image, 900),
              }),
            ),
          }
        : undefined,

      privateVillaSection: raw.privateVillaSection
        ? {
            title: raw.privateVillaSection.title,
            description: raw.privateVillaSection.description,
            features: raw.privateVillaSection.features ?? [],
            ctaText: raw.privateVillaSection.ctaText,
            ctaLink: raw.privateVillaSection.ctaLink,
            imageUrl: processImageToUrl(raw.privateVillaSection.image, 1000),
          }
        : undefined,

      ctaSection: raw.ctaSection
        ? {
            title: raw.ctaSection.title,
            quote: raw.ctaSection.quote,
            ctas: raw.ctaSection.ctas ?? [],
            backgroundImageUrl: processImageToUrl(
              raw.ctaSection.backgroundImage,
              2000,
            ),
          }
        : undefined,

      whatsIncludedSection: raw.whatsIncludedSection
        ? {
            title: raw.whatsIncludedSection.title,
            items: raw.whatsIncludedSection.items ?? [],
          }
        : undefined,
    };

    return data;
  } catch (error) {
    console.error("Error fetching themes page data:", error);
    return null;
  }
};

// ─── CACHED EXPORT ────────────────────────────────────────────────────────────

const cachedFetch = unstable_cache(fetchThemesPageData, ["themesPage"], {
  revalidate: DEFAULT_REVALIDATE,
  tags: ["themesPage", "content"],
});

export async function getThemesPageData(): Promise<ThemesPageData | null> {
  if (process.env.NODE_ENV === "development") {
    return await fetchThemesPageData();
  }
  return await cachedFetch();
}
