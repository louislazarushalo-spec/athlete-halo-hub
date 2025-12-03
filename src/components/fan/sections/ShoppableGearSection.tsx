import { useState } from "react";
import { ShoppingCart, Check, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    x: number;
    y: number;
  };
}

interface ShoppableGearSectionProps {
  athleteName: string;
  actionImage: string;
  products: ShoppableProduct[];
  title?: string;
  description?: string;
}

export const ShoppableGearSection = ({ 
  athleteName, 
  actionImage, 
  products,
  title,
  description
}: ShoppableGearSectionProps) => {
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  const handleAddToCart = (product: ShoppableProduct) => {
    addToCart(product);
    setAddedProducts(prev => new Set([...prev, product.id]));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const productsWithHotspots = products.filter(p => p.hotspot);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold mb-1">
          {title || `Shop ${athleteName}'s gear`}
        </h2>
        {description && (
          <p className="text-muted-foreground text-base">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Action Image with Hotspots - Patreon Style */}
        <div className="relative rounded-2xl overflow-hidden bg-muted flex-1 lg:max-w-[55%]">
          <img
            src={actionImage}
            alt={`${athleteName} in action`}
            className="w-full h-auto object-cover"
          />
          
          {/* Hotspots with Popovers */}
          {productsWithHotspots.map((product) => (
            <Popover key={product.id}>
              <PopoverTrigger asChild>
                <button
                  className="absolute group"
                  style={{
                    left: `${product.hotspot!.x}%`,
                    top: `${product.hotspot!.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Hotspot Pulse */}
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full bg-primary/80 animate-ping absolute" />
                    <div className="w-5 h-5 rounded-full bg-primary relative flex items-center justify-center shadow-lg border-2 border-background">
                      <span className="text-[10px] font-bold text-primary-foreground">+</span>
                    </div>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent 
                side="right" 
                align="center" 
                className="w-72 p-0 overflow-hidden"
                sideOffset={12}
              >
                {/* Product Image */}
                <div className="relative h-40 bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">{product.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display font-bold text-lg">
                      {product.currency}{product.price}
                    </span>
                    
                    <Button
                      size="sm"
                      variant={addedProducts.has(product.id) ? "secondary" : "default"}
                      onClick={() => handleAddToCart(product)}
                      className="flex-1"
                    >
                      {addedProducts.has(product.id) ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ))}

          {/* Floating hint badge */}
          <div className="absolute bottom-4 left-4 right-4">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
              Click the + buttons to shop items
            </Badge>
          </div>
        </div>

        {/* Right: Product Grid - Same Level */}
        <div className="flex-1 lg:max-w-[45%]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">All items</h3>
            <Badge variant="outline" className="text-xs">
              {products.length} items
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <article
                key={product.id}
                id={`product-${product.id}`}
                className="glass-card overflow-hidden group transition-all duration-300 hover:border-primary/30"
              >
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className="h-3 w-3" />
                  </button>
                </div>

                <div className="p-3">
                  <h4 className="font-medium text-xs mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-semibold text-sm">
                      {product.currency}{product.price}
                    </span>
                    
                    <Button
                      size="sm"
                      variant={addedProducts.has(product.id) ? "secondary" : "default"}
                      onClick={() => handleAddToCart(product)}
                      className="h-7 text-xs px-2"
                    >
                      {addedProducts.has(product.id) ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <ShoppingCart className="h-3 w-3" />
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
