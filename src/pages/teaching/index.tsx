import { usePageTitle } from "@/hooks/use-pagetitle";
import TeachingSection from "@/pages/home/sections/teaching";

export default function TeachingPage() {
  usePageTitle("Teaching Experience");

  return (
    <div className="flex flex-1 flex-col items-center gap-10">
      <div className="w-full max-w-5xl px-2 md:px-8">
        <TeachingSection />
      </div>
    </div>
  );
}
