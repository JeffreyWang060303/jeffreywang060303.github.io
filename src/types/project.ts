export interface ProjectProps {
  title: string;
  role?: string | null;
  duration?: string | null;
  description?: string | null;
  tools?: string[] | null;
  github?: string | null;
  image?: string | null;
}

export type ProjectList = ProjectProps[];
