import { Link } from "react-router";
import { FaWrench, FaArrowRight } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { EntryCard, buildEntries } from "@/components/entry-card";

import { featuredReposArray } from "@/data/repos";
import { publications } from "@/data/publications";

export default function ProjectsSection() {
  const featuredPublications = publications.items.filter((pub) => pub.featured);
  const entries = buildEntries(featuredReposArray, featuredPublications);

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-center items-center gap-2 text-plus font-semibold">
        <FaWrench />
        Projects
      </div>

      <div className="grid grid-cols-1 w-full gap-4">
        {entries.map((entry, index) => (
          <EntryCard key={index} entry={entry} />
        ))}
      </div>

      <div className="relative w-full">
        <div className="absolute right-0">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground"
          >
            <Link to="/projects">
              View all
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
