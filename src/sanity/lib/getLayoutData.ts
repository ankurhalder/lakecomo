import { client } from "./client";

export async function getLayoutData() {
  const query = `
    {
      "navbar": *[_type == "navbar"][0] {
        logoText,
        "logoUrl": logoImage.asset->url,
        links[] { label, url },
        ctaText,
        ctaLink
      },
      "footer": *[_type == "footer"][0] {
        footerTagline,
        email,
        copyright,
        socialLinks[] { platform, url }
      }
    }
  `;
  return await client.fetch(query);
}