import { useState } from "react";
import { FaWrench, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoLibrary } from "react-icons/io5";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageViewer } from "@/components/image-viewer";
import { usePageTitle } from "@/hooks/use-pagetitle";

import { projects } from "@/data/repos";
import { publications } from "@/data/publications";
import type { ProjectProps } from "@/types/repo";
import type { Publication } from "@/types/publications";

type Entry =
  | { kind: "project"; year: number; project: ProjectProps }
  | { kind: "publication"; year: number; publication: Publication };

function extractYear(value: string | number): number {
  if (typeof value === "number") return value;
  if (/present/i.test(value)) return new Date().getFullYear();
  const matches = value.match(/20\d{2}/g);
  if (!matches) return 0;
  return Math.max(...matches.map(Number));
}

function buildEntries(): Entry[] {
  const projectEntries: Entry[] = projects.map((project) => ({
    kind: "project",
    year: extractYear(project.duration),
    project,
  }));

  const publicationEntries: Entry[] = publications.items.map((publication) => ({
    kind: "publication",
    year: extractYear(publication.year),
    publication,
  }));

  return [...projectEntries, ...publicationEntries].sort((a, b) => b.year - a.year);
}

function resolveLocalLink(url: string): string {
  return url.startsWith("http")
    ? url
    : "/" + url.split("/").map(encodeURIComponent).join("/");
}

export default function ProjectsPage() {
  usePageTitle("Projects");

  const entries = buildEntries();

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

function EntryCard({ entry }: { entry: Entry }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const isProject = entry.kind === "project";
  const title = isProject ? entry.project.title : entry.publication.title;
  const image = isProject ? entry.project.image : null;

  const metaLine = isProject
    ? `${entry.project.role} · ${entry.project.duration}`
    : entry.publication.venue;

  const links: { label: string; href: string }[] = [];
  if (isProject) {
    if (entry.project.paper) {
      links.push({ label: "Paper", href: resolveLocalLink(entry.project.paper) });
    }
    if (entry.project.github) {
      links.push({
        label: entry.project.github.includes("github.com") ? "Code" : "Website",
        href: entry.project.github,
      });
    }
  } else if (entry.publication.link) {
    links.push({ label: "Paper", href: entry.publication.link });
  }

  return (
    <>
      <Card className="rounded-md overflow-hidden gap-0 py-0 w-full">
        <div className="flex flex-col lg:flex-row">
          <div
            onClick={() => image && setIsImageViewerOpen(true)}
            className={`block w-full lg:w-75 lg:flex-shrink-0 ${
              image ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
            }`}
          >
            <div className="w-full h-40 lg:w-75 lg:h-50 flex items-center justify-center bg-muted/30 overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              ) : (
                <IoLibrary className="w-10 h-10 text-muted-foreground/40" />
              )}
            </div>
          </div>
          <div className="w-full border-t block lg:hidden" />
          <div className="h-full border-l hidden lg:block" />

          <div className="flex flex-col p-4 lg:py-2.5 lg:px-5 flex-1 lg:h-50">
            <ScrollArea className="flex-1 min-h-0">
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row items-center gap-2 flex-wrap">
                  <span className="text-base font-semibold">{title}</span>
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase tracking-wide text-muted-foreground"
                  >
                    {isProject ? "Project" : "Publication"}
                  </Badge>
                </div>

                <p className="text-sm italic leading-4.5 text-muted-foreground">
                  {metaLine}
                </p>

                {isProject ? (
                  entry.project.advisors && (
                    <p className="text-sm text-muted-foreground">
                      Advisors: {entry.project.advisors}
                    </p>
                  )
                ) : (
                  <p className="text-sm leading-4.5 text-muted-foreground">
                    {entry.publication.authors.split(", ").map((author, i, arr) => (
                      <span
                        key={i}
                        className={
                          author === publications.authorName
                            ? "font-semibold text-foreground"
                            : ""
                        }
                      >
                        {author}
                        {i < arr.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                )}

                {isProject && entry.project.description && (
                  <div className="flex items-start gap-2">
                    <p
                      className={`text-sm text-muted-foreground flex-1 ${!isExpanded ? "line-clamp-2" : ""}`}
                    >
                      {entry.project.description}
                    </p>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex-shrink-0 mt-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={isExpanded ? "Collapse description" : "Expand description"}
                    >
                      {isExpanded ? (
                        <FaChevronUp className="w-3 h-3" />
                      ) : (
                        <FaChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                )}

                {isProject && entry.project.tools?.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {entry.project.tools.map((tool) => (
                      <Button
                        key={tool}
                        variant="secondary"
                        size="sm"
                        className="rounded-sm font-normal px-2 h-7 text-sm"
                      >
                        {tool}
                      </Button>
                    ))}
                  </div>
                ) : null}
              </div>
            </ScrollArea>

            {links.length > 0 && (
              <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-sm">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline underline-offset-4"
                  >
                    [{l.label}]
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
      {image && (
        <ImageViewer
          imageUrl={image}
          alt={title}
          open={isImageViewerOpen}
          onOpenChange={setIsImageViewerOpen}
        />
      )}
    </>
  );
}
