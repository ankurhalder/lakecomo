import { client } from "./client";
import { unstable_cache } from "next/cache";

const CACHE_REVALIDATE = 86400;

const fetchHomePageData = async () => {
  const query = `
    *[_type == "homepage"][0] {
      title,
      heroSection {
        preHeading,
        mainHeading,
        subHeading,
        ctaText,
        ctaLink,
        "videoUrl": videoFile.asset->url
      },
      featuresGrid[] {
        title,
        subtitle,
        tag,
        link,
        "iconUrl": icon.asset->url
      }
    }
  `;
  return await client.fetch(query);
};

export const getHomePageData = unstable_cache(
  fetchHomePageData,
  ["homepage"],
  { revalidate: CACHE_REVALIDATE, tags: ["homepage", "content"] }
);