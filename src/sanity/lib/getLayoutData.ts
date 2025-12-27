import { client } from "./client";
import { unstable_cache } from "next/cache";

const CACHE_REVALIDATE = 86400;

const fetchLayoutData = async () => {
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
  return await client.fetch(query);
};

export const getLayoutData = unstable_cache(
  fetchLayoutData,
  ["layout"],
  { revalidate: CACHE_REVALIDATE, tags: ["layout", "content"] }
);