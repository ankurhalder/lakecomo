import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

// ─── TYPE DEFINITIONS ──────────────────────────────────────────────────────────

export interface SliderImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface LocationData {
  name: string;
  label?: string;
  tagline?: string;
  highlights?: string[];
  imageUrl?: string | null;
}

export interface LogisticsDetail {
  label: string;
  value: string;
  icon?: string;
}

export interface ThemesPageData {
  title?: string;
  hero?: {
    coverImageUrl?: string | null;
    preHeading?: string;
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  bondVideoUrl?: string | null;
  storySection?: {
    historyTitle?: string;
    historyText?: string;
    bondConnectionTitle?: string;
    bondConnectionText?: string;
    bondConnectionImageUrl?: string | null;
  };
  locationsSection?: {
    sectionTitle?: string;
    sectionSubtitle?: string;
    locations?: LocationData[];
    closingLine?: string;
  };
  propsSection?: {
    title?: string;
    highlights?: string[];
    quote?: string;
    backgroundImageUrl?: string | null;
  };
  highlightsSection?: {
    title?: string;
    highlights?: string[];
  };
  logisticsSection?: {
    title?: string;
    details?: LogisticsDetail[];
  };
  ctaSection?: {
    title?: string;
    quote?: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImageUrl?: string | null;
  };
  sliderImages?: SliderImage[];
}

// ─── GROQ QUERY ───────────────────────────────────────────────────────────────

const query = `
  *[_type == "themesPage"][0] {
    title,

    hero {
      coverImage,
      preHeading,
      headline,
      subheadline,
      ctaText,
      ctaLink
    },

    "bondVideoUrl": bondVideo.asset->url,

    storySection {
      historyTitle,
      historyText,
      bondConnectionTitle,
      bondConnectionText,
      bondConnectionImage
    },

    locationsSection {
      sectionTitle,
      sectionSubtitle,
      locations[] {
        name,
        label,
        tagline,
        highlights,
        image
      },
      closingLine
    },

    propsSection {
      title,
      highlights,
      quote,
      backgroundImage
    },

    highlightsSection {
      title,
      highlights
    },

    logisticsSection {
      title,
      details[] {
        label,
        value,
        icon
      }
    },

    ctaSection {
      title,
      quote,
      ctaText,
      ctaLink,
      backgroundImage
    },

    sliderImages[] {
      asset,
      hotspot,
      "alt": alt,
      "caption": caption
    }
  }
`;

// ─── DATA TRANSFORMATION ──────────────────────────────────────────────────────

const IMAGE_QUALITY = 85;

function processImageToUrl(
  image: unknown,
  width?: number,
  quality = IMAGE_QUALITY,
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

      hero: raw.hero
        ? {
            coverImageUrl: processImageToUrl(raw.hero.coverImage, 2560),
            preHeading: raw.hero.preHeading,
            headline: raw.hero.headline,
            subheadline: raw.hero.subheadline,
            ctaText: raw.hero.ctaText,
            ctaLink: raw.hero.ctaLink,
          }
        : undefined,

      bondVideoUrl: raw.bondVideoUrl ?? null,

      storySection: raw.storySection
        ? {
            historyTitle: raw.storySection.historyTitle,
            historyText: raw.storySection.historyText,
            bondConnectionTitle: raw.storySection.bondConnectionTitle,
            bondConnectionText: raw.storySection.bondConnectionText,
            bondConnectionImageUrl: processImageToUrl(
              raw.storySection.bondConnectionImage,
              1200,
            ),
          }
        : undefined,

      locationsSection: raw.locationsSection
        ? {
            sectionTitle: raw.locationsSection.sectionTitle,
            sectionSubtitle: raw.locationsSection.sectionSubtitle,
            locations: (raw.locationsSection.locations ?? []).map(
              (loc: {
                name?: string;
                label?: string;
                tagline?: string;
                highlights?: string[];
                image?: unknown;
              }) => ({
                name: loc.name,
                label: loc.label,
                tagline: loc.tagline,
                highlights: loc.highlights ?? [],
                imageUrl: processImageToUrl(loc.image, 800),
              }),
            ),
            closingLine: raw.locationsSection.closingLine,
          }
        : undefined,

      propsSection: raw.propsSection
        ? {
            title: raw.propsSection.title,
            highlights: raw.propsSection.highlights ?? [],
            quote: raw.propsSection.quote,
            backgroundImageUrl: processImageToUrl(
              raw.propsSection.backgroundImage,
              2000,
            ),
          }
        : undefined,

      highlightsSection: raw.highlightsSection
        ? {
            title: raw.highlightsSection.title,
            highlights: raw.highlightsSection.highlights ?? [],
          }
        : undefined,

      logisticsSection: raw.logisticsSection
        ? {
            title: raw.logisticsSection.title,
            details: raw.logisticsSection.details ?? [],
          }
        : undefined,

      ctaSection: raw.ctaSection
        ? {
            title: raw.ctaSection.title,
            quote: raw.ctaSection.quote,
            ctaText: raw.ctaSection.ctaText,
            ctaLink: raw.ctaSection.ctaLink,
            backgroundImageUrl: processImageToUrl(
              raw.ctaSection.backgroundImage,
              2000,
            ),
          }
        : undefined,

      sliderImages: (raw.sliderImages ?? [])
        .map(
          (img: {
            alt?: string;
            caption?: string;
            [key: string]: unknown;
          }) => ({
            url: processImageToUrl(img, 1920) ?? "",
            alt: img.alt ?? "",
            caption: img.caption,
          }),
        )
        .filter((img: SliderImage) => img.url),
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
