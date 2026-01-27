import projectsImport from "@/data/generated/repos.json";
import type { ProjectProps } from "@/types/repo";

// Projects are now stored as an array
export const projects: ProjectProps[] = projectsImport as ProjectProps[];

// For backward compatibility, we can still export as repos
export const repos = projects;

// All projects are "featured" in the new format (no featured field)
export const featuredReposArray: ProjectProps[] = projects;
