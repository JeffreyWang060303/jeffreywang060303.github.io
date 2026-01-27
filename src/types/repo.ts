export interface ProjectProps {
  title: string;
  role: string;
  duration: string;
  description: string;
  tools: string[];
  github?: string | null;
  image?: string | null;
}
