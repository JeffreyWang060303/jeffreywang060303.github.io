import { useState } from "react";
import { FaWrench, FaGithub, FaChevronDown, FaChevronUp } from "react-icons/fa6";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePageTitle } from "@/hooks/use-pagetitle";
import { projects } from "@/data/repos";

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

        <div className="grid grid-cols-1 w-full gap-4 px-2 sm:px-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, role, duration, description, tools, advisors, github, image } = project;

  return (
    <Card className="rounded-md overflow-hidden gap-0 py-0 w-full">
      <div className="flex flex-col lg:flex-row">
        {image && (
          <>
            <a
              href={github || "#"}
              target={github ? "_blank" : undefined}
              rel={github ? "noopener noreferrer" : undefined}
              className="block"
            >
              <div className="aspect-3/2 w-full max-h-72 lg:max-w-75 lg:h-50 overflow-hidden">
                <img
                  src={image}
                  alt={title || "Project image"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </a>
            <div className="w-full border-t block lg:hidden" />
            <div className="h-full border-l hidden lg:block" />
          </>
        )}

        <div className="flex flex-col p-4 lg:py-2.5 lg:px-5 flex-1 lg:h-50">
          <ScrollArea className="flex-1 min-h-0">
            <div className="flex flex-col gap-y-2">
              <div className="text-base font-semibold">
                {github ? (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub repository"
                    className="hover:underline underline-offset-4"
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
                  {tools.map((tool: string) => (
                    <Button
                      key={tool}
                      variant="secondary"
                      size="sm"
                      className="rounded-sm font-normal px-2 h-7.5 text-sm"
                    >
                      {tool}
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>
          </ScrollArea>

          <div className="flex flex-row items-center justify-end text-muted-foreground pt-2">
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
  );
}
