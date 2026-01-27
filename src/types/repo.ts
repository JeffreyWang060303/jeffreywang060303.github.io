export interface ProjectProps {
  title: string;
  role: string;
  duration: string;
  description: string;
  tools: string[];
  advisors?: string | null;
  github?: string | null;
  image?: string | null;
}
