import type { SchemaTypeDefinition } from "sanity";
import { project } from "./schemas/project";
import { service } from "./schemas/service";
import { post } from "./schemas/post";
import { author } from "./schemas/author";
import { siteSettings } from "./schemas/siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  service,
  post,
  author,
  siteSettings,
];
