import { useState } from "react";
import { FaFileLines, FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoLibrary } from "react-icons/io5";
import type { IconType } from "react-icons";

import { Card } from "@/components/ui/card";
import { ImageViewer } from "@/components/image-viewer";

import { authorName } from "@/data/repos";
import type { ProjectProps } from "@/types/repo";

const LINK_ICONS: Record<string, IconType> = {
  Paper: FaFileLines,
  Code: FaGithub,
  Website: FaArrowUpRightFromSquare,
};

function resolveLocalLink(url: string): string {
  return url.startsWith("http")
    ? url
    : "/" + url.split("/").map(encodeURIComponent).join("/");
}

export function EntryCard({ entry }: { entry: ProjectProps }) {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const { title, image, description, authorNotes, venue, authors, advisors } = entry;

  const links: { label: string; href: string }[] = [];
  if (entry.paper) {
    links.push({ label: "Paper", href: resolveLocalLink(entry.paper) });
  }
  if (entry.github) {
    links.push({ label: "Code", href: entry.github });
  }
  if (entry.website) {
    links.push({ label: "Website", href: entry.website });
  }

  return (
    <>
      <Card className="rounded-md overflow-hidden gap-0 py-0 w-full">
        <div className="flex flex-col lg:flex-row">
          <div
            onClick={() => image && setIsImageViewerOpen(true)}
            className={`w-full h-40 lg:w-75 lg:h-50 lg:flex-shrink-0 ${
              image ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
            }`}
          >
            <div className="w-full h-full flex items-center justify-center bg-muted/30 overflow-hidden">
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
          <div className="border-l hidden lg:block" />

          <div className="flex flex-col gap-y-2 p-4 lg:py-3 lg:px-5 flex-1">
            <span className="text-base font-semibold">{title}</span>

            {authors ? (
              <p className="text-sm leading-4.5 text-foreground">
                {authors.split(", ").map((author, i, arr) => (
                  <span
                    key={i}
                    className={author === authorName ? "font-semibold" : ""}
                  >
                    {author}
                    {i < arr.length - 1 && ", "}
                  </span>
                ))}
              </p>
            ) : (
              advisors && (
                <p className="text-sm leading-4.5 text-foreground">
                  Advisors: {advisors}
                </p>
              )
            )}

            {authorNotes && (
              <p className="text-xs text-foreground/70">{authorNotes}</p>
            )}

            {venue && (
              <p className="text-sm italic leading-4.5 text-foreground">{venue}</p>
            )}

            {description && (
              <p className="text-sm text-foreground">{description}</p>
            )}

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
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
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
