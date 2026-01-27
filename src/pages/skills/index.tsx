import { usePageTitle } from "@/hooks/use-pagetitle";
import SkillsSection from "@/pages/home/sections/skills";

export default function SkillsPage() {
  usePageTitle("Skills");

  return (
    <div className="flex flex-1 flex-col items-center gap-10">
      <div className="w-full max-w-5xl px-2 md:px-8">
        <SkillsSection />
      </div>
    </div>
  );
}
