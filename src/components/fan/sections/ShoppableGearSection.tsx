import { useState } from "react";
import { ShoppingCart, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface ShoppableProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  category: 'partner' | 'athlete';
  athleteId: string;
  hotspot?: {
    x: number; // percentage from left
    y: number; // percentage from top
  };
}

interface ShoppableGearSectionProps {
  athleteName: string;
  actionImage: string;
  products: ShoppableProduct[];
}

export const ShoppableGearSection = ({ 
  athleteName, 
  actionImage, 
  products 
}: ShoppableGearSectionProps) => {
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const handleAddToCart = (product: ShoppableProduct) => {
    addToCart(product);
    setAddedProducts(prev => new Set([...prev, product.id]));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const productsWithHotspots = products.filter(p => p.hotspot);
  const productsInGrid = products;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold mb-1">Shop {athleteName}'s gear</h2>
        <p className="text-muted-foreground">Click on the items to add them to your cart</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Action Image with Hotspots */}
        <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[3/4] lg:sticky lg:top-24 lg:self-start">
          <img
            src={actionImage}
            alt={`${athleteName} in action`}
            className="w-full h-full object-cover"
          />
          
          {/* Hotspots */}
          {productsWithHotspots.map((product) => (
            <button
              key={product.id}
              className="absolute group"
              style={{
                left: `${product.hotspot!.x}%`,
                top: `${product.hotspot!.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={() => setActiveHotspot(product.id)}
              onMouseLeave={() => setActiveHotspot(null)}
              onClick={() => {
                const element = document.getElementById(`product-${product.id}`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              {/* Hotspot Pulse */}
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-primary animate-ping absolute" />
                <div className="w-4 h-4 rounded-full bg-primary relative" />
              </div>

              {/* Tooltip */}
              {activeHotspot === product.id && (
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-48 glass-card p-3 pointer-events-none z-10 animate-fade-in">
                  <p className="font-medium text-sm mb-1">{product.name}</p>
                  <p className="text-primary font-semibold">
                    {product.currency}{product.price}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Right: Product Grid */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold">Shop this post</h3>
            <Badge variant="outline" className="text-xs">
              {products.length} items
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {productsInGrid.map((product) => (
              <article
                key={product.id}
                id={`product-${product.id}`}
                className="glass-card overflow-hidden group transition-all duration-300 hover:border-primary/30"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-4">
                  <h4 className="font-medium text-sm mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-semibold text-lg">
                      {product.currency}{product.price}
                    </span>
                    
                    <Button
                      size="sm"
                      variant={addedProducts.has(product.id) ? "secondary" : "default"}
                      onClick={() => handleAddToCart(product)}
                      className="h-8"
                    >
                      {addedProducts.has(product.id) ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
