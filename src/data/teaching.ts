export interface TeachingProps {
  courseNumber: string;
  courseTitle: string;
  term: string;
  university: string;
}

export const teaching: { items: TeachingProps[] } = {
  items: [
    {
      courseNumber: "CS 1112",
      courseTitle: "Introduction to Computing",
      term: "Fall 2024",
      university: "Cornell University",
    },
  ],
};
