import { FaWrench } from "react-icons/fa6";

import { Separator } from "@/components/ui/separator";
import { ProjectsList } from "@/components/projects-list";
import { usePageTitle } from "@/hooks/use-pagetitle";

export default function ProjectsPage() {
  usePageTitle("Projects");

  return (
    <div className="flex flex-1 flex-col items-center gap-10">
      <div className="w-full max-w-6xl space-y-10">
        <div className="flex flex-row justify-center items-center gap-4 text-4xl font-semibold">
          <FaWrench />
          Projects
        </div>

        <Separator />

        <div className="px-2 sm:px-6">
          <ProjectsList />
        </div>
      </div>
    </div>
  );
}
