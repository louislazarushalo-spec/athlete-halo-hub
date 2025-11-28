import { Product } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="glass-card overflow-hidden group transition-all duration-300 hover:border-primary/30">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-50" />
        
        {/* Category badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full ${
          product.category === 'athlete' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground'
        }`}>
          {product.category === 'athlete' ? 'Athlete Collection' : 'Partner Product'}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {product.currency}{product.price}
          </span>
          <Button
            variant={added ? "secondary" : "gold"}
            size="sm"
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
};
