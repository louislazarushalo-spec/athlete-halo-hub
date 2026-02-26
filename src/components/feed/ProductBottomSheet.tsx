import { ExternalLink, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import type { Product } from "@/data/athletes";

interface ProductBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  /** If set, scroll/highlight this product */
  highlightProductId?: string;
  collectionName?: string;
}

export const ProductBottomSheet = ({
  open,
  onOpenChange,
  products,
  highlightProductId,
  collectionName,
}: ProductBottomSheetProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="flex items-center justify-between pb-2">
          <DrawerTitle className="text-base font-semibold">
            {collectionName || "Shop products"}
          </DrawerTitle>
          <DrawerClose asChild>
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors">
              <X className="h-4 w-4" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] space-y-3">
          {products.map((product) => (
            <article
              key={product.id}
              className={`flex gap-3 p-3 rounded-xl border transition-colors ${
                highlightProductId === product.id
                  ? "border-primary/40 bg-primary/5"
                  : "border-border/40 bg-card"
              }`}
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h4 className="text-[13px] font-semibold text-foreground line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="font-display font-bold text-[15px]">
                    {product.currency}{product.price}
                  </span>
                  <Button
                    size="sm"
                    className="h-8 text-[12px] px-3 rounded-full"
                    onClick={() => {
                      // MVP: open external buy URL or toast
                      window.open(`#buy-${product.id}`, "_blank");
                    }}
                  >
                    <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                    Buy
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

/* ─── Single Product Sheet (for hotspot tap) ─── */
export const SingleProductSheet = ({
  open,
  onOpenChange,
  product,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}) => {
  if (!product) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          {/* Product image */}
          <div className="relative h-52 bg-muted overflow-hidden rounded-t-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="px-4 pt-4 space-y-3">
            <div>
              <h3 className="text-[16px] font-semibold text-foreground">
                {product.name}
              </h3>
              <p className="text-[13px] text-muted-foreground mt-1">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-xl">
                {product.currency}{product.price}
              </span>
              <Button
                size="lg"
                className="rounded-full px-6"
                onClick={() => {
                  window.open(`#buy-${product.id}`, "_blank");
                }}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Buy now
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
