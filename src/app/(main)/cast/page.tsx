import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import CastContent from "./CastContent";

export const metadata = {
  title: "Become the Cast | Lake Como Style",
  description: "Join the cinematic experience. Lights, Camera, Action - Your Time to Shine.",
};

interface CastImage {
  url: string;
  title?: string;
  role?: string;
}

interface FallingStarsSettings {
  enabled?: boolean;
  count?: number;
  mobileCount?: number;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
}

interface CastPageData {
  title: string;
  hero: {
    title: string;
    subtitle: string;
  };
  heroFeature?: {
    title: string;
    subtitle?: string;
    tag?: string;
    link?: string;
  };
  fallingStars?: FallingStarsSettings;
  showcaseImages: any[];
  content?: {
    paragraphs: string[];
  };
}
async function getCastPageData(): Promise<CastPageData | null> {
  return await client.fetch(`
    *[_type == "castPage"][0] {
      title,
      hero {
        title,
        subtitle
      },
      heroFeature {
        title,
        subtitle,
        tag,
        link
      },
      fallingStars {
        enabled,
        count,
        mobileCount,
        minSize,
        maxSize,
        minSpeed,
        maxSpeed
      },
      "showcaseImages": showcaseImages[] {
        "url": coalesce(image.asset->url, asset->url),
        "title": title,
        "role": role
      },
      content
    }
  `, {}, { next: { revalidate: 60 } });
}

export default async function CastPage() {
  const data = await getCastPageData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <p style={{ color: 'var(--text-primary)' }}>Loading...</p>
      </div>
    );
  }

  const { hero, heroFeature, fallingStars, showcaseImages, content } = data;

  const images: CastImage[] = (showcaseImages || [])
    .filter((img: any) => img?.url)
    .map((img: any) => ({
      url: img.url,
      title: img.title || undefined,
      role: img.role || undefined
    }));

  return (
    <CastContent 
      hero={hero} 
      heroFeature={heroFeature}
      fallingStars={fallingStars}
      showcaseImages={images} 
      content={content}
    />
  );
}

