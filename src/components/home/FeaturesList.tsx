'use client'

import { motion } from 'framer-motion'
import LaurelBadge from '../shared/LaurelBadge'

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

export default function LaurelFeatureList({ features: resultFeatures }: { features?: FeatureItemProps[] }) {
  const features = (resultFeatures && resultFeatures.length > 0) ? resultFeatures : defaultFeatures;

  return (
    <motion.div 
      className="flex flex-row lg:flex-col gap-1 md:gap-2 2xl:gap-3 items-center lg:items-end justify-center lg:justify-start p-2 sm:p-3 md:p-4 lg:p-4 2xl:p-8 overflow-x-auto lg:overflow-visible w-full lg:w-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {features.map((item, index) => (
        <LaurelBadge 
          key={item.title} 
          title={item.title}
          subtitle={item.subtitle}
          tag={item.tag}
          link={item.link}
          themeAware={false}
          index={index} 
        />
      ))}
    </motion.div>
  );
}