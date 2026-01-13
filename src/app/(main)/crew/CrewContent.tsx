"use client";

import { motion } from "framer-motion";
import { Film, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import CrewHero from "./CrewHero";
import CrewMemberCard from "./CrewMemberCard";
import type { CrewPageData } from "@/sanity/lib/getCrewPage";

interface CrewContentProps {
  data: CrewPageData;
}

export default function CrewContent({ data }: CrewContentProps) {
  const { hero, heroFeature, crewMembers } = data;

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <CrewHero hero={hero} heroFeature={heroFeature} />

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--text-primary) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          className="absolute top-20 left-[10%] pointer-events-none"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Film size={24} style={{ color: "var(--accent)", opacity: 0.15 }} />
        </motion.div>

        <motion.div
          className="absolute top-40 right-[15%] pointer-events-none"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Star size={20} style={{ color: "var(--accent)", opacity: 0.12 }} />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-[5%] pointer-events-none"
          animate={{
            y: [0, -15, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Sparkles
            size={18}
            style={{ color: "var(--accent)", opacity: 0.1 }}
          />
        </motion.div>

        {crewMembers && crewMembers.length > 0 ? (
          <div className="relative z-10">
            {crewMembers.map((member, index) => (
              <CrewMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
                bio={member.bio}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p style={{ color: "var(--text-secondary)" }}>
              No crew members found. Add them in Sanity Studio.
            </p>
          </div>
        )}
      </section>

      {data.logos && data.logos.length > 0 && (
        <section className="relative py-12 px-4 md:px-8 lg:px-12 border-y border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-[10px] uppercase tracking-[0.3em] font-light mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              {data.logosTitle || "AS SEEN IN & COLLABORATIONS"}
            </motion.p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {data.logos.map((logo, index) => (
                <motion.div
                  key={`${logo.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center justify-center"
                >
                  {logo.imageUrl && (
                    <div className="relative h-16 md:h-24">
                      <Image
                        src={logo.imageUrl}
                        alt={logo.name || "Logo"}
                        width={400}
                        height={96}
                        className="h-16 md:h-24 w-auto object-contain transition-all duration-500"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative px-4 md:px-8 lg:px-12 py-16 pb-28 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary), var(--bg-secondary), var(--bg-primary))",
          }}
        />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Film
                size={20}
                style={{ color: "var(--accent)", opacity: 0.6 }}
              />
            </motion.div>
          </motion.div>

          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 tracking-tight leading-[1.1]"
            style={{ color: "var(--text-primary)" }}
          >
            Ready to Create Magic Together?
          </h2>
          <p
            className="text-base md:text-lg mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Let our international team bring your cinematic vision to life.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 text-sm md:text-base font-bold uppercase tracking-widest rounded-full transition-colors"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg-primary)",
            }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
