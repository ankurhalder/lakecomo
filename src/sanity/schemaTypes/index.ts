import { type SchemaTypeDefinition } from "sanity";
import landingPage from "./landingPage";
import navbar from "./navbar";
import footer from "./footer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingPage, navbar, footer],
};
