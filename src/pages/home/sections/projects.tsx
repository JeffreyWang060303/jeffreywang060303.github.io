import { FaWrench } from "react-icons/fa6";

import { ProjectsList } from "@/components/projects-list";

export default function ProjectsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-center items-center gap-2 text-plus font-semibold">
        <FaWrench />
        Projects
      </div>

      <ProjectsList />
    </div>
  );
}
