import { Link } from "react-router-dom";
import { athletes } from "@/data/athletes";
import { Button } from "@/components/ui/button";

// Hardcoded followed athletes for demo
const followedAthleteIds = ["arthur-cazaux", "tommy-fleetwood", "elisa-balsamo"];

export const GearYourAthletesTrustSection = () => {
  // Get gear from followed athletes
  const gearItems = followedAthleteIds.flatMap(athleteId => {
    const athlete = athletes.find(a => a.id === athleteId);
    if (!athlete || !athlete.products.length) return [];
    const product = athlete.products[0];
    return [{ athlete, product }];
  }).slice(0, 4);

  if (gearItems.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">Gear your athletes trust</h2>
        <p className="text-muted-foreground">Hand-picked essentials from the pros you follow.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {gearItems.map(({ athlete, product }) => (
          <Link
            key={product.id}
            to={`/athlete/${athlete.id}?tab=gear`}
            className="group block"
          >
            <article className="glass-card overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-glow-gold hover:scale-[1.02]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={athlete.avatar}
                  alt={athlete.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                
                {/* Product info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs text-muted-foreground mb-1">{athlete.name}</p>
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {product.name}
                  </h3>
                  <p className="font-display text-xl font-bold text-foreground mb-3">
                    {product.currency}{product.price}
                  </p>
                  <Button size="sm" className="w-full">
                    Buy Now
                  </Button>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};
