import { client, DEFAULT_REVALIDATE } from "./client";
import { unstable_cache } from "next/cache";
import { urlFor } from "./image";

const query = `
  *[_type == "contactPage"][0] {
    title,
    hero {
      preHeading,
      mainHeading,
      description
    },
    cameraImage,
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
      buttonText,
      buttonLink
    }
  }
`;

const fetchContactPageData = async () => {
  try {
    const data = await client.fetch(query);
    
    if (!data) return null;

    if (data.cameraImage) {
      data.cameraImageUrl = urlFor(data.cameraImage).auto('format').url();
    }

    return data;
  } catch (error) {
    console.error("Error fetching contact page data:", error);
    return null;
  }
};

const cachedFetch = unstable_cache(
  fetchContactPageData,
  ["contactPage"],
  { revalidate: DEFAULT_REVALIDATE, tags: ["contactPage", "content"] }
);

export async function getContactPageData() {
  if (process.env.NODE_ENV === "development") {
    return await fetchContactPageData();
  }
  return await cachedFetch();
}
