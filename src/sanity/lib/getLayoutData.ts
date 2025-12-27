import { client } from "./client";
import { unstable_cache } from "next/cache";

const CACHE_REVALIDATE = 86400;

const query = `
  {
    "navbar": *[_type == "navbar"][0] {
      logoText,
      "logoUrl": logoImage.asset->url,
      links[] { label, url },
      ctaText,
      ctaLink
    },
    "footer": *[_type == "footer"][0] {
      footerTagline,
      email,
      copyright,
      socialLinks[] { platform, url }
    }
  }
`;

const fetchLayoutData = async () => {
  return await client.fetch(query, {}, { next: { revalidate: 0 } });
};

const cachedFetch = unstable_cache(
  fetchLayoutData,
  ["layout"],
  { revalidate: CACHE_REVALIDATE, tags: ["layout", "content"] }
);

export async function getLayoutData() {
  if (process.env.NODE_ENV === "development") {
    return await client.fetch(query, {}, { next: { revalidate: 0 } });
  }
  return await cachedFetch();
}