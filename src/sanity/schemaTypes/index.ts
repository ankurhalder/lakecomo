import { type SchemaTypeDefinition } from "sanity";
import landingPage from "./landingPage";
import navbar from "./navbar";
import footer from "./footer";
import event from "./event";
import missionExperiencePage from "./missionExperiencePage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingPage, navbar, footer, event, missionExperiencePage],
};
