import projectsImport from "@/data/generated/repos.json";
import type { ProjectProps } from "@/types/repo";

const data = projectsImport as { authorName: string; items: ProjectProps[] };

export const authorName: string = data.authorName;
export const projects: ProjectProps[] = data.items;

// For backward compatibility, we can still export as repos
export const repos = projects;

// Filter featured projects for the "Selected" view
export const featuredReposArray: ProjectProps[] = projects.filter(
  (project) => project.featured !== false,
);
