import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

const query = `
  *[_type == "homepage"][0] {
    title,
    heroSection {
      preHeading,
      mainHeading,
      subHeading,
      ctaText,
      ctaLink,
      playIndicatorText,
      "videoUrl": videoFile.asset->url,
      "mobileVideoUrl": mobileVideoFile.asset->url,
      posterImage
    },
    featuresGrid[] {
      title,
      subtitle,
      tag,
      link,
      icon
    }
  }
`;

const fetchHomePageData = async () => {
  try {
    const data = await client.fetch(query);
    
    if (!data) return null;

    if (data.heroSection?.posterImage) {
      data.heroSection.posterImage = urlFor(data.heroSection.posterImage)
        .auto('format')
        .url();
    }

    if (data.featuresGrid) {
      data.featuresGrid = data.featuresGrid.map((item: { icon?: unknown; [key: string]: unknown }) => ({
        ...item,
        iconUrl: item.icon ? urlFor(item.icon).auto('format').url() : null,
      }));
    }

    return data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
};

const cachedFetch = unstable_cache(
  fetchHomePageData,
  ["homepage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["homepage", "content"] }
);

export async function getHomePageData() {
  if (process.env.NODE_ENV === "development") {
    return await fetchHomePageData();
  }
  return await cachedFetch();
}