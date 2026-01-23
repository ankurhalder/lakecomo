"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

interface EventShowcaseData {
  title?: string;
  eventTypes?: string[];
  link?: string;
  tagline?: string;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.8,
      ease: "easeOut" as const,
      staggerChildren: 0.1,
      delayChildren: 1.0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const defaultData: EventShowcaseData = {
  title: "Perfect For",
  eventTypes: ["Weddings", "Bachelorette Parties", "Corporate Events"],
  link: "/themes",
  tagline: "Your Event Awaits",
};

export default function HeroEventShowcase({
  data,
}: {
  data?: EventShowcaseData;
}) {
  const { title, eventTypes, link, tagline } = { ...defaultData, ...data };

  return (
    <MotionLink
      href={link || "/themes"}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" as const },
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-[252px] lg:w-[270px] xl:w-[288px] 2xl:w-[342px] aspect-[4/3] flex items-center justify-center text-center mr-4 lg:mr-8"
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.95 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <Image
          src="/assets/laurel-wreath.png"
          alt="Laurel wreath decoration"
          fill
          sizes="380px"
          className="object-contain pointer-events-none"
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-2 px-12 lg:px-14 xl:px-16 py-8 lg:py-10">
        <motion.p
          className="text-[10px] lg:text-xs xl:text-sm uppercase tracking-[0.3em] font-light text-white/80"
          variants={itemVariants}
        >
          {title}
        </motion.p>

        <div className="flex flex-col items-center gap-1.5 my-2">
          {eventTypes?.map((event) => (
            <motion.span
              key={event}
              variants={itemVariants}
              className="text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold uppercase tracking-wider text-white drop-shadow-lg"
            >
              {event}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="text-[9px] lg:text-[10px] xl:text-xs uppercase tracking-[0.25em] font-medium text-white/70 mt-1"
          variants={itemVariants}
        >
          {tagline}
        </motion.p>
      </div>
    </MotionLink>
  );
}
