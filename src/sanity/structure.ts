import type { StructureResolver } from "sanity/structure";

// Each document type is a singleton — exactly one of each exists.
// Opening a sidebar item goes directly to that document (no list view).
const SINGLETONS: Array<{ type: string; title: string; id: string }> = [
  { type: "landingPage", title: "Landing Page", id: "landingPage" },
  { type: "navbar",      title: "Navbar",        id: "navbar" },
  { type: "footer",      title: "Footer",        id: "footer" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items(
      SINGLETONS.map(({ type, title, id }) =>
        S.listItem()
          .title(title)
          .schemaType(type)
          .child(
            S.document()
              .title(title)
              .schemaType(type)
              .documentId(id),
          ),
      ),
    );
