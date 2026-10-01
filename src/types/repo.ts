export interface PublicationEntry {
  title: string;
  authors?: string | null;
  venue?: string | null;
  paper?: string | null;
}

export interface ProjectProps {
  title: string;
  role?: string | null;
  duration?: string | null;
  year?: number | string | null;
  venue?: string | null;
  description?: string | null;
  tools?: string[] | null;
  authors?: string | null;
  authorNotes?: string | null;
  advisors?: string | null;
  github?: string | null;
  paper?: string | null;
  website?: string | null;
  tldr?: string | null;
  publications?: PublicationEntry[] | null;
  image?: string | null;
  featured?: boolean;
}
