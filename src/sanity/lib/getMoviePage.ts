import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

export interface DeliverableItem {
  title: string;
  description?: string;
  features?: string[];
}

export interface MoviePageData {
  title: string;
  hero: {
    heading: string;
    subHeading: string;
    subSubHeading?: string;
  };
  heroFeature?: {
    title: string;
    subtitle?: string;
    tag?: string;
    link?: string;
  };
  deliverables?: DeliverableItem[];
  timeline?: string;
  popcornSection?: {
    imageUrl?: string;
    heading?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

const query = `
  *[_type == "moviePage"][0] {
    title,
    hero {
      heading,
      subHeading,
      subSubHeading
    },
    heroFeature {
      title,
      subtitle,
      tag,
      link
    },
    deliverables[] {
      title,
      description,
      features
    },
    timeline,
    popcornSection {
      image,
      heading,
      description,
      ctaText,
      ctaLink
    }
  }
`;

const fetchMoviePageData = async (): Promise<MoviePageData | null> => {
  try {
    const data = await client.fetch(query);
    
    if (!data) return null;

    if (data.popcornSection?.image) {
      data.popcornSection.imageUrl = urlFor(data.popcornSection.image).auto('format').url();
      delete data.popcornSection.image;
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie page data:", error);
    return null;
  }
};

const cachedFetch = unstable_cache(
  fetchMoviePageData,
  ["moviePage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["moviePage", "content"] }
);

export async function getMoviePageData(): Promise<MoviePageData | null> {
  return await fetchMoviePageData();
}
