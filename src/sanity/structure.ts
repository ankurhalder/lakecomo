import type { StructureResolver } from "sanity/structure";

import { apiVersion } from "./env";

const SCHEMA_TYPES: Array<{ type: string; defaultTitle: string }> = [
  { type: "homepage", defaultTitle: "Homepage" },
  { type: "navbar", defaultTitle: "Navbar" },
  { type: "footer", defaultTitle: "Footer" },
  { type: "themesPage", defaultTitle: "Themes Page" },
  { type: "castPage", defaultTitle: "Cast Page" },
  { type: "processPage", defaultTitle: "Process Page" },
  { type: "moviePage", defaultTitle: "Movie Page" },
  { type: "crewPage", defaultTitle: "Crew Page" },
  { type: "venuePage", defaultTitle: "Venue Page" },
  { type: "galleryPage", defaultTitle: "Gallery Page" },
  { type: "contactPage", defaultTitle: "Contact Page" },
  { type: "faqPage", defaultTitle: "Faq Page" },
];

type NavLink = {
  label?: string;
  url?: string;
};

const URL_TO_TYPE: Record<string, string> = {
  "/": "homepage",
  "/themes": "themesPage",
  "/cast": "castPage",
  "/process": "processPage",
  "/movie": "moviePage",
  "/crew": "crewPage",
  "/venue": "venuePage",
  "/gallery": "galleryPage",
  "/contact": "contactPage",
  "/faq": "faqPage",
};

const normalizePath = (url?: string) => {
  if (!url) return "";
  try {
    return new URL(url, "http://localhost").pathname || "";
  } catch {
    return url.startsWith("/") ? url : "";
  }
};

const buildNavLabelsByType = (links: NavLink[] = []) => {
  const labels: Record<string, string> = {};
  links.forEach((link) => {
    const path = normalizePath(link.url);
    const type = URL_TO_TYPE[path];
    if (type && link.label) {
      labels[type] = link.label;
    }
  });
  return labels;
};

export const structure: StructureResolver = async (S, context) => {
  const client = context.getClient({ apiVersion });

  const data = await client.fetch<{
    navbar?: { title?: string; links?: NavLink[] };
    footer?: { title?: string };
  }>(`
    {
      "navbar": *[_type == "navbar"][0] { title, links[] { label, url } },
      "footer": *[_type == "footer"][0] { title }
    }
  `);

  const navLabelsByType = buildNavLabelsByType(data?.navbar?.links || []);
  const singletonTitles: Record<string, string | undefined> = {
    navbar: data?.navbar?.title,
    footer: data?.footer?.title,
  };

  return S.list()
    .title("Content")
    .items(
      SCHEMA_TYPES.map(({ type, defaultTitle }) => {
        const navTitle = navLabelsByType[type];
        const singletonTitle = singletonTitles[type];
        const title = navTitle || singletonTitle || defaultTitle;

        return S.listItem()
          .title(title)
          .schemaType(type)
          .child(
            S.documentTypeList(type)
              .title(title)
              .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
          );
      }),
    );
};
