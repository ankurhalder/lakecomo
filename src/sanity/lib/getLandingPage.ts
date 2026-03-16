import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export interface EventData {
  _id: string;
  title: string;
  slug?: string;
  badge?: string;
  eventType: "single_event" | "recurring_event";
  date?: string; // ISO date string "YYYY-MM-DD"
  time?: string;
  description?: string;
  location?: string;
  ctaLabel?: string;
  ctaType?: "scroll_contact";
  imageUrl?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  seoImageUrl?: string | null;
  videoUrl?: string | null; // New: video media support
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
  };

  assignment: {
    sectionTitle?: string;
    cards?: {
      title?: string;
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
      paragraphs
    },

    assignment {
      sectionTitle,
      "cards": cards[] {
        title,
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
    }
  }
`;

// ─── GROQ QUERY — EVENTS ──────────────────────────────────────────────────────

const eventsQuery = `
  *[_type == "event"] | order(pinned desc, date asc) {
    _id,
    title,
    "slug": slug.current,
    badge,
    eventType,
    date,
    time,
    description,
    location,
    ctaLabel,
    ctaType,
    seoTitle,
    seoDescription,
    canonicalUrl,
    seoImage,
    pinned,
    displayOrder,
    media {
      image { asset->{ url }, hotspot, crop },
      video { asset->{ url } }
    },
    image { asset->{ url }, hotspot, crop }
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
    const [raw, rawEvents] = await Promise.all([
      client.fetch(query),
      client.fetch(eventsQuery),
    ]);
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
        ctaLink: raw.experience?.ctaLink ?? "/mission-experience",
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
      },

      assignment: {
        sectionTitle: raw.assignment?.sectionTitle ?? "Choose Your Assignment",
        cards: (raw.assignment?.cards ?? []).map(
          (card: {
            title?: string;
            duration?: string;
            features?: string[];
            ctaText?: string;
            image?: { asset?: { url?: string } };
          }) => ({
            title: card.title,
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

      events: (rawEvents ?? []).map(
        (ev: {
          _id: string;
          title?: string;
          slug?: string;
          badge?: string;
          eventType?: string;
          date?: string;
          time?: string;
          description?: string;
          location?: string;
          ctaLabel?: string;
          ctaType?: string;
          seoTitle?: string;
          seoDescription?: string;
          canonicalUrl?: string;
          seoImage?: { asset?: { url?: string } };
          pinned?: boolean;
          displayOrder?: number;
          media?: {
            image?: { asset?: { url?: string } };
            video?: { asset?: { url?: string } };
          };
          image?: { asset?: { url?: string } };
        }): EventData => ({
          _id: ev._id,
          title: ev.title ?? "",
          slug: ev.slug,
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
          ctaType:
            ev.ctaType === "scroll_contact" ? "scroll_contact" : undefined,
          seoTitle: ev.seoTitle,
          seoDescription: ev.seoDescription,
          canonicalUrl: ev.canonicalUrl,
          seoImageUrl:
            ev.seoImage?.asset?.url ??
            processImageToUrl(ev.seoImage, 1200) ??
            null,
          videoUrl: ev.media?.video?.asset?.url ?? null,
          imageUrl:
            ev.media?.image?.asset?.url ??
            processImageToUrl(ev.media?.image, 900) ??
            ev.image?.asset?.url ??
            processImageToUrl(ev.image, 900) ??
            null,
          pinned: ev.pinned ?? false,
          displayOrder: ev.displayOrder,
        }),
      ),
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
