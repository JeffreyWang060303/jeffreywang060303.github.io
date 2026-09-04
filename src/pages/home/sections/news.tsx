import { FaBullhorn } from "react-icons/fa6";

import { news } from "@/data/news";

export default function NewsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-center items-center gap-2 text-plus font-semibold">
        <FaBullhorn />
        News
      </div>

      <div className="flex flex-col gap-5">
        {news.items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-5"
          >
            <span className="text-base font-semibold text-foreground sm:w-28 sm:shrink-0">
              {item.date}
            </span>
            <p
              className="text-base text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
