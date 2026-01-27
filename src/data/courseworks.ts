export interface CourseworkProps {
  title: string;
  institution: string;
  description?: string | null;
  term?: string | null;
}

export const courseworks: CourseworkProps[] = [
  {
    title: "MIT 6.4212",
    institution: "MIT",
    description: "Robotic Manipulation",
    term: "Fall 2025",
  },
];
