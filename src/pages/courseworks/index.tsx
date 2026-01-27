import { usePageTitle } from "@/hooks/use-pagetitle";
import CourseworksSection from "@/pages/home/sections/courseworks";

export default function CourseworksPage() {
  usePageTitle("Relevant Courseworks");

  return (
    <div className="flex flex-1 flex-col items-center gap-10">
      <div className="w-full max-w-5xl px-2 md:px-8">
        <CourseworksSection />
      </div>
    </div>
  );
}
