import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";

const query = `
  *[_type == "themesPage"][0] {
    title,
    hero {
      mainTitle,
      highlightTitle,
      secondaryTitle,
      description,
      "backgroundImageUrl": backgroundImage.asset->url
    },
    themesList[] {
      title,
      genre,
      icon,
      "imageUrl": image.asset->url,
      vibe,
      story,
      feel,
      ctaText,
      ctaLink
    }
  }
`;

const fetchThemesPageData = async () => {
  return await client.fetch(query, {}, { next: { revalidate: 0 } });
};

const cachedFetch = unstable_cache(
  fetchThemesPageData,
  ["themesPage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["themesPage", "content"] }
);

export async function getThemesPageData() {
  if (process.env.NODE_ENV === "development") {
    return await client.fetch(query, {}, { next: { revalidate: 0 } });
  }
  return await cachedFetch();
}

