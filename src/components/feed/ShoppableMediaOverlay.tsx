import { useState, useCallback } from "react";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductBottomSheet, SingleProductSheet } from "./ProductBottomSheet";
import type { Product } from "@/data/athletes";

interface Hotspot {
  productId: string;
  x: number; // 0-100
  y: number; // 0-100
}

interface ShoppableMediaOverlayProps {
  src: string;
  alt: string;
  products: Product[];
  hotspots?: Hotspot[];
  collectionName?: string;
  ratio?: "1:1" | "4:5";
}

/**
 * Wraps a feed image with tap-to-reveal hotspot markers + a Shop pill.
 * Mobile-first: hotspots appear on tap, bottom sheet for product details.
 */
export const ShoppableMediaOverlay = ({
  src,
  alt,
  products,
  hotspots = [],
  collectionName,
  ratio = "1:1",
}: ShoppableMediaOverlayProps) => {
  const [showHotspots, setShowHotspots] = useState(false);
  const [allProductsOpen, setAllProductsOpen] = useState(false);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [singleOpen, setSingleOpen] = useState(false);

  const handleMediaTap = useCallback(() => {
    if (hotspots.length > 0) {
      setShowHotspots((prev) => !prev);
    }
  }, [hotspots.length]);

  const handleHotspotTap = useCallback(
    (productId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const product = products.find((p) => p.id === productId);
      if (product) {
        setSingleProduct(product);
        setSingleOpen(true);
      }
    },
    [products]
  );

  const handleShopPill = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setAllProductsOpen(true);
    },
    []
  );

  // Limit visible hotspots to 3, show "View all" if more
  const visibleHotspots = hotspots.slice(0, 3);
  const hasMore = hotspots.length > 3;

  return (
    <>
      <div
        className={`relative w-full overflow-hidden bg-muted cursor-pointer ${
          ratio === "4:5" ? "aspect-[4/5]" : "aspect-square"
        }`}
        onClick={handleMediaTap}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />

        {/* Shop pill — always visible */}
        <button
          onClick={handleShopPill}
          className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-card/85 backdrop-blur-md border border-border/50 text-foreground shadow-sm active:scale-95 transition-transform"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span className="text-[11px] font-semibold">Shop</span>
        </button>

        {/* Product thumbnail hints — bottom left */}
        {products.length > 0 && (
          <div className="absolute bottom-2.5 left-2.5 z-10 flex -space-x-2">
            {products.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="w-7 h-7 rounded-full border-2 border-card overflow-hidden bg-muted"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
            {products.length > 3 && (
              <div className="w-7 h-7 rounded-full border-2 border-card bg-muted flex items-center justify-center">
                <span className="text-[9px] font-bold text-muted-foreground">
                  +{products.length - 3}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Hotspot markers — shown on media tap */}
        {showHotspots &&
          visibleHotspots.map((hs) => (
            <button
              key={hs.productId}
              onClick={(e) => handleHotspotTap(hs.productId, e)}
              className="absolute z-20 group"
              style={{
                left: `${hs.x}%`,
                top: `${hs.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Hit area — 44px minimum */}
              <div className="relative w-11 h-11 flex items-center justify-center">
                {/* Pulse ring */}
                <div className="absolute w-6 h-6 rounded-full bg-primary/40 animate-ping" />
                {/* Marker dot */}
                <div className="relative w-6 h-6 rounded-full bg-primary border-2 border-card shadow-lg flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary-foreground">+</span>
                </div>
              </div>
            </button>
          ))}

        {/* "View all" if hotspots > 3 */}
        {showHotspots && hasMore && (
          <button
            onClick={handleShopPill}
            className="absolute bottom-2.5 right-2.5 z-20"
          >
            <Badge
              variant="secondary"
              className="bg-card/90 backdrop-blur-sm text-[11px] font-semibold"
            >
              View all {products.length} items
            </Badge>
          </button>
        )}
      </div>

      {/* Bottom sheets */}
      <ProductBottomSheet
        open={allProductsOpen}
        onOpenChange={setAllProductsOpen}
        products={products}
        collectionName={collectionName}
      />
      <SingleProductSheet
        open={singleOpen}
        onOpenChange={setSingleOpen}
        product={singleProduct}
      />
    </>
  );
};
