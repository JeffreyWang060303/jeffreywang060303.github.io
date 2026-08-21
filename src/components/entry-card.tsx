import { useState } from "react";
import { FaFileLines, FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoLibrary } from "react-icons/io5";
import type { IconType } from "react-icons";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageViewer } from "@/components/image-viewer";

import { publications } from "@/data/publications";
import type { ProjectProps } from "@/types/repo";
import type { Publication } from "@/types/publications";

export type Entry =
  | { kind: "project"; year: number; project: ProjectProps }
  | { kind: "publication"; year: number; publication: Publication };

const LINK_ICONS: Record<string, IconType> = {
  Paper: FaFileLines,
  Code: FaGithub,
  Website: FaArrowUpRightFromSquare,
};

function extractYear(value: string | number): number {
  if (typeof value === "number") return value;
  if (/present/i.test(value)) return new Date().getFullYear();
  const matches = value.match(/20\d{2}/g);
  if (!matches) return 0;
  return Math.max(...matches.map(Number));
}

export function buildEntries(
  projectsList: ProjectProps[],
  publicationsList: Publication[],
): Entry[] {
  const projectEntries: Entry[] = projectsList.map((project) => ({
    kind: "project",
    year: extractYear(project.duration),
    project,
  }));

  const publicationEntries: Entry[] = publicationsList.map((publication) => ({
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

export function EntryCard({ entry }: { entry: Entry }) {
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

  const showDescription =
    isProject && !entry.project.paper && entry.project.description;

  return (
    <>
      <Card className="rounded-md overflow-hidden gap-0 py-0 w-full">
        <div className="flex flex-col lg:flex-row">
          <div
            onClick={() => image && setIsImageViewerOpen(true)}
            className={`w-full lg:w-75 lg:flex-shrink-0 ${
              image ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
            }`}
          >
            <div className="w-full h-40 lg:h-full min-h-40 flex items-center justify-center bg-muted/30 overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <IoLibrary className="w-10 h-10 text-muted-foreground/40" />
              )}
            </div>
          </div>
          <div className="w-full border-t block lg:hidden" />
          <div className="border-l hidden lg:block" />

          <div className="flex flex-col gap-y-2 p-4 lg:py-3 lg:px-5 flex-1">
            <span className="text-base font-semibold">{title}</span>

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

            {showDescription && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {entry.project.description}
              </p>
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

            {links.length > 0 && (
              <div className="flex flex-row flex-wrap items-center gap-2 pt-1 mt-auto">
                {links.map((l) => {
                  const Icon = LINK_ICONS[l.label];
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    >
                      {Icon && <Icon className="w-3 h-3" />}
                      {l.label}
                    </a>
                  );
                })}
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
