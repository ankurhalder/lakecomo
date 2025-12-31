import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";

export interface ProcessStep {
  stepNumber: number;
  titleLines: string[];
  subtitle: string;
  description: string;
}

export interface ProcessPageData {
  title: string;
  hero: {
    heading: string;
    subHeading: string;
    details: string;
  };
  heroFeature?: {
    title: string;
    subtitle?: string;
    tag?: string;
    link?: string;
  };
  processSteps: ProcessStep[];
}

const query = `
  *[_type == "processPage"][0] {
    title,
    hero {
      heading,
      subHeading,
      details
    },
    heroFeature {
      title,
      subtitle,
      tag,
      link
    },
    processSteps[] {
      stepNumber,
      titleLines,
      subtitle,
      description
    }
  }
`;

const fetchProcessPageData = async (): Promise<ProcessPageData | null> => {
  try {
    const data = await client.fetch(query);
    
    if (!data) return null;

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
