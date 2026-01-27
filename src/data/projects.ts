import projectsImport from "@/data/generated/projects.json";
import type { ProjectProps } from "@/types/project";

export const projects = projectsImport as ProjectProps[];

// Provide a normalized map similar to repos for UI reuse
export const normalizedProjects = projects.map((p) => ({
  name: p.title,
  displayName: p.title,
  previewImage: p.image ?? null,
  description: p.description ?? null,
  topics: p.tools ?? [],
  language: null,
  stargazers_count: null,
  homepage: p.github ?? null,
  html_url: p.github ?? null,
  created_at: new Date().toISOString(),
  pushed_at: new Date().toISOString(),
  featured: true,
}));
