import { useState, useMemo } from "react";
import { FaBook } from "react-icons/fa6";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { courseworks } from "@/data/courseworks";

const TITLE = "Relevant Courseworks";

export default function CourseworksSection() {
  const [active, setActive] = useState("All");

  // Get all unique subjects from all courseworks
  const allSubjects = useMemo(() => {
    const subjectsSet = new Set<string>();
    courseworks.forEach((coursework) => {
      if (coursework.subjects) {
        coursework.subjects.forEach((subject) => subjectsSet.add(subject));
      }
    });
    return Array.from(subjectsSet).sort();
  }, []);

  const SUBJECTS = ["All", ...allSubjects];

  const filtered = useMemo(() => {
    if (active === "All") {
      return courseworks;
    }
    return courseworks.filter(
      (coursework) =>
        coursework.subjects && coursework.subjects.includes(active),
    );
  }, [active]);

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-center items-center gap-2 text-2xl font-semibold">
        <FaBook className="text-primary" />
        {TITLE}
      </div>

      <div className="flex flex-row gap-4">
        <div className="w-52 flex flex-col gap-1">
          <span className="text-sm font-medium text-muted-foreground mb-2">
            Subjects
          </span>

          {SUBJECTS.map((subject) => (
            <button
              key={subject}
              onClick={() => setActive(subject)}
              className={cn(
                "px-3 py-2 rounded-sm text-left cursor-pointer",
                active === subject
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted",
              )}
            >
              {subject}
            </button>
          ))}

          <Separator className="my-4" />

          <p className="text-sm leading-relaxed text-muted-foreground">
            Filter courseworks by subject to explore my academic background.
          </p>
        </div>

        <ScrollArea className="w-full max-h-96 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 flex-1">
            {filtered.map((coursework, index) => {
              const key = `${coursework.title}-${index}`;

              return (
                <Card
                  key={key}
                  className="py-4 rounded-md gap-2 h-full flex flex-col justify-between"
                >
                  <CardHeader>
                    <CardTitle className="flex flex-row items-center gap-2">
                      {coursework.title}
                    </CardTitle>

                    {coursework.term && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {coursework.term}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="pt-1 flex flex-col gap-3 flex-1">
                    {coursework.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {coursework.description}
                      </p>
                    )}

                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row items-center justify-between flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs w-fit">
                          {coursework.institution}
                        </Badge>
                      </div>

                      {coursework.subjects && coursework.subjects.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {coursework.subjects.map((subject) => (
                            <Badge
                              key={subject}
                              variant="outline"
                              className="text-xs"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
