import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export interface MissionPhase {
  title?: string;
  description?: string;
  icon?: string;
  imageUrls: string[];
  order: number;
}

export interface MissionHeroData {
  title?: string;
  subtitle?: string;
  backgroundImageUrl?: string | null;
  backgroundVideoUrl?: string | null;
}

export interface MissionSetupData {
  title?: string;
  description?: string;
}

export interface EventData {
  _id: string;
  title: string;
  badge?: string;
  eventType: "single_event" | "recurring_event";
  date?: string; // ISO date string "YYYY-MM-DD"
  time?: string;
  description?: string;
  location?: string;
  ctaLabel?: string;
  ctaUrl?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  pinned?: boolean;
  displayOrder?: number;
}

export interface LandingPageData {
  seo?: {
    seoTitle?: string;
    seoDescription?: string;
    canonicalUrl?: string;
    seoImageUrl?: string | null;
  };

  hero: {
    videoUrl?: string;
    mobileVideoUrl?: string;
    posterImageUrl?: string;
    preHeading?: string;
    mainHeading?: string;
    subHeading?: string;
    playIndicatorText?: string;
  };

  story: {
    blinkingLabel?: string;
    headline?: string;
    subheadline?: string;
    real007: {
      heading?: string;
      paragraph1?: string;
      paragraph2?: string;
      bullets?: string[];
      imageUrl?: string | null;
    };
  };

  experience: {
    sectionTitle?: string;
    sectionSubtitle?: string;
    eyebrowLabel?: string;
    ctaLabel?: string;
    ctaLink?: string;
    showcaseImages: { url: string; title?: string; role?: string }[];
    paragraphs?: string[];
    missionExperience?: {
      hero: MissionHeroData;
      setup: MissionSetupData;
      phases: MissionPhase[];
    };
  };

  assignment: {
    sectionTitle?: string;
    cards?: {
      title?: string;
      description?: string;
      duration?: string;
      features?: string[];
      ctaText?: string;
      imageUrl?: string | null;
    }[];
  };

  privateEvents: {
    label?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    features?: { icon?: string; text?: string }[];
    ctaText?: string;
    ctaLink?: string;
    imageUrl?: string | null;
    videographyLabel?: string;
    videographyTitle?: string;
    videographySubtitle?: string;
    videographyHighlights?: string[];
    photographyHighlights?: string[];
  };

  inquire: {
    preHeading?: string;
    mainHeading?: string;
    description?: string;
    form?: {
      formTitle?: string;
      firstNameLabel?: string;
      firstNamePlaceholder?: string;
      lastNameLabel?: string;
      lastNamePlaceholder?: string;
      emailLabel?: string;
      emailPlaceholder?: string;
      phoneLabel?: string;
      phonePlaceholder?: string;
      groupSizeLabel?: string;
      groupSizeDefaultOption?: string;
      groupSizeOptions?: string[];
      eventDateLabel?: string;
      messageLabel?: string;
      messagePlaceholder?: string;
      submitButtonText?: string;
      submitButtonLoadingText?: string;
    };
    success?: {
      title?: string;
      message?: string;
      buttonText?: string;
    };
  };

  events: EventData[];

  upcomingEventsSection?: {
    videoMuteLabel?: string;
  };
}

// ─── GROQ QUERY — LANDING PAGE ────────────────────────────────────────────────

const query = `
  *[_type == "landingPage"][0] {
    seoTitle,
    seoDescription,
    canonicalUrl,
    seoImage,

    hero {
      videoFile { asset->{ url } },
      mobileVideoFile { asset->{ url } },
      posterImage,
      preHeading,
      mainHeading,
      subHeading,
      playIndicatorText
    },

    story {
      blinkingLabel,
      headline,
      subheadline,
      real007 {
        heading,
        paragraph1,
        paragraph2,
        bullets,
        image { asset->{ url }, hotspot, crop }
      }
    },

    experience {
      sectionTitle,
      sectionSubtitle,
      eyebrowLabel,
      ctaLabel,
      ctaLink,
      "showcaseImages": showcaseImages[] {
        image { asset->{ url }, hotspot, crop },
        title,
        role
      },
      paragraphs,
      missionExperience {
        hero {
          title,
          subtitle,
          backgroundImage { asset->{ url }, hotspot, crop },
          backgroundVideo { asset->{ url } }
        },
        setup {
          title,
          description
        },
        "phases": phases[] | order(order asc) {
          title,
          description,
          icon,
          images[] { asset->{ url }, hotspot, crop },
          order
        }
      }
    },

    assignment {
      sectionTitle,
      "cards": cards[] {
        title,
        description,
        duration,
        features,
        ctaText,
        image { asset->{ url }, hotspot, crop }
      }
    },

    privateEvents {
      label,
      title,
      subtitle,
      description,
      "features": features[] { icon, text },
      ctaText,
      ctaLink,
      image { asset->{ url }, hotspot, crop },
      videographyLabel,
      videographyTitle,
      videographySubtitle,
      videographyHighlights,
      photographyHighlights
    },

    inquire {
      preHeading,
      mainHeading,
      description,
      form {
        formTitle,
        firstNameLabel,
        firstNamePlaceholder,
        lastNameLabel,
        lastNamePlaceholder,
        emailLabel,
        emailPlaceholder,
        phoneLabel,
        phonePlaceholder,
        groupSizeLabel,
        groupSizeDefaultOption,
        groupSizeOptions,
        eventDateLabel,
        messageLabel,
        messagePlaceholder,
        submitButtonText,
        submitButtonLoadingText
      },
      success {
        title,
        message,
        buttonText
      }
    },

    "upcomingEventsSection": upcomingEvents {
      videoMuteLabel
    },

    "events": upcomingEvents.events[] | order(pinned desc, displayOrder asc) {
      _key,
      title,
      badge,
      eventType,
      date,
      time,
      description,
      location,
      ctaLabel,
      ctaUrl,
      pinned,
      displayOrder,
      image { asset->{ url }, hotspot, crop },
      videoFile { asset->{ url } }
    }
  }
`;

