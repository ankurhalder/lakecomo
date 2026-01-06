import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";

const query = `
  *[_type == "faqPage"][0] {
    title,
    hero {
      preHeading,
      mainHeading,
      description,
      searchPlaceholder
    },
    categories[] {
      name,
      slug
    },
    faqs[] {
      question,
      answer,
      category
    },
    contactCta {
      text,
      buttonText,
      buttonLink
    }
  }
`;

const fetchFaqPageData = async () => {
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching FAQ page data:", error);
    return null;
  }
};

const cachedFetch = unstable_cache(
  fetchFaqPageData,
  ["faqPage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["faqPage", "content"] }
);

export async function getFaqPage() {
  if (process.env.NODE_ENV === "development") {
    return await fetchFaqPageData();
  }
  return await cachedFetch();
}
