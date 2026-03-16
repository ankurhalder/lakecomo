import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";

export interface FaqPageData {
  hero?: {
    preHeading?: string;
    mainHeading?: string;
    description?: string;
  };
  faqs: { question: string; answer: string }[];
}

const query = `
  *[_type == "faqPage"][0] {
    hero {
      preHeading,
      mainHeading,
      description
    },
    "faqs": faqs[] {
      question,
      answer
    }
  }
`;

const fetchFaqPageData = async (): Promise<FaqPageData | null> => {
  try {
    const raw = await client.fetch(query);
    if (!raw) return null;

    return {
      hero: raw.hero,
      faqs: (raw.faqs ?? [])
        .filter(
          (item: { question?: string; answer?: string }) =>
            item.question && item.answer,
        )
        .map((item: { question: string; answer: string }) => ({
          question: item.question,
          answer: item.answer,
        })),
    };
  } catch (error) {
    console.error("Error fetching faq page data:", error);
    return null;
  }
};

const cachedFetch = unstable_cache(fetchFaqPageData, ["faqPage"], {
  revalidate: DEFAULT_REVALIDATE,
  tags: ["faqPage", "content"],
});

export async function getFaqPageData(): Promise<FaqPageData | null> {
  if (process.env.NODE_ENV === "development") {
    return await fetchFaqPageData();
  }
  return await cachedFetch();
}
