import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (items.length > 0 && !orderPlaced) {
      // Simulate order placement
      setTimeout(() => {
        setOrderPlaced(true);
        clearCart();
      }, 1000);
    }
  }, []);

  if (orderPlaced || items.length === 0) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="glass-card max-w-md mx-auto p-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <h1 className="font-display text-2xl font-semibold mb-2">
                  Order confirmed!
                </h1>
                <p className="text-muted-foreground mb-6">
                  Your products are on the way.
                </p>
                <Link to="/athletes">
                  <Button variant="gold">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="glass-card p-8">
              <h1 className="font-display text-2xl font-semibold mb-4">
                Processing your order...
              </h1>
              <div className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
