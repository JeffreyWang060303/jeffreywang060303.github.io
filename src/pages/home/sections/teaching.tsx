import { FaChalkboardUser } from "react-icons/fa6";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { teaching } from "@/data/teaching";

export default function TeachingSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-center items-center gap-2 text-plus font-semibold">
        <FaChalkboardUser />
        Teaching Experience
      </div>

      <div className="overflow-hidden">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[calc(100%-120px)]">Course</TableHead>
              <TableHead className="w-[120px] text-right">Term</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teaching.items.map((item, index) => (
              <TableRow key={index} className="transition-none">
                <TableCell className="whitespace-normal space-y-1">
                  <div className="text-base font-semibold">
                    {item.courseNumber}: {item.courseTitle}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.university}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-right text-muted-foreground">
                  {item.term}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
