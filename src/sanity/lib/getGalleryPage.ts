import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";

export interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface GalleryPageData {
  title: string;
  hero: {
    heading: string;
    subHeading: string;
  };
  heroFeature?: {
    title: string;
    subtitle?: string;
    tag?: string;
    link?: string;
  };
  details?: string;
  galleryImages: GalleryImage[];
}

const query = `
  *[_type == "galleryPage"][0] {
    title,
    hero {
      heading,
      subHeading
    },
    heroFeature {
      title,
      subtitle,
      tag,
      link
    },
    details,
    galleryImages[] {
      "url": asset->url,
      alt,
      caption
    }
  }
`;

const fetchGalleryPageData = async (): Promise<GalleryPageData | null> => {
  try {
    const data = await client.fetch(query);
    
    if (!data) return null;

    if (data.galleryImages) {
      data.galleryImages = data.galleryImages
        .filter((img: { url?: string }) => img?.url)
        .map((img: { url: string; alt?: string; caption?: string }) => ({
          url: img.url,
          alt: img.alt,
          caption: img.caption,
        }));
    } else {
      data.galleryImages = [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching gallery page data:", error);
    return null;
  }
};

const cachedFetch = unstable_cache(
  fetchGalleryPageData,
  ["galleryPage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["galleryPage", "content"] }
);

export async function getGalleryPageData(): Promise<GalleryPageData | null> {
  if (process.env.NODE_ENV === "development") {
    return await fetchGalleryPageData();
  }
  return await cachedFetch();
}
