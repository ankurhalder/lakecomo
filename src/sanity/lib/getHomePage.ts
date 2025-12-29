import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";

const query = `
  *[_type == "homepage"][0] {
    title,
    heroSection {
      preHeading,
      mainHeading,
      subHeading,
      ctaText,
      ctaLink,
      "posterImage": posterImage.asset->url
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

const fetchHomePageData = async () => {
  return await client.fetch(query);
};

const cachedFetch = unstable_cache(
  fetchHomePageData,
  ["homepage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["homepage", "content"] }
);

export async function getHomePageData() {
  if (process.env.NODE_ENV === "development") {
    return await client.fetch(query);
  }
  return await cachedFetch();
}