"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "@/sanity/schema";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export default defineConfig({
  name: "bruma-studio",
  title: "Bruma Studio",
  projectId,
  dataset,
  apiVersion,
  basePath: "/studio",
  plugins: [structureTool(), visionTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
});