// ─── DATA TRANSFORMATION ──────────────────────────────────────────────────────

function processImageToUrl(
  image: unknown,
  width?: number,
  quality = 85,
): string | null {
  if (!image) return null;
  try {
    let builder = urlFor(image).auto("format").quality(quality);
    if (width) builder = builder.width(width);
    return builder.url();
  } catch {
    return null;
  }
}

const fetchLandingPageData = async (): Promise<LandingPageData | null> => {
  try {
    const raw = await client.fetch(query);
    if (!raw) return null;

    const data: LandingPageData = {
      seo: {
        seoTitle: raw.seoTitle,
        seoDescription: raw.seoDescription,
        canonicalUrl: raw.canonicalUrl,
        seoImageUrl:
          raw.seoImage?.asset?.url ??
          processImageToUrl(raw.seoImage, 1200) ??
          null,
      },

      hero: {
        videoUrl: raw.hero?.videoFile?.asset?.url ?? undefined,
        mobileVideoUrl: raw.hero?.mobileVideoFile?.asset?.url ?? undefined,
        posterImageUrl:
          processImageToUrl(raw.hero?.posterImage, 1920) ?? undefined,
        preHeading: raw.hero?.preHeading,
        mainHeading: raw.hero?.mainHeading,
        subHeading: raw.hero?.subHeading,
        playIndicatorText: raw.hero?.playIndicatorText,
      },

      story: {
        blinkingLabel: raw.story?.blinkingLabel ?? "Classified Intelligence",
        headline: raw.story?.headline ?? "Spies of Style",
        subheadline:
          raw.story?.subheadline ??
          "Step into the true mission of Cecil Richard Mallaby — a WWII spy whose daring story inspired James Bond — through an immersive dinner or cocktail experience on Lake Como.",
        real007: {
          heading: raw.story?.real007?.heading ?? "The Real-Life 007",
          paragraph1: raw.story?.real007?.paragraph1,
          paragraph2: raw.story?.real007?.paragraph2,
          bullets: raw.story?.real007?.bullets ?? [],
          imageUrl:
            (raw.story?.real007?.image?.asset?.url as string | undefined) ??
            processImageToUrl(raw.story?.real007?.image, 1000) ??
            null,
        },
      },

      experience: {
        sectionTitle: raw.experience?.sectionTitle ?? "Step Into the Spotlight",
        sectionSubtitle: raw.experience?.sectionSubtitle,
        eyebrowLabel: raw.experience?.eyebrowLabel ?? "The Experience",
        ctaLabel: raw.experience?.ctaLabel ?? "Mission Experience",
        ctaLink: raw.experience?.ctaLink ?? "#mission-experience",
        showcaseImages: (raw.experience?.showcaseImages ?? [])
          .map(
            (item: {
              image?: { asset?: { url?: string } };
              title?: string;
              role?: string;
            }) => ({
              url:
                item.image?.asset?.url ??
                processImageToUrl(item.image, 800) ??
                "",
              title: item.title,
              role: item.role,
            }),
          )
          .filter((img: { url: string }) => img.url),
        paragraphs: raw.experience?.paragraphs ?? [],
        missionExperience: raw.experience?.missionExperience
          ? {
              hero: {
                title: raw.experience.missionExperience.hero?.title,
                subtitle: raw.experience.missionExperience.hero?.subtitle,
                backgroundImageUrl:
                  raw.experience.missionExperience.hero?.backgroundImage?.asset
                    ?.url ??
                  processImageToUrl(
                    raw.experience.missionExperience.hero?.backgroundImage,
                    1920,
                  ) ??
                  null,
                backgroundVideoUrl:
                  raw.experience.missionExperience.hero?.backgroundVideo?.asset
                    ?.url ?? null,
              },
              setup: {
                title: raw.experience.missionExperience.setup?.title,
                description:
                  raw.experience.missionExperience.setup?.description,
              },
              phases: (raw.experience.missionExperience.phases ?? []).map(
                (phase: {
                  title?: string;
                  description?: string;
                  icon?: string;
                  images?: { asset?: { url?: string } }[];
                  order?: number;
                }): MissionPhase => ({
                  title: phase.title,
                  description: phase.description,
                  icon: phase.icon,
                  imageUrls: (phase.images ?? [])
                    .map(
                      (img) =>
                        img.asset?.url ?? processImageToUrl(img, 900) ?? "",
                    )
                    .filter(Boolean),
                  order: phase.order ?? 0,
                }),
              ),
            }
          : undefined,
      },

      assignment: {
        sectionTitle: raw.assignment?.sectionTitle ?? "Choose Your Assignment",
        cards: (raw.assignment?.cards ?? []).map(
          (card: {
            title?: string;
            description?: string;
            duration?: string;
            features?: string[];
            ctaText?: string;
            image?: { asset?: { url?: string } };
          }) => ({
            title: card.title,
            description: card.description,
            duration: card.duration,
            features: card.features ?? [],
            ctaText: card.ctaText,
            imageUrl:
              card.image?.asset?.url ??
              processImageToUrl(card.image, 900) ??
              null,
          }),
        ),
      },

      privateEvents: {
        label: raw.privateEvents?.label,
        title: raw.privateEvents?.title,
        subtitle: raw.privateEvents?.subtitle,
        description: raw.privateEvents?.description,
        features: (raw.privateEvents?.features ?? []).map(
          (f: { icon?: string; text?: string }) => ({
            icon: f.icon,
            text: f.text,
          }),
        ),
        ctaText: raw.privateEvents?.ctaText,
        ctaLink: raw.privateEvents?.ctaLink,
        imageUrl:
          (raw.privateEvents?.image?.asset?.url as string | undefined) ??
          processImageToUrl(raw.privateEvents?.image, 1600) ??
          null,
        videographyLabel: raw.privateEvents?.videographyLabel,
        videographyTitle: raw.privateEvents?.videographyTitle,
        videographySubtitle: raw.privateEvents?.videographySubtitle,
        videographyHighlights: raw.privateEvents?.videographyHighlights ?? [],
        photographyHighlights: raw.privateEvents?.photographyHighlights ?? [],
      },

      inquire: {
        preHeading: raw.inquire?.preHeading ?? "Get in Touch",
        mainHeading: raw.inquire?.mainHeading ?? "The Spotlight Awaits",
        description: raw.inquire?.description,
        form: raw.inquire?.form ?? {},
        success: raw.inquire?.success ?? {},
      },

      events: (raw.events ?? []).map(
        (
          ev: {
            _key?: string;
            title?: string;
            badge?: string;
            eventType?: string;
            date?: string;
            time?: string;
            description?: string;
            location?: string;
            ctaLabel?: string;
            ctaUrl?: string;
            pinned?: boolean;
            displayOrder?: number;
            image?: { asset?: { url?: string } };
            videoFile?: { asset?: { url?: string } };
          },
          i: number,
        ): EventData => ({
          _id: ev._key ?? `event-${i}`,
          title: ev.title ?? "",
          badge: ev.badge,
          eventType:
            ev.eventType === "recurring_event"
              ? "recurring_event"
              : "single_event",
          date: ev.date,
          time: ev.time,
          description: ev.description,
          location: ev.location,
          ctaLabel: ev.ctaLabel,
          ctaUrl: ev.ctaUrl ?? null,
          videoUrl: ev.videoFile?.asset?.url ?? null,
          imageUrl:
            ev.image?.asset?.url ??
            processImageToUrl(ev.image, 900) ??
            null,
          pinned: ev.pinned ?? false,
          displayOrder: ev.displayOrder,
        }),
      ),

      upcomingEventsSection: {
        videoMuteLabel: raw.upcomingEventsSection?.videoMuteLabel,
      },
    };

    return data;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    return null;
  }
};

// ─── CACHED EXPORT ────────────────────────────────────────────────────────────

const cachedFetch = unstable_cache(fetchLandingPageData, ["landingPage"], {
  revalidate: DEFAULT_REVALIDATE,
  tags: ["landingPage", "content"],
});

export async function getLandingPageData(): Promise<LandingPageData | null> {
  if (process.env.NODE_ENV === "development") {
    return await fetchLandingPageData();
  }
  return await cachedFetch();
}
