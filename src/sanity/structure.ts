import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website Content")
    .items([
      // ── Main content ──────────────────────────────────────────────────────
      S.listItem()
        .title("Landing Page")
        .schemaType("landingPage")
        .child(
          S.document()
            .title("Landing Page")
            .schemaType("landingPage")
            .documentId("landingPage"),
        ),

      S.divider(),

      // ── Site settings ─────────────────────────────────────────────────────
      S.listItem()
        .title("Navigation Bar")
        .schemaType("navbar")
        .child(
          S.document()
            .title("Navigation Bar")
            .schemaType("navbar")
            .documentId("navbar"),
        ),

      S.listItem()
        .title("Footer")
        .schemaType("footer")
        .child(
          S.document()
            .title("Footer")
            .schemaType("footer")
            .documentId("footer"),
        ),
    ]);
