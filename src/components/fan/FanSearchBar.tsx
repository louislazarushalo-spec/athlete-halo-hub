import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FanSearchBarProps {
  onSearch?: (query: string) => void;
}

export const FanSearchBar = ({ onSearch }: FanSearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search athletes, sports, gear or routines…"
        className="pl-12 h-12 text-base bg-muted/30 border-border/50 focus:bg-background transition-colors"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};
