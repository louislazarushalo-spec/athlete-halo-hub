import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Upload, Search } from "lucide-react";
import type { AssetItem } from "@/hooks/useStudioAthlete";

type FilterType = "all" | "photo" | "video" | "logo";

interface ContentLibraryModalProps {
  open: boolean;
  onClose: () => void;
  assets: AssetItem[];
  onSelect?: (asset: AssetItem) => void;
  onUpload?: (file: File) => Promise<string | null>;
  multiSelect?: boolean;
}

export const ContentLibraryModal = ({
  open,
  onClose,
  assets,
  onSelect,
  onUpload,
  multiSelect,
}: ContentLibraryModalProps) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = assets.filter((a) => {
    if (filter !== "all" && a.type !== filter) return false;
    if (search && !(a.title || "").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUpload) return;
    setUploading(true);
    const url = await onUpload(file);
    setUploading(false);
    if (url && onSelect) {
      onSelect({ id: `upload-${Date.now()}`, url, type: "photo", title: file.name });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Content Library</DialogTitle>
        </DialogHeader>

        {/* Filters + search */}
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "photo", "video", "logo"] as FilterType[]).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs capitalize"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f + "s"}
            </Button>
          ))}
          <div className="flex-1 min-w-[120px]">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="h-8 pl-7 text-xs"
              />
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleUpload} />
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="h-3.5 w-3.5 mr-1" />
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto mt-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No assets found. Upload or connect sources to populate your library.
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {filtered.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => onSelect?.(asset)}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-border/40 hover:border-primary/50 transition-colors bg-muted"
                >
                  <img
                    src={asset.url}
                    alt={asset.title || "Asset"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  {asset.isLowQuality && (
                    <Badge variant="destructive" className="absolute top-1 right-1 text-[9px] px-1 py-0">
                      Low quality
                    </Badge>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white truncate">{asset.title || "Untitled"}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
