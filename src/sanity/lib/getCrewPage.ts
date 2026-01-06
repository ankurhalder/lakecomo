import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

export interface CrewMemberSocials {
  website?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}

export interface CrewMember {
  name: string;
  role: string;
  imageUrl?: string;
  bio: string[];
  socials?: CrewMemberSocials;
}

export interface Logo {
  name?: string;
  imageUrl?: string;
}

export interface CrewPageData {
  title: string;
  hero: {
    heading: string;
    subHeading: string;
    description?: string;
  };
  heroFeature?: {
    title: string;
    subtitle?: string;
    tag?: string;
    link?: string;
  };
  crewMembers: CrewMember[];
  logosTitle?: string;
  logos?: Logo[];
}

const query = `
  *[_type == "crewPage"][0] {
    title,
    hero {
      heading,
      subHeading,
      description
    },
    heroFeature {
      title,
      subtitle,
      tag,
      link
    },
    crewMembers[] {
      name,
      role,
      image,
      bio,
      socials {
        website,
        instagram,
        linkedin,
        twitter
      }
    },
    logosTitle,
    logos
  }
`;

const fetchCrewPageData = async (): Promise<CrewPageData | null> => {
  try {
    const data = await client.fetch(query);
    
    if (!data) return null;

    if (data.crewMembers) {
      data.crewMembers = data.crewMembers.map((member: { image?: object; name: string; role: string; bio?: string[]; socials?: CrewMemberSocials }) => ({
        name: member.name,
        role: member.role,
        imageUrl: member.image ? urlFor(member.image).auto('format').url() : undefined,
        bio: member.bio || [],
        socials: member.socials,
      }));
    }

    if (data.logos) {
      data.logos = data.logos.map((logo: { name?: string } & object) => ({
        name: logo.name,
        imageUrl: logo ? urlFor(logo).auto('format').url() : undefined,
      }));
    }

    return data;
  } catch (error) {
    console.error("Error fetching crew page data:", error);
    return null;
  }
};

const cachedFetch = unstable_cache(
  fetchCrewPageData,
  ["crewPage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["crewPage", "content"] }
);

export async function getCrewPageData(): Promise<CrewPageData | null> {
  if (process.env.NODE_ENV === "development") {
    return await fetchCrewPageData();
  }
  return await cachedFetch();
}
