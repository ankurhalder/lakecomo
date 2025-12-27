import { client } from "./client";

export async function getHomePageData() {
  const query = `
    *[_type == "homepage"][0] {
      title,
      heroSection {
        preHeading,
        mainHeading,
        subHeading,
        ctaText,
        ctaLink,
        "videoUrl": videoFile.asset->url
      },
      featuresGrid[] {
        title,
        subtitle,
        tag,
        link,
        "iconUrl": icon.asset->url
      }
    }
  `;
  return await client.fetch(query);
}