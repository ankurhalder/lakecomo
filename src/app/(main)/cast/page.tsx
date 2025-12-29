
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";

export const metadata = {
  title: "Become the Cast | Lake Como Style",
  description: "Join the cinematic experience. Lights, Camera, Action - Your Time to Shine.",
};

interface CastPageData {
  title: string;
  hero: {
    title: string;
    subtitle: string;
    icon: any;
  };
  showcaseImages: any[];
  content: {
    paragraphs: string[];
  };
}

async function getCastPageData(): Promise<CastPageData | null> {
  return await client.fetch(`
    *[_type == "castPage"][0] {
      title,
      hero,
      showcaseImages,
      content
    }
  `, {}, { next: { revalidate: 60 } });
}

export default async function CastPage() {
  const data = await getCastPageData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  const { hero, showcaseImages, content } = data;

  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black pt-20">
      
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        {hero?.icon && (
          <div className="mb-8 w-24 h-24 md:w-32 md:h-32 relative animate-fade-in-up">
            <Image 
              src={urlFor(hero.icon).url()} 
              alt="Icon" 
              fill 
              className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
          </div>
        )}
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent animate-fade-in-up [animation-delay:200ms]">
          {hero?.title || "Become the Cast"}
        </h1>

        <p className="text-xl md:text-2xl text-white/70 max-w-2xl font-light italic animate-fade-in-up [animation-delay:400ms]">
          {hero?.subtitle}
        </p>
      </section>

      {/* Content Section */}
      {content?.paragraphs && (
        <section className="px-6 py-12 max-w-4xl mx-auto">
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-white/90 font-serif">
            {content.paragraphs.map((para: any, idx: number) => (
              <p key={idx} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${600 + (idx * 100)}ms`, animationFillMode: 'forwards' }}>
                {typeof para === 'string' ? para : para.text}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Showcase Grid */}
      {showcaseImages && showcaseImages.length > 0 && (
        <section className="px-4 py-20 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {showcaseImages.map((img, idx) => (
              <div 
                key={idx} 
                className={`relative group overflow-hidden rounded-lg aspect-[3/4] ${idx % 2 === 0 ? 'lg:translate-y-12' : ''}`}
              >
                <Image
                  src={urlFor(img).width(800).height(1067).url()}
                  alt={`Cast Showcase ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
