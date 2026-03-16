import SmoothScroll from "@/components/providers/SmoothScroll";
import { SanityLive } from "@/sanity/lib/live";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

export default function MissionExperienceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ErrorBoundary>
      <SmoothScroll>{children}</SmoothScroll>
      <SanityLive />
    </ErrorBoundary>
  );
}
