import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Lock, Trophy, Gift, Target, Play, Heart, Dumbbell, Package, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { athletes, Product } from "@/data/athletes";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { FanSidebar } from "@/components/fan/FanSidebar";

// Mock followed athletes (in a real app, this would come from user data)
const followedAthleteIds = ["antoine-dupont", "paul-pogba", "iga-swiatek", "leon-marchand"];

// Mock upcoming events
const upcomingEvents = [
  {
    athleteId: "iga-swiatek",
    event: "Doha Open Quarterfinal",
    opponent: "vs. Aryna Sabalenka",
    date: "March 12",
    time: "15:00"
  },
  {
    athleteId: "antoine-dupont",
    event: "Top 14 Match",
    opponent: "Toulouse vs La Rochelle",
    date: "Saturday",
    time: "20:45"
  },
  {
    athleteId: "paul-pogba",
    event: "League Match",
    opponent: "vs. Inter Milan",
    date: "Sunday",
    time: "18:00"
  },
  {
    athleteId: "leon-marchand",
    event: "World Cup Heats",
    opponent: "400m Individual Medley",
    date: "Friday",
    time: "10:00"
  }
];

// Mock feed items
const feedItems = [
  { athleteId: "antoine-dupont", type: "life", title: "Inside the Six Nations Week", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop" },
  { athleteId: "paul-pogba", type: "training", title: "Ball Mastery Flow Session", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=500&fit=crop" },
  { athleteId: "iga-swiatek", type: "gear", title: "My Match Day Racket Setup", image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop" },
  { athleteId: "leon-marchand", type: "cause", title: "Swimming for All Initiative", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=500&fit=crop" },
  { athleteId: "antoine-dupont", type: "training", title: "My Explosive Speed Routine", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop" },
  { athleteId: "paul-pogba", type: "life", title: "Family, Faith, and Football", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=500&fit=crop" },
];

// Mock engagement items
const engagementItems = [
  { type: "competition", title: "Win Dupont's Signed Match Ball", athleteId: "antoine-dupont", premium: false, description: "Enter for a chance to win an authentic signed match ball" },
  { type: "draw", title: "Świątek Racquet Prize Draw", athleteId: "iga-swiatek", premium: true, description: "Premium exclusive racquet giveaway" },
  { type: "challenge", title: "30-Day Fitness Challenge", athleteId: "paul-pogba", premium: false, description: "Complete daily drills inspired by Pogba's training" },
  { type: "competition", title: "Meet & Greet VIP Experience", athleteId: "leon-marchand", premium: true, description: "Win an exclusive meet and greet session" },
];

// Mock gear items
const gearItems = [
  { name: "Adidas Elite Pack", price: 120, currency: "€", label: "Partner Product", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop", athleteId: "paul-pogba" },
  { name: "Racket Sponsor Bundle", price: 149, currency: "€", label: "Athlete Collection", image: "https://images.unsplash.com/photo-1617083934551-93a5d774296a?w=600&h=600&fit=crop", athleteId: "iga-swiatek" },
  { name: "Pro Boots Pack", price: 149, currency: "€", label: "Partner Product", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop", athleteId: "antoine-dupont" },
  { name: "Arena Pro Pack", price: 129, currency: "€", label: "Partner Product", image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&h=600&fit=crop", athleteId: "leon-marchand" },
];

// Mock training items
const trainingItems = [
  { athleteId: "paul-pogba", title: "Football Shooting Drills", duration: "45 min", level: "Intermediate" },
  { athleteId: "iga-swiatek", title: "Tennis Warmup Routine", duration: "20 min", level: "Beginner" },
  { athleteId: "antoine-dupont", title: "Rugby Speed & Agility", duration: "35 min", level: "Advanced" },
  { athleteId: "leon-marchand", title: "Medley Technique Breakdown", duration: "50 min", level: "Advanced" },
];

// Mock causes
const causesItems = [
  { athleteId: "antoine-dupont", title: "Rugby for All", raised: 9400, target: 25000, currency: "€" },
  { athleteId: "paul-pogba", title: "Support Kids in Guinea", raised: 21300, target: 50000, currency: "€" },
  { athleteId: "iga-swiatek", title: "Mental Health for Young Athletes", raised: 12500, target: 30000, currency: "€" },
];

const typeIcons = {
  life: Heart,
  training: Dumbbell,
  gear: Package,
  cause: Sparkles,
};

const typeColors = {
  life: "bg-pink-500/20 text-pink-400",
  training: "bg-blue-500/20 text-blue-400",
  gear: "bg-amber-500/20 text-amber-400",
  cause: "bg-emerald-500/20 text-emerald-400",
};

const engagementIcons = {
  competition: Trophy,
  draw: Gift,
  challenge: Target,
};

const MyAthletesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  
  const followedAthletes = athletes.filter(a => followedAthleteIds.includes(a.id));

  const handleAddToCart = (item: typeof gearItems[0]) => {
    const product: Product = {
      id: `${item.athleteId}-${item.name}`,
      name: item.name,
      price: item.price,
      currency: item.currency,
      image: item.image,
      description: item.name,
      category: item.label === "Partner Product" ? "partner" : "athlete",
      athleteId: item.athleteId
    };
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <FanSidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="relative py-16 px-6 lg:px-12 bg-gradient-to-b from-primary/10 via-background to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Welcome back.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Here's what your favorite athletes are up to.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search your athletes…"
                className="pl-12 h-14 text-lg bg-card/50 border-border/50 focus:bg-card transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="px-6 lg:px-12 pb-20 space-y-16">
          {/* Section 1: Upcoming Events */}
          <section>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-2">Upcoming events</h2>
              <p className="text-muted-foreground">Stay updated on their next matches, tournaments, and races.</p>
            </div>
            
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {upcomingEvents.map((event, index) => {
                  const athlete = athletes.find(a => a.id === event.athleteId);
                  if (!athlete) return null;
                  
                  return (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="glass-card p-5 h-full">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/30">
                            <AvatarImage src={athlete.avatar} alt={athlete.name} />
                            <AvatarFallback>{athlete.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{athlete.name}</h3>
                            <p className="text-sm text-muted-foreground">{athlete.sport}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <p className="font-medium">{event.event}</p>
                          <p className="text-sm text-muted-foreground">{event.opponent}</p>
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                        </div>
                        
                        <Link to={`/athlete/${athlete.id}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            View Halo
                          </Button>
                        </Link>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4" />
              <CarouselNext className="hidden md:flex -right-4" />
            </Carousel>
          </section>

          {/* Section 2: My Athletes */}
          <section>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold">My athletes</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {followedAthletes.map((athlete) => (
                <Link 
                  key={athlete.id} 
                  to={`/athlete/${athlete.id}`}
                  className="glass-card p-4 text-center group hover:border-primary/30 transition-all"
                >
                  <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-primary/30 group-hover:border-primary transition-colors">
                    <AvatarImage src={athlete.avatar} alt={athlete.name} />
                    <AvatarFallback>{athlete.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{athlete.name}</h3>
                  <p className="text-xs text-muted-foreground">{athlete.sport}</p>
                  <Button variant="ghost" size="sm" className="mt-3 text-xs">
                    View Halo
                  </Button>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: My Feed */}
          <section>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-2">My feed</h2>
              <p className="text-muted-foreground">Updates from your favorite athletes.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {feedItems.map((item, index) => {
                const athlete = athletes.find(a => a.id === item.athleteId);
                const Icon = typeIcons[item.type as keyof typeof typeIcons];
                const colorClass = typeColors[item.type as keyof typeof typeColors];
                
                if (!athlete) return null;
                
                return (
                  <div key={index} className="glass-card overflow-hidden group">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      <Badge className={`absolute top-3 left-3 ${colorClass}`}>
                        <Icon className="h-3 w-3 mr-1" />
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={athlete.avatar} alt={athlete.name} />
                          <AvatarFallback>{athlete.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-primary font-medium">{athlete.name}</span>
                      </div>
                      <h3 className="font-semibold mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <Link to={`/athlete/${athlete.id}`}>
                        <Button variant="ghost" size="sm" className="w-full">
                          View in Halo
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 4: Fan Engagement */}
          <section>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-2">Fan engagement</h2>
              <p className="text-muted-foreground">Exclusive interactions created just for you.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {engagementItems.map((item, index) => {
                const athlete = athletes.find(a => a.id === item.athleteId);
                const Icon = engagementIcons[item.type as keyof typeof engagementIcons];
                
                if (!athlete) return null;
                
                return (
                  <div key={index} className={`glass-card p-5 relative ${item.premium ? 'overflow-hidden' : ''}`}>
                    {item.premium && (
                      <div className="absolute inset-0 bg-card/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                        <Lock className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-3">Premium Exclusive</p>
                        <Button variant="gold" size="sm">
                          Upgrade to participate
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={athlete.avatar} alt={athlete.name} />
                            <AvatarFallback>{athlete.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{athlete.name}</span>
                        </div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                        <Button variant="outline" size="sm">
                          Participate
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 5: Gear From Your Athletes */}
          <section>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold">Gear from your athletes</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gearItems.map((item, index) => {
                const athlete = athletes.find(a => a.id === item.athleteId);
                
                return (
                  <div key={index} className="glass-card overflow-hidden group">
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-2 left-2 bg-card/80 backdrop-blur-sm text-xs">
                        {item.label}
                      </Badge>
                    </div>
                    
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground mb-1">{athlete?.name}</p>
                      <h3 className="font-semibold text-sm mb-1 line-clamp-1">{item.name}</h3>
                      <p className="text-primary font-bold mb-3">{item.currency}{item.price}</p>
                      <Button 
                        variant="gold" 
                        size="sm" 
                        className="w-full text-xs"
                        onClick={() => handleAddToCart(item)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 6: Trainings For You */}
          <section>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold">Train like them</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trainingItems.map((item, index) => {
                const athlete = athletes.find(a => a.id === item.athleteId);
                
                if (!athlete) return null;
                
                return (
                  <div key={index} className="glass-card p-4 group hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10 border border-primary/30">
                        <AvatarImage src={athlete.avatar} alt={athlete.name} />
                        <AvatarFallback>{athlete.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{athlete.name}</p>
                        <p className="text-xs text-muted-foreground">{athlete.sport}</p>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span>{item.duration}</span>
                      <span>•</span>
                      <span>{item.level}</span>
                    </div>
                    
                    <Link to={`/athlete/${athlete.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Play className="h-3 w-3 mr-2" />
                        View Training
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 7: Causes You Support */}
          <section>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold">Causes you support</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {causesItems.map((item, index) => {
                const athlete = athletes.find(a => a.id === item.athleteId);
                const progressPercent = (item.raised / item.target) * 100;
                
                if (!athlete) return null;
                
                return (
                  <div key={index} className="glass-card p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10 border border-primary/30">
                        <AvatarImage src={athlete.avatar} alt={athlete.name} />
                        <AvatarFallback>{athlete.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{athlete.name}</p>
                        <p className="text-xs text-muted-foreground">{athlete.sport}</p>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-3">{item.title}</h3>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Raised</span>
                        <span className="font-medium">
                          {item.currency}{item.raised.toLocaleString()} / {item.currency}{item.target.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                    
                    <Link to={`/athlete/${athlete.id}/cause`}>
                      <Button variant="gold" size="sm" className="w-full">
                        <Heart className="h-4 w-4 mr-2" />
                        Support this Cause
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MyAthletesPage;
