import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

const query = `
  *[_type == "themesPage"][0] {
    title,
    hero {
      mainTitle,
      highlightTitle,
      secondaryTitle,
      description
    },
    featuresGrid[] {
      title,
      subtitle,
      tag,
      link
    },
    themesList[] {
      title,
      genre,
      icon,
      image,
      vibe,
      story,
      feel,
      ctaText,
      ctaLink
    }
  }
`;

const fetchThemesPageData = async () => {
  try {
    const data = await client.fetch(query);
    
    if (!data) return null;

    if (data.themesList) {
      data.themesList = data.themesList.map((theme: { image?: unknown; [key: string]: unknown }) => ({
        ...theme,
        imageUrl: theme.image ? urlFor(theme.image).auto('format').url() : null
      }));
    }

    return data;
  } catch (error) {
    console.error("Error fetching themes page data:", error);
    return null;
  }
};

const cachedFetch = unstable_cache(
  fetchThemesPageData,
  ["themesPage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["themesPage", "content"] }
);

export async function getThemesPageData() {
  return await fetchThemesPageData();
}