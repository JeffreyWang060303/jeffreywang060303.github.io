import { FaWrench } from "react-icons/fa6";

import { Separator } from "@/components/ui/separator";
import { EntryCard, buildEntries } from "@/components/entry-card";
import { usePageTitle } from "@/hooks/use-pagetitle";

import { projects } from "@/data/repos";
import { publications } from "@/data/publications";

export default function ProjectsPage() {
  usePageTitle("Projects");

  const entries = buildEntries(projects, publications.items);

  return (
    <div className="flex flex-1 flex-col items-center gap-10">
      <div className="w-full max-w-6xl space-y-10">
        <div className="flex flex-row justify-center items-center gap-4 text-4xl font-semibold">
          <FaWrench />
          Projects
        </div>

        <Separator />

        <div className="grid grid-cols-1 w-full gap-4 px-2 sm:px-6">
          {entries.map((entry, index) => (
            <EntryCard key={index} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
