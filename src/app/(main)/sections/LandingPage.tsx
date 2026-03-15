"use client";

import type { LandingPageData } from "@/sanity/lib/getLandingPage";
import HeroSection from "./HeroSection";
import StorySection from "./StorySection";
import ExperienceSection from "./ExperienceSection";
import AssignmentSection from "./AssignmentSection";
import PrivateEventsSection from "./PrivateEventsSection";
import UpcomingEventsSection from "./UpcomingEventsSection";
import InquireSection from "./InquireSection";

export default function LandingPage({ data }: { data: LandingPageData }) {
  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <HeroSection data={data.hero} />
      <StorySection data={data.story} />
      <ExperienceSection data={data.experience} />
      <AssignmentSection data={data.assignment} />
      <PrivateEventsSection data={data.privateEvents} />
      <UpcomingEventsSection events={data.events} />
      <InquireSection data={data.inquire} />
    </div>
  );
}
