import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

export interface CastImage {
  url: string;
  title?: string;
  role?: string;
}

export interface FallingStarsSettings {
  enabled?: boolean;
  count?: number;
  mobileCount?: number;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
}

export interface CastPageData {
  title: string;
  hero: {
    title: string;
    subtitle: string;
  };
  heroFeature?: {
    title: string;
    subtitle?: string;
    tag?: string;
    link?: string;
  };
  fallingStars?: FallingStarsSettings;
  showcaseImages: {
    url: string;
    title?: string;
    role?: string;
  }[];
  content?: {
    paragraphs: string[];
  };
}

const query = `
  *[_type == "castPage"][0] {
    title,
    hero {
      title,
      subtitle
    },
    heroFeature {
      title,
      subtitle,
      tag,
      link
    },
    fallingStars {
      enabled,
      count,
      mobileCount,
      minSize,
      maxSize,
      minSpeed,
      maxSpeed
    },
    "showcaseImages": showcaseImages[] {
      image,
      "title": title,
      "role": role
    },
    content
  }
`;

const fetchCastPageData = async (): Promise<CastPageData | null> => {
  try {
    const data = await client.fetch(query);
    
    if (!data) return null;

    if (data.showcaseImages) {
      data.showcaseImages = data.showcaseImages.map((item: { image?: unknown; title?: string; role?: string }) => ({
        url: item.image ? urlFor(item.image).auto('format').url() : "",
        title: item.title,
        role: item.role
      }));
    }

    return data;
  } catch (error) {
    console.error("Error fetching cast page data:", error);
    return null;
  }
};

const cachedFetch = unstable_cache(
  fetchCastPageData,
  ["castPage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["castPage", "content"] }
);

export async function getCastPageData(): Promise<CastPageData | null> {
  if (process.env.NODE_ENV === "development") {
    return await fetchCastPageData();
  }
  return await cachedFetch();
}