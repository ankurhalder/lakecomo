'use client'

import { motion } from 'framer-motion'

interface FeatureItemProps {
  title: string;
  subtitle?: string;
  tag?: string;
  link?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
}

const LaurelBadge = ({ item, index }: { item: FeatureItemProps; index: number }) => {
  return (
    <motion.a
      href={item.link || '#'}
      variants={itemVariants}
      whileHover={{ 
        scale: 1.08, 
        rotate: 2,
        transition: { type: "spring" as const, stiffness: 300 }
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px] aspect-[4/3] flex items-center justify-center text-center text-white"
    >
      <motion.img
        src="./assets/laurel-wreath.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain opacity-90 pointer-events-none"
        initial={{ rotate: -5, opacity: 0 }}
        animate={{ rotate: 0, opacity: 0.9 }}
        transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-0.5 md:gap-1 px-4 sm:px-6 md:px-8 py-4 md:py-6">
        {item.subtitle && (
          <motion.p 
            className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] uppercase tracking-wider font-light leading-tight text-gray-100 max-w-[100px] md:max-w-[140px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.2 }}
          >
            {item.subtitle}
          </motion.p>
        )}

        <motion.h3 
          className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold uppercase tracking-tighter leading-none drop-shadow-lg text-white font-sans my-0.5 md:my-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 + index * 0.2, type: "spring" as const }}
        >
          {item.title}
        </motion.h3>

        {item.tag && (
          <motion.p 
            className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] uppercase tracking-[0.2em] font-medium text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + index * 0.2 }}
          >
            {item.tag}
          </motion.p>
        )}
      </div>
    </motion.a>
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
    <motion.div 
      className="flex flex-row lg:flex-col gap-2 md:gap-3 items-center lg:items-end justify-center lg:justify-start p-2 sm:p-4 md:p-6 lg:p-10 overflow-x-auto lg:overflow-visible w-full lg:w-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {features.map((item, index) => (
        <LaurelBadge key={index} item={item} index={index} />
      ))}
    </motion.div>
  );
}