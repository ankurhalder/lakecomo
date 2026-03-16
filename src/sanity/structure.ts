import type { StructureResolver } from "sanity/structure";

// Singletons — exactly one of each exists.
// Opening a sidebar item goes directly to that document (no list view).
const SINGLETONS: Array<{ type: string; title: string; id: string }> = [
  { type: "landingPage", title: "Landing Page", id: "landingPage" },
  {
    type: "missionExperiencePage",
    title: "Mission Experience",
    id: "missionExperiencePage",
  },
  { type: "navbar", title: "Navbar", id: "navbar" },
  { type: "footer", title: "Footer", id: "footer" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singleton pages
      ...SINGLETONS.map(({ type, title, id }) =>
        S.listItem()
          .title(title)
          .schemaType(type)
          .child(S.document().title(title).schemaType(type).documentId(id)),
      ),

      S.divider(),

      // Events — multiple documents, shown as a list
      S.listItem()
        .title("Events")
        .schemaType("event")
        .child(
          S.documentTypeList("event")
            .title("Events")
            .defaultOrdering([
              { field: "pinned", direction: "desc" },
              { field: "date", direction: "asc" },
            ]),
        ),
    ]);
