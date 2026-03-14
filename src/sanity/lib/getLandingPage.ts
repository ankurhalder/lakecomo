import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export interface LandingPageData {
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
}

// ─── GROQ QUERY ───────────────────────────────────────────────────────────────

const query = `
  *[_type == "landingPage"][0] {
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
