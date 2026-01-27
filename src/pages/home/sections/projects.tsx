import { Link } from "react-router";
import { FaWrench, FaGithub, FaArrowRight } from "react-icons/fa6";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const { title, role, duration, description, tools, advisors, github, image } =
    projectData;

  return (
    <Card className="rounded-md overflow-hidden gap-0 py-0 w-full flex flex-col h-full">
      <div className="flex flex-col flex-grow">
        {image && (
          <a
            href={github || "#"}
            target={github ? "_blank" : undefined}
            rel={github ? "noopener noreferrer" : undefined}
            className="block"
          >
            <div className="aspect-3/2 w-full overflow-hidden">
              <img
                src={image}
                alt={title || "Project image"}
                className="w-full h-full object-cover"
                style={{ overflowClipMargin: "unset" }}
                loading="lazy"
              />
            </div>
          </a>
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
            <p className="font-medium line-clamp-1">{role}</p>
            <p>{duration}</p>
            {advisors && (
              <p className="text-xs mt-1">Advisors: {advisors}</p>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

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

          <div className="flex flex-row items-center justify-end text-muted-foreground mt-auto pt-2">
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
