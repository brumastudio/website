import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
