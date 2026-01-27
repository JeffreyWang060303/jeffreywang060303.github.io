import { LuUser, LuWrench, LuLibraryBig, LuNewspaper, LuClapperboard, LuMusic, LuBook } from "react-icons/lu";
import { FaScrewdriverWrench, FaChalkboardUser } from "react-icons/fa6";

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
      icon: FaScrewdriverWrench,
    },
    {
      title: `Teaching`,
      url: `teaching`,
      icon: FaChalkboardUser,
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
