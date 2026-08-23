import { useState } from "react";

import { cn } from "@/lib/utils";
import { EntryCard } from "@/components/entry-card";

import { projects, featuredReposArray } from "@/data/repos";

const TABS = [
  { key: "selected", label: "Selected" },
  { key: "all", label: "All" },
] as const;

type Tab = (typeof TABS)[number]["key"];

export function ProjectsList() {
  const [tab, setTab] = useState<Tab>("selected");

  const entries = tab === "selected" ? featuredReposArray : projects;

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors",
              tab === t.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 w-full gap-4">
        {entries.map((entry, index) => (
          <EntryCard key={index} entry={entry} />
        ))}
      </div>
    </div>
  );
}
