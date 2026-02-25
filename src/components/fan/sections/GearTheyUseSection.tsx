import { Link } from "react-router-dom";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

// Featured products from specific athletes
const featuredProducts = [
  { athleteId: "paul-pogba", productName: "Adidas Elite Pack", price: 120 },
  { athleteId: "iga-swiatek", productName: "Racket Sponsor Bundle", price: 149 },
  { athleteId: "antoine-dupont", productName: "Pro Boots Pack", price: 149 },
  { athleteId: "leon-marchand", productName: "Arena Pro Pack", price: 129 },
];

export const GearTheyUseSection = () => {
  const { athletes } = useAthleteProfiles();
  const products = featuredProducts.map((fp) => {
    const athlete = athletes.find((a) => a.id === fp.athleteId);
    const product = athlete?.products.find((p) => p.name === fp.productName);
    return { athlete, product };
  }).filter((item) => item.athlete && item.product);

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">Gear they actually use</h2>
        <p className="text-muted-foreground">Performance essentials from real athlete routines.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map(({ athlete, product }) => (
          <article
            key={product!.id}
            className="glass-card overflow-hidden transition-all duration-300 hover:border-primary/30"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={product!.image}
                alt={product!.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={athlete!.avatar}
                  alt={athlete!.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-muted-foreground">{athlete!.name}</span>
              </div>
              <h3 className="font-medium text-sm mb-1">{product!.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="font-display font-semibold text-lg">
                  {product!.currency}{product!.price}
                </span>
                <Button size="sm" variant="outline" className="h-8">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
