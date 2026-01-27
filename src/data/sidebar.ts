import { LuUser, LuWrench, LuLibraryBig, LuSparkles, LuNewspaper, LuClapperboard, LuMusic, LuBook } from "react-icons/lu";

export const sidebar = {
  userName: `[Your Name]`,
  profileImage: `https://github.com/shadcn.png`,
  sections: [
    {
      title: `About Me`,
      url: ``,
      icon: LuUser,
    },
    {
      title: `Projects`,
      url: `projects`,
      icon: LuWrench,
    },
    {
      title: `Publications`,
      url: `publications`,
      icon: LuLibraryBig,
    },
    {
      title: `Skills`,
      url: `skills`,
      icon: LuSparkles,
    },
    {
      title: `Courseworks`,
      url: `courseworks`,
      icon: LuBook,
    },
    {
      title: `Articles`,
      url: `articles`,
      icon: LuNewspaper,
    },
    {
      title: `Movies`,
      url: `movies`,
      icon: LuClapperboard,
    },
    {
      title: `Music`,
      url: `music`,
      icon: LuMusic,
    },
  ],
};
