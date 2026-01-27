import { FaBook } from "react-icons/fa6";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import { courseworks } from "@/data/courseworks";

export default function CourseworksSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-center items-center gap-2 text-plus font-semibold">
        <FaBook />
        Relevant Courseworks
      </div>

      <Card className="rounded-md md:px-2">
        <ScrollArea className="max-h-96">
          <CardContent className="space-y-4 pt-6">
            {courseworks.map((coursework, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="font-semibold">{coursework.title}</div>
                  {coursework.description && (
                    <div className="text-sm text-muted-foreground">
                      {coursework.description}
                    </div>
                  )}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {coursework.institution}
                </Badge>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
