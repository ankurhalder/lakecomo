import React from 'react';


interface FeatureItemProps {
  title: string;
  subtitle?: string;
  tag?: string;
  link?: string;
}


const LaurelBadge = ({ item }: { item: FeatureItemProps }) => {
  return (
    <a
      href={item.link || '#'}
      
      className="group relative w-[200px] md:w-[240px] aspect-[4/3] flex items-center justify-center text-center text-white transition-transform duration-300 hover:scale-105"
    >
      {}
      <img
        src="/assets/laurel-wreath.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain opacity-90 pointer-events-none drop-shadow-sm"
      />

      {}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1 px-8 py-6">
        {}
        {item.subtitle && (
          <p className="text-[8px] md:text-[9px] uppercase tracking-wider font-light leading-tight text-gray-100 max-w-[140px]">
            {item.subtitle}
          </p>
        )}

        {}
        <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-tighter leading-none drop-shadow-lg text-white font-sans my-1">
          {item.title}
        </h3>

        {}
        {item.tag && (
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-medium text-gray-200">
            {item.tag}
          </p>
        )}
      </div>
    </a>
  );
};


export default function LaurelFeatureList({ features: resultFeatures }: { features?: FeatureItemProps[] }) {
  
  const defaultFeatures: FeatureItemProps[] = [
    {
      subtitle: "Dive into the World of Cinematic Creativity",
      title: "THEMED CINEMATIC PARTIES",
      tag: "Choose Your Theme",
      link: "/themes",
    },
    {
      subtitle: "Unlock Your Imagination",
      title: "VENUE SELECTION",
      tag: "2026",
      link: "/venues",
    },
    {
      subtitle: "Discover Your Dream Location",
      title: "GALLERY",
      tag: "2026",
      link: "/gallery",
    },
  ];

  const features = (resultFeatures && resultFeatures.length > 0) ? resultFeatures : defaultFeatures;

  return (
    
    <div className="flex flex-col gap-2 items-end p-6 md:p-12">
      {features.map((item, index) => (
        <LaurelBadge key={index} item={item} />
      ))}
    </div>
  );
}