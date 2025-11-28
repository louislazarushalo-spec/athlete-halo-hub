import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const filters = [
  "All",
  "Rugby",
  "Football",
  "Tennis",
  "Swimming",
  "Trending",
  "New",
  "Gear",
  "Trainings",
  "Causes",
];

interface FanFilterPillsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FanFilterPills = ({ activeFilter, onFilterChange }: FanFilterPillsProps) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "gold" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter)}
            className="rounded-full px-4 shrink-0"
          >
            {filter}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
};
