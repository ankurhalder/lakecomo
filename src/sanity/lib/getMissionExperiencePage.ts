import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export interface MissionPhase {
  title?: string;
  description?: string;
  icon?: string;
  imageUrls: string[];
  order: number;
}

export interface MissionExperiencePageData {
  hero: {
    title?: string;
    subtitle?: string;
    backgroundImageUrl?: string | null;
    backgroundVideoUrl?: string | null;
  };

  setup: {
    title?: string;
    description?: string;
  };

  phases: MissionPhase[];
}

// ─── GROQ QUERY ────────────────────────────────────────────────────────────────

const query = `
  *[_type == "missionExperiencePage"][0] {
    hero {
      title,
      subtitle,
      backgroundImage { asset->{ url }, hotspot, crop },
      backgroundVideo { asset->{ url } }
    },

    setup {
      title,
      description
    },

    "phases": phases[] | order(order asc) {
      title,
      description,
      icon,
      images[] { asset->{ url }, hotspot, crop },
      order
    }
  }
`;

// ─── DATA TRANSFORMATION ──────────────────────────────────────────────────────

function processImageToUrl(
  image: unknown,
  width?: number,
  quality = 85,
): string | null {
  if (!image) return null;
  try {
    let builder = urlFor(image).auto("format").quality(quality);
    if (width) builder = builder.width(width);
    return builder.url();
  } catch {
    return null;
  }
}

const fetchMissionExperiencePageData =
  async (): Promise<MissionExperiencePageData | null> => {
    try {
      const raw = await client.fetch(query);
      if (!raw) return null;

      const data: MissionExperiencePageData = {
        hero: {
          title: raw.hero?.title,
          subtitle: raw.hero?.subtitle,
          backgroundImageUrl:
            raw.hero?.backgroundImage?.asset?.url ??
            processImageToUrl(raw.hero?.backgroundImage, 1920) ??
            null,
          backgroundVideoUrl: raw.hero?.backgroundVideo?.asset?.url ?? null,
        },

        setup: {
          title: raw.setup?.title,
          description: raw.setup?.description,
        },

        phases: (raw.phases ?? []).map(
          (phase: {
            title?: string;
            description?: string;
            icon?: string;
            images?: { asset?: { url?: string } }[];
            order?: number;
          }): MissionPhase => ({
            title: phase.title,
            description: phase.description,
            icon: phase.icon,
            imageUrls: (phase.images ?? [])
              .map((img) => img.asset?.url ?? processImageToUrl(img, 900) ?? "")
              .filter(Boolean),
            order: phase.order ?? 0,
          }),
        ),
      };

      return data;
    } catch (error) {
      console.error("Error fetching mission experience page data:", error);
      return null;
    }
  };

// ─── CACHED EXPORT ────────────────────────────────────────────────────────────

const cachedFetch = unstable_cache(
  fetchMissionExperiencePageData,
  ["missionExperiencePage"],
  {
    revalidate: DEFAULT_REVALIDATE,
    tags: ["missionExperiencePage", "content"],
  },
);

export async function getMissionExperiencePageData(): Promise<MissionExperiencePageData | null> {
  if (process.env.NODE_ENV === "development") {
    return await fetchMissionExperiencePageData();
  }
  return await cachedFetch();
}
