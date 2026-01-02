import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";

export interface ProcessStep {
  stepNumber: number;
  titleLines: string[];
  tagline: string;
  heading: string;
  body: string;
}

export interface ProcessPageData {
  title: string;
  hero: {
    heading: string;
    subHeading: string;
    description: string;
  };
  heroFeature?: {
    subtitle: string;
    title: string;
    tag?: string;
    link?: string;
  };
  steps: ProcessStep[];
}

const query = `
  *[_type == "processPage"][0] {
    title,
    hero {
      heading,
      subHeading,
      description
    },
    heroFeature {
      subtitle,
      title,
      tag,
      link
    },
    steps[] {
      stepNumber,
      titleLines,
      tagline,
      heading,
      body
    }
  }
`;

const fetchProcessPageData = async (): Promise<ProcessPageData | null> => {
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching process page data:", error);
    return null;
  }
};

const cachedFetch = unstable_cache(
  fetchProcessPageData,
  ["processPage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["processPage", "content"] }
);

export async function getProcessPageData(): Promise<ProcessPageData | null> {
  if (process.env.NODE_ENV === "development") {
    return await fetchProcessPageData();
  }
  return await cachedFetch();
}
