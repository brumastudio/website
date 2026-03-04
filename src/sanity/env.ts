export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = "2024-01-01";

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID env variable");
if (!dataset) throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET env variable");
