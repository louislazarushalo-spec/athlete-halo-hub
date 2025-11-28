export interface Athlete {
  id: string;
  name: string;
  sport: string;
  bio: string;
  avatar: string;
  banner: string;
  tagline: string;
  followers: number;
  training: Post[];
  life: Post[];
  gear: Post[];
  products: Product[];
  cause: Cause;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'training' | 'life' | 'gear';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  category: 'partner' | 'athlete';
  athleteId: string;
}

export interface Cause {
  id: string;
  title: string;
  story: string;
  target: number;
  raised: number;
  currency: string;
  image: string;
}

export const athletes: Athlete[] = [
  {
    id: "antoine-dupont",
    name: "Antoine Dupont",
    sport: "Rugby",
    bio: "Scrum-half. Captain. Game-changer. Step inside my world.",
    tagline: "The world's best scrum-half",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&h=600&fit=crop",
    followers: 245000,
    training: [
      {
        id: "ad-t1",
        title: "My Explosive Speed Routine",
        description: "The sprint drills and plyometrics that keep me one step ahead on the pitch.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-01-15"
      },
      {
        id: "ad-t2",
        title: "Pre-match Warmup Plan for Scrum-Halves",
        description: "My complete warmup routine before every international match.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-01-10"
      }
    ],
    life: [
      {
        id: "ad-l1",
        title: "Inside the Six Nations Week",
        description: "A behind-the-scenes look at how we prepare for the biggest tournament in rugby.",
        image: "https://images.unsplash.com/photo-1461896836934- voices?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-01"
      },
      {
        id: "ad-l2",
        title: "How I Manage Pressure and Focus",
        description: "Mental preparation techniques that help me perform under pressure.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-01-25"
      }
    ],
    gear: [
      {
        id: "ad-g1",
        title: "My Match Day Essentials",
        description: "Headgear, boots, grip spray — everything I need on game day.",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-01-20"
      }
    ],
    products: [
      {
        id: "ad-p1",
        name: "Elite Rugby Agility Program",
        price: 59,
        currency: "€",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop",
        description: "8-week program to develop explosive speed and agility.",
        category: "athlete",
        athleteId: "antoine-dupont"
      },
      {
        id: "ad-p2",
        name: "Signed Match Ball",
        price: 79,
        currency: "€",
        image: "https://images.unsplash.com/photo-1544919982-e7f5dd40c7ba?w=600&h=600&fit=crop",
        description: "Official match ball with authentic signature.",
        category: "athlete",
        athleteId: "antoine-dupont"
      },
      {
        id: "ad-p3",
        name: "Pro Boots Pack",
        price: 149,
        currency: "€",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
        description: "Premium rugby boots from our partner brand.",
        category: "partner",
        athleteId: "antoine-dupont"
      }
    ],
    cause: {
      id: "ad-c1",
      title: "Support Rugby for All",
      story: "Making rugby accessible to underprivileged communities across France. Every child deserves the chance to play.",
      target: 25000,
      raised: 9400,
      currency: "€",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop"
    }
  },
  {
    id: "paul-pogba",
    name: "Paul Pogba",
    sport: "Football",
    bio: "Midfielder. Creator. Champion. Welcome to my Halo.",
    tagline: "World Cup winner & creative genius",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&h=600&fit=crop",
    followers: 892000,
    training: [
      {
        id: "pp-t1",
        title: "Ball Mastery Flow Session",
        description: "My daily ball control drills to maintain technical excellence.",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-05"
      },
      {
        id: "pp-t2",
        title: "Strength & Core Stability Routine",
        description: "The gym work that keeps me powerful and balanced on the pitch.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-01-28"
      }
    ],
    life: [
      {
        id: "pp-l1",
        title: "My Matchday Rituals",
        description: "From morning meditation to pre-game music — my complete routine.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-10"
      },
      {
        id: "pp-l2",
        title: "Family, Faith, and Football",
        description: "The three pillars that define who I am beyond the pitch.",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-03"
      }
    ],
    gear: [
      {
        id: "pp-g1",
        title: "Signature Style Collection",
        description: "My boots, shin guards, jewelry, and sponsor apparel.",
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-01-30"
      }
    ],
    products: [
      {
        id: "pp-p1",
        name: "Skills & Creativity Masterclass",
        price: 89,
        currency: "€",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=600&fit=crop",
        description: "Video course on creative playmaking and vision.",
        category: "athlete",
        athleteId: "paul-pogba"
      },
      {
        id: "pp-p2",
        name: "Pogba Limited Streetwear Hoodie",
        price: 85,
        currency: "€",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
        description: "Limited edition hoodie from my personal collection.",
        category: "athlete",
        athleteId: "paul-pogba"
      },
      {
        id: "pp-p3",
        name: "Adidas Elite Pack",
        price: 120,
        currency: "€",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
        description: "Complete training kit from our partner Adidas.",
        category: "partner",
        athleteId: "paul-pogba"
      }
    ],
    cause: {
      id: "pp-c1",
      title: "Support Kids in Guinea",
      story: "Building schools and sports facilities in Guinea to give every child a chance at education and football.",
      target: 50000,
      raised: 21300,
      currency: "€",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop"
    }
  },
  {
    id: "iga-swiatek",
    name: "Iga Świątek",
    sport: "Tennis",
    bio: "World No. 1 mindset. Welcome to my training, life, and gear.",
    tagline: "Dominating the court with power & precision",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&h=600&fit=crop",
    followers: 567000,
    training: [
      {
        id: "is-t1",
        title: "Serve Consistency Drills",
        description: "The practice routine that made my serve a weapon.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-08"
      },
      {
        id: "is-t2",
        title: "Footwork Ladder Patterns I Use Daily",
        description: "Quick feet are the foundation of my game.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-01"
      }
    ],
    life: [
      {
        id: "is-l1",
        title: "Tournament Week Behind the Scenes",
        description: "What a typical week looks like during a Grand Slam.",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-12"
      },
      {
        id: "is-l2",
        title: "How I Stay Mentally Balanced on Tour",
        description: "Mental health practices that keep me grounded.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-05"
      }
    ],
    gear: [
      {
        id: "is-g1",
        title: "My Court Essentials",
        description: "Racket, overgrips, shoes, sports bag, and apparel.",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-02-03"
      }
    ],
    products: [
      {
        id: "is-p1",
        name: "Champion's Footwork Plan",
        price: 65,
        currency: "€",
        image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=600&h=600&fit=crop",
        description: "6-week footwork improvement program.",
        category: "athlete",
        athleteId: "iga-swiatek"
      },
      {
        id: "is-p2",
        name: "Signed Match Racket",
        price: 199,
        currency: "€",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=600&h=600&fit=crop",
        description: "Match-used racket with authentic signature.",
        category: "athlete",
        athleteId: "iga-swiatek"
      },
      {
        id: "is-p3",
        name: "Racket Sponsor Bundle",
        price: 149,
        currency: "€",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
        description: "Complete racket setup from our partner.",
        category: "partner",
        athleteId: "iga-swiatek"
      }
    ],
    cause: {
      id: "is-c1",
      title: "Mental Health for Young Athletes",
      story: "Providing mental health resources and support for young athletes navigating competitive sports.",
      target: 40000,
      raised: 17800,
      currency: "€",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=400&fit=crop"
    }
  },
  {
    id: "leon-marchand",
    name: "Léon Marchand",
    sport: "Swimming",
    bio: "World record holder. Precision, passion, performance.",
    tagline: "Breaking records, making history",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600&h=600&fit=crop",
    followers: 324000,
    training: [
      {
        id: "lm-t1",
        title: "My 400m Medley Breakdown",
        description: "How I approach each stroke in my signature event.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-15"
      },
      {
        id: "lm-t2",
        title: "Underwater Dolphin Kick Progression",
        description: "The technique that gives me an edge off every wall.",
        image: "https://images.unsplash.com/photo-1560090995-01632a28895b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-08"
      }
    ],
    life: [
      {
        id: "lm-l1",
        title: "Life at ASU with Bob Bowman",
        description: "Training with the greatest swimming coach in history.",
        image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-18"
      },
      {
        id: "lm-l2",
        title: "Race Day Fueling Guide",
        description: "Nutrition strategies for peak performance.",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-10"
      }
    ],
    gear: [
      {
        id: "lm-g1",
        title: "My Pool Bag Essentials",
        description: "Swimsuit, goggles, snorkel, paddles, and recovery gear.",
        image: "https://images.unsplash.com/photo-1560090995-01632a28895b?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-02-06"
      }
    ],
    products: [
      {
        id: "lm-p1",
        name: "Medley Mastery Program",
        price: 59,
        currency: "€",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=600&fit=crop",
        description: "Complete guide to mastering all four strokes.",
        category: "athlete",
        athleteId: "leon-marchand"
      },
      {
        id: "lm-p2",
        name: "Signed Swim Cap",
        price: 35,
        currency: "€",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
        description: "Official competition cap with signature.",
        category: "athlete",
        athleteId: "leon-marchand"
      },
      {
        id: "lm-p3",
        name: "Arena Pro Pack",
        price: 129,
        currency: "€",
        image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=600&h=600&fit=crop",
        description: "Professional swimming gear from Arena.",
        category: "partner",
        athleteId: "leon-marchand"
      }
    ],
    cause: {
      id: "lm-c1",
      title: "Protect Our Water Ecosystems",
      story: "Supporting ocean conservation and clean water initiatives worldwide.",
      target: 20000,
      raised: 7600,
      currency: "€",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop"
    }
  }
];

export const getAthleteById = (id: string): Athlete | undefined => {
  return athletes.find(athlete => athlete.id === id);
};

export const getAllProducts = (): Product[] => {
  return athletes.flatMap(athlete => athlete.products);
};

export const getProductById = (id: string): Product | undefined => {
  return getAllProducts().find(product => product.id === id);
};
