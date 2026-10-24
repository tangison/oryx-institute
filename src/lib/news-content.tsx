"use client";
import type { ComponentType } from "react";

/**
 * The post bodies, behind a client boundary. The MDX runtime's
 * component provider runs on React context, which server components
 * cannot host — so the slug lookup and the render both happen on this
 * side of the boundary, and the server page passes only the slug.
 *
 * Adding a post: add the MDX file to content/news/ (with its
 * `export const meta` block), then one import line and one entry in
 * the registry below. `npm run prebuild` regenerates the meta module;
 * this registry is the body.
 */

import * as postAiProgramme from "../../content/news/2026-10-18-ai-training-programme.mdx";
import * as postRelaunch from "../../content/news/2026-10-25-website-relaunch.mdx";

const REGISTRY: Record<string, ComponentType> = {
  "ai-training-programme": postAiProgramme.default,
  "website-relaunch": postRelaunch.default,
};

export function NewsBody({ slug }: { slug: string }) {
  const Body = REGISTRY[slug];
  if (!Body) return null;
  return <Body />;
}
