import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";

export interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface VenuePageData {
  title: string;
  hero: {
    heading: string;
    subHeading: string;
    location?: string;
  };
  heroFeature?: {
    title: string;
    subtitle?: string;
    tag?: string;
    link?: string;
  };
  description: string[];
  eventInfo?: string;
  galleryImages: GalleryImage[];
  externalLinks?: {
    palaceWebsite?: string;
    bookingLink?: string;
  };
  cta?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
}

const query = `
  *[_type == "venuePage"][0] {
    title,
    hero {
      heading,
      subHeading,
      location
    },
    heroFeature {
      title,
      subtitle,
      tag,
      link
    },
    description,
    eventInfo,
    galleryImages[] {
      "url": asset->url,
      alt,
      caption
    },
    externalLinks {
      palaceWebsite,
      bookingLink
    },
    cta {
      title,
      description,
      buttonText
    }
  }
`;

const fetchVenuePageData = async (): Promise<VenuePageData | null> => {
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
    }

    return data;
  } catch (error) {
    console.error("Error fetching venue page data:", error);
    return null;
  }
};

const cachedFetch = unstable_cache(fetchVenuePageData, ["venuePage"], {
  revalidate: DEFAULT_REVALIDATE,
  tags: ["venuePage", "content"],
});

export async function getVenuePageData(): Promise<VenuePageData | null> {
  if (process.env.NODE_ENV === "development") {
    return await fetchVenuePageData();
  }
  return await cachedFetch();
}
