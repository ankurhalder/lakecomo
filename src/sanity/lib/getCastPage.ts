import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";

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
      "url": coalesce(image.asset->url, asset->url),
      "title": title,
      "role": role
    },
    content
  }
`;

const fetchCastPageData = async (): Promise<CastPageData | null> => {
  return await client.fetch(query);
};

const cachedFetch = unstable_cache(
  fetchCastPageData,
  ["castPage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["castPage", "content"] }
);

export async function getCastPageData(): Promise<CastPageData | null> {
  if (process.env.NODE_ENV === "development") {
    return await client.fetch(query);
  }
  return await cachedFetch();
}
