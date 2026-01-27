import { useState } from "react";
import { Link } from "react-router";
import { FaWrench, FaGithub, FaArrowRight, FaChevronDown, FaChevronUp, FaFileLines } from "react-icons/fa6";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageViewer } from "@/components/image-viewer";

import { featuredReposArray } from "@/data/repos";

export default function ProjectsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-center items-center gap-2 text-plus font-semibold">
        <FaWrench />
        Projects
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {featuredReposArray.map((projectData, index) => (
          <ProjectCard key={index} projectData={projectData} />
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

function ProjectCard({
  projectData,
}: {
  projectData: (typeof featuredReposArray)[number];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  if (!projectData) {
    return (
      <Card className="rounded-md overflow-hidden">
        <div className="flex flex-col items-center justify-center p-4 w-full h-full bg-muted">
          <span className="text-xl font-semibold opacity-80">
            Project not found
          </span>
        </div>
      </Card>
    );
  }

  const { title, role, duration, description, tools, advisors, github, paper, image } =
    projectData;

  return (
    <>
      <Card className="rounded-md overflow-hidden gap-0 py-0 w-full flex flex-col h-full">
        <div className="flex flex-col flex-grow">
          {image && (
            <div
              onClick={() => setIsImageViewerOpen(true)}
              className="block w-full cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-full flex items-center justify-center bg-muted/30 overflow-hidden">
                <img
                  src={image}
                  alt={title || "Project image"}
                  className="w-full h-auto max-h-64 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          )}

        {image && <div className="w-full border-t" />}

        <div className="flex flex-col flex-grow py-3 px-4 gap-y-2">
          <div className="text-base font-semibold line-clamp-2">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="cursor-pointer hover:underline underline-offset-4"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="font-medium">{role}</p>
            <p>{duration}</p>
            {advisors && (
              <p className="text-sm mt-1">Advisors: {advisors}</p>
            )}
          </div>

          {description && (
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-2">
                <p className={`text-sm text-muted-foreground flex-1 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                  {description}
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
            </div>
          )}

          {tools?.length ? (
            <div className="flex flex-wrap gap-1.5">
              {tools.map((tool, idx) => (
                <Button
                  key={idx}
                  variant="secondary"
                  size="sm"
                  className="rounded-sm font-normal px-2 h-7 text-sm"
                >
                  {tool}
                </Button>
              ))}
            </div>
          ) : null}

          <div className="flex flex-row items-center justify-end gap-2 text-muted-foreground mt-auto pt-2">
            {paper && (
              <a
                href={paper.startsWith("http") ? paper : `/${paper}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Paper"
                className="hover:text-foreground"
              >
                <FaFileLines className="w-6 h-6" />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="hover:text-foreground"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
    {image && (
      <ImageViewer
        imageUrl={image}
        alt={title || "Project image"}
        open={isImageViewerOpen}
        onOpenChange={setIsImageViewerOpen}
      />
    )}
    </>
  );
}
