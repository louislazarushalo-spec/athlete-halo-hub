import antoineDupontImg from "@/assets/antoine-dupont.png";
import paulPogbaImg from "@/assets/paul-pogba.png";
import igaSwiatekImg from "@/assets/iga-swiatek.png";
import leonMarchandImg from "@/assets/leon-marchand.png";
import victorWembanyamaImg from "@/assets/victor-wembanyama.png";
import teddyRinerImg from "@/assets/teddy-riner.png";
import pierreGaslyImg from "@/assets/pierre-gasly.png";
import julianAlaphilippeImg from "@/assets/julian-alaphilippe.png";
import arthurRinderknechImg from "@/assets/arthur-rinderknech.png";
import gaelMonfilsImg from "@/assets/gael-monfils.png";
import arthurFilsImg from "@/assets/arthur-fils.png";
import arthurCazauxImg from "@/assets/arthur-cazaux.png";
import corentinMoutetImg from "@/assets/corentin-moutet.png";
import ugoHumbertImg from "@/assets/ugo-humbert.png";

export interface MediaFeedItem {
  id: string;
  type: 'social' | 'article' | 'video';
  platform: 'instagram' | 'twitter' | 'youtube' | 'lequipe' | 'espn' | 'bbc';
  title?: string;
  content: string;
  image: string;
  timestamp: string;
  stats?: {
    likes?: number;
    comments?: number;
    shares?: number;
    views?: number;
    readTime?: string;
    duration?: string;
  };
}

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
  mediaFeed: MediaFeedItem[];
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
    avatar: antoineDupontImg,
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
    },
    mediaFeed: [
      {
        id: "ad-mf1",
        type: "social",
        platform: "instagram",
        content: "Back to the grind. Six Nations prep starts now! Nothing beats the feeling of being back with the team. 💪🇫🇷",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=800&fit=crop",
        timestamp: "2 hours ago",
        stats: { likes: 24500, comments: 892 }
      },
      {
        id: "ad-mf2",
        type: "video",
        platform: "youtube",
        title: "Antoine Dupont - Best Moments & Highlights 2024",
        content: "Watch the best tries, assists, and game-changing plays from the world's best scrum-half.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=450&fit=crop",
        timestamp: "3 days ago",
        stats: { views: 1200000, duration: "12:34" }
      },
      {
        id: "ad-mf3",
        type: "article",
        platform: "lequipe",
        title: "Antoine Dupont: \"I'm in the best shape of my career\"",
        content: "In an exclusive interview, Antoine Dupont discusses preparation methods, mental strength, and ambitious goals for the upcoming Six Nations...",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
        timestamp: "5 hours ago",
        stats: { readTime: "5 min read" }
      },
      {
        id: "ad-mf4",
        type: "social",
        platform: "twitter",
        content: "What an incredible match! Thank you to all the fans who came out to support us. This is just the beginning. 🔥🏆",
        image: "",
        timestamp: "1 day ago",
        stats: { likes: 32000, comments: 1200, shares: 4500 }
      },
      {
        id: "ad-mf5",
        type: "video",
        platform: "espn",
        title: "Inside Antoine Dupont's Training Routine | ESPN Exclusive",
        content: "Get an exclusive look at how the world's best rugby player prepares for international competition.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop",
        timestamp: "1 week ago",
        stats: { views: 856000, duration: "8:21" }
      },
      {
        id: "ad-mf6",
        type: "article",
        platform: "bbc",
        title: "How Antoine Dupont became a global icon in rugby",
        content: "From Toulouse to the world stage: the remarkable journey of France's rugby superstar and how he's transforming the sport...",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=400&fit=crop",
        timestamp: "2 days ago",
        stats: { readTime: "8 min read" }
      }
    ]
  },
  {
    id: "paul-pogba",
    name: "Paul Pogba",
    sport: "Football",
    bio: "Midfielder. Creator. Champion. Welcome to my Halo.",
    tagline: "World Cup winner & creative genius",
    avatar: paulPogbaImg,
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
    },
    mediaFeed: [
      {
        id: "pp-mf1",
        type: "social",
        platform: "instagram",
        content: "Family first, always. Blessed to have this support system. Every goal, every assist, it's for them. 🙏❤️",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=800&fit=crop",
        timestamp: "4 hours ago",
        stats: { likes: 156000, comments: 3200 }
      },
      {
        id: "pp-mf2",
        type: "video",
        platform: "youtube",
        title: "Paul Pogba - Skills, Goals & Assists 2024",
        content: "The most creative moments from one of football's most entertaining players.",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=450&fit=crop",
        timestamp: "5 days ago",
        stats: { views: 3400000, duration: "15:42" }
      },
      {
        id: "pp-mf3",
        type: "article",
        platform: "lequipe",
        title: "Paul Pogba: \"I still have so much to give to football\"",
        content: "The French midfielder opens up about his journey, challenges, and his determination to return to the top level...",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=400&fit=crop",
        timestamp: "1 day ago",
        stats: { readTime: "7 min read" }
      },
      {
        id: "pp-mf4",
        type: "social",
        platform: "twitter",
        content: "The comeback is always stronger than the setback. Stay patient, stay focused, stay hungry. 💪⚽",
        image: "",
        timestamp: "8 hours ago",
        stats: { likes: 89000, comments: 2100, shares: 12000 }
      },
      {
        id: "pp-mf5",
        type: "video",
        platform: "espn",
        title: "Pogba's Road to Recovery | ESPN Documentary",
        content: "An intimate look at Paul Pogba's journey back to professional football.",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=450&fit=crop",
        timestamp: "2 weeks ago",
        stats: { views: 1800000, duration: "22:15" }
      },
      {
        id: "pp-mf6",
        type: "article",
        platform: "bbc",
        title: "The many sides of Paul Pogba: footballer, fashion icon, philanthropist",
        content: "Beyond the pitch, Paul Pogba has built an empire spanning fashion, music, and charitable work...",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=400&fit=crop",
        timestamp: "4 days ago",
        stats: { readTime: "6 min read" }
      }
    ]
  },
  {
    id: "iga-swiatek",
    name: "Iga Świątek",
    sport: "Tennis",
    bio: "World No. 1 mindset. Welcome to my training, life, and gear.",
    tagline: "Dominating the court with power & precision",
    avatar: igaSwiatekImg,
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
    },
    mediaFeed: [
      {
        id: "is-mf1",
        type: "social",
        platform: "instagram",
        content: "Another tournament, another chapter. Grateful for every moment on this court. The journey continues! 🎾💜",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=800&fit=crop",
        timestamp: "3 hours ago",
        stats: { likes: 89000, comments: 1800 }
      },
      {
        id: "is-mf2",
        type: "video",
        platform: "youtube",
        title: "Iga Świątek - Best Points & Championship Moments 2024",
        content: "Relive the most spectacular shots from the world number one.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=450&fit=crop",
        timestamp: "1 week ago",
        stats: { views: 2100000, duration: "18:27" }
      },
      {
        id: "is-mf3",
        type: "article",
        platform: "espn",
        title: "Iga Świątek on mental health: \"It's okay to not be okay\"",
        content: "The tennis star opens up about the pressures of being number one and her advocacy for mental health awareness...",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=400&fit=crop",
        timestamp: "2 days ago",
        stats: { readTime: "6 min read" }
      },
      {
        id: "is-mf4",
        type: "social",
        platform: "twitter",
        content: "Music is my escape. Currently obsessed with the new Taylor Swift album. What are you all listening to? 🎵",
        image: "",
        timestamp: "6 hours ago",
        stats: { likes: 45000, comments: 8900, shares: 2300 }
      },
      {
        id: "is-mf5",
        type: "video",
        platform: "youtube",
        title: "A Day in the Life of Iga Świątek | Behind the Scenes",
        content: "From morning routines to intense training sessions, see how a world champion prepares.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop",
        timestamp: "3 weeks ago",
        stats: { views: 980000, duration: "14:52" }
      },
      {
        id: "is-mf6",
        type: "article",
        platform: "bbc",
        title: "How Iga Świątek is redefining women's tennis",
        content: "With her powerful game and humble attitude, the Polish star is changing what it means to dominate the WTA tour...",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=800&h=400&fit=crop",
        timestamp: "5 days ago",
        stats: { readTime: "7 min read" }
      }
    ]
  },
  {
    id: "leon-marchand",
    name: "Léon Marchand",
    sport: "Swimming",
    bio: "World record holder. Precision, passion, performance.",
    tagline: "Breaking records, making history",
    avatar: leonMarchandImg,
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
    },
    mediaFeed: [
      {
        id: "lm-mf1",
        type: "social",
        platform: "instagram",
        content: "World record pace in training today. Coach Bob keeps pushing me to new limits. The best is yet to come! 🏊‍♂️🇫🇷",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=800&fit=crop",
        timestamp: "5 hours ago",
        stats: { likes: 67000, comments: 1400 }
      },
      {
        id: "lm-mf2",
        type: "video",
        platform: "youtube",
        title: "Léon Marchand - World Record Breaking Swims 2024",
        content: "Watch every world record-breaking moment from swimming's newest superstar.",
        image: "https://images.unsplash.com/photo-1560090995-01632a28895b?w=800&h=450&fit=crop",
        timestamp: "2 weeks ago",
        stats: { views: 4500000, duration: "11:18" }
      },
      {
        id: "lm-mf3",
        type: "article",
        platform: "lequipe",
        title: "Léon Marchand: The making of a swimming legend",
        content: "From Toulouse to Arizona, how the young French swimmer became the most talked-about athlete in his sport...",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=400&fit=crop",
        timestamp: "3 days ago",
        stats: { readTime: "8 min read" }
      },
      {
        id: "lm-mf4",
        type: "social",
        platform: "twitter",
        content: "Thank you Arizona for becoming my second home. The Sun Devil spirit is real! 🔱 #ForksUp",
        image: "",
        timestamp: "1 day ago",
        stats: { likes: 34000, comments: 890, shares: 5600 }
      },
      {
        id: "lm-mf5",
        type: "video",
        platform: "espn",
        title: "Training with Bob Bowman: Léon Marchand's Secret Weapon",
        content: "How the coach of Michael Phelps is shaping the next generation of swimming greatness.",
        image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=450&fit=crop",
        timestamp: "1 month ago",
        stats: { views: 1200000, duration: "16:45" }
      },
      {
        id: "lm-mf6",
        type: "article",
        platform: "bbc",
        title: "Can Léon Marchand break Michael Phelps' Olympic records?",
        content: "The swimming world is buzzing about the French phenomenon who might just rewrite the history books...",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
        timestamp: "1 week ago",
        stats: { readTime: "5 min read" }
      }
    ]
  },
  {
    id: "victor-wembanyama",
    name: "Victor Wembanyama",
    sport: "Basketball",
    bio: "7'4\" phenomenon changing the game. Welcome to my universe.",
    tagline: "Redefining basketball at 7'4\"",
    avatar: victorWembanyamaImg,
    banner: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&h=600&fit=crop",
    followers: 678000,
    training: [
      {
        id: "vw-t1",
        title: "My Height & Mobility Training",
        description: "How I maintain agility and speed at 7'4\".",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-20"
      },
      {
        id: "vw-t2",
        title: "Shooting Form & Range Work",
        description: "Developing my outside shot and three-point range.",
        image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-12"
      }
    ],
    life: [
      {
        id: "vw-l1",
        title: "Life in San Antonio",
        description: "Adapting to the NBA and American culture.",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-18"
      },
      {
        id: "vw-l2",
        title: "Representing France on the World Stage",
        description: "Pride, pressure, and playing for my country.",
        image: "https://images.unsplash.com/photo-1506798946479-e7d0c1d5d6f3?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-08"
      }
    ],
    gear: [
      {
        id: "vw-g1",
        title: "My Game Day Essentials",
        description: "Custom shoes, sleeves, and court gear designed for my frame.",
        image: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-02-15"
      }
    ],
    products: [
      {
        id: "vw-p1",
        name: "Length & Mobility Program",
        price: 75,
        currency: "€",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=600&fit=crop",
        description: "Training program for tall athletes to maximize mobility.",
        category: "athlete",
        athleteId: "victor-wembanyama"
      },
      {
        id: "vw-p2",
        name: "Signed Spurs Jersey",
        price: 249,
        currency: "€",
        image: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=600&h=600&fit=crop",
        description: "Official San Antonio Spurs jersey with signature.",
        category: "athlete",
        athleteId: "victor-wembanyama"
      },
      {
        id: "vw-p3",
        name: "Nike Signature Collection",
        price: 179,
        currency: "€",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
        description: "Exclusive basketball gear from Nike.",
        category: "partner",
        athleteId: "victor-wembanyama"
      }
    ],
    cause: {
      id: "vw-c1",
      title: "Basketball Without Borders",
      story: "Bringing basketball opportunities and education to underserved youth worldwide.",
      target: 60000,
      raised: 28500,
      currency: "€",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop"
    },
    mediaFeed: [
      {
        id: "vw-mf1",
        type: "social",
        platform: "instagram",
        content: "7'4\" and still learning every day. San Antonio has become home. Let's keep building! 🏀🖤",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=800&fit=crop",
        timestamp: "2 hours ago",
        stats: { likes: 234000, comments: 5600 }
      },
      {
        id: "vw-mf2",
        type: "video",
        platform: "youtube",
        title: "Victor Wembanyama - NBA Rookie Highlights 2024",
        content: "Every block, every three-pointer, every moment of brilliance from the generational talent.",
        image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800&h=450&fit=crop",
        timestamp: "4 days ago",
        stats: { views: 8900000, duration: "20:33" }
      },
      {
        id: "vw-mf3",
        type: "article",
        platform: "espn",
        title: "Victor Wembanyama: \"I want to change the game\"",
        content: "The French phenom discusses his unique skillset, NBA adaptation, and his vision for the future of basketball...",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&h=400&fit=crop",
        timestamp: "1 day ago",
        stats: { readTime: "9 min read" }
      },
      {
        id: "vw-mf4",
        type: "social",
        platform: "twitter",
        content: "First triple-double of the season! Couldn't have done it without my teammates. We're just getting started 🔥",
        image: "",
        timestamp: "12 hours ago",
        stats: { likes: 156000, comments: 4200, shares: 28000 }
      },
      {
        id: "vw-mf5",
        type: "video",
        platform: "youtube",
        title: "Wemby's Journey: From France to NBA Stardom",
        content: "The complete documentary on Victor Wembanyama's rise to basketball greatness.",
        image: "https://images.unsplash.com/photo-1506798946479-e7d0c1d5d6f3?w=800&h=450&fit=crop",
        timestamp: "2 months ago",
        stats: { views: 12000000, duration: "45:12" }
      },
      {
        id: "vw-mf6",
        type: "article",
        platform: "bbc",
        title: "Is Victor Wembanyama the future of basketball?",
        content: "At 7'4\" with guard skills, the French teenager is redefining what's possible on the basketball court...",
        image: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=800&h=400&fit=crop",
        timestamp: "6 days ago",
        stats: { readTime: "6 min read" }
      }
    ]
  },
  {
    id: "teddy-riner",
    name: "Teddy Riner",
    sport: "Judo",
    bio: "10-time World Champion. Olympic Gold. Discipline defines greatness.",
    tagline: "The most decorated judoka in history",
    avatar: teddyRinerImg,
    banner: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1600&h=600&fit=crop",
    followers: 445000,
    training: [
      {
        id: "tr-t1",
        title: "My Strength & Power Routine",
        description: "The training that made me a heavyweight champion.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-22"
      },
      {
        id: "tr-t2",
        title: "Technical Judo Mastery",
        description: "Perfecting throws, grips, and tactical awareness.",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-14"
      }
    ],
    life: [
      {
        id: "tr-l1",
        title: "Road to Paris 2024",
        description: "Preparing for the Olympics on home soil.",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-25"
      },
      {
        id: "tr-l2",
        title: "A Champion's Mindset",
        description: "Mental discipline and the warrior spirit of judo.",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-16"
      }
    ],
    gear: [
      {
        id: "tr-g1",
        title: "My Dojo Essentials",
        description: "Judogi, belt, training equipment, and recovery tools.",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-02-18"
      }
    ],
    products: [
      {
        id: "tr-p1",
        name: "Champion's Judo Program",
        price: 69,
        currency: "€",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=600&fit=crop",
        description: "Complete judo training system for all levels.",
        category: "athlete",
        athleteId: "teddy-riner"
      },
      {
        id: "tr-p2",
        name: "Signed Competition Judogi",
        price: 299,
        currency: "€",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=600&fit=crop",
        description: "Official competition gi with authentic signature.",
        category: "athlete",
        athleteId: "teddy-riner"
      },
      {
        id: "tr-p3",
        name: "Mizuno Judo Elite Pack",
        price: 159,
        currency: "€",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
        description: "Professional judo equipment from Mizuno.",
        category: "partner",
        athleteId: "teddy-riner"
      }
    ],
    cause: {
      id: "tr-c1",
      title: "Judo for Peace & Respect",
      story: "Using judo to teach discipline, respect, and self-confidence to at-risk youth across France.",
      target: 35000,
      raised: 16200,
      currency: "€",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=400&fit=crop"
    },
    mediaFeed: [
      {
        id: "tr-mf1",
        type: "social",
        platform: "instagram",
        content: "10 world titles and counting. The hunger never stops. Ready for whatever comes next. 🥋🥇",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=800&fit=crop",
        timestamp: "6 hours ago",
        stats: { likes: 78000, comments: 2100 }
      },
      {
        id: "tr-mf2",
        type: "video",
        platform: "youtube",
        title: "Teddy Riner - Greatest Throws & Ippon Collection",
        content: "Witness the devastating power of the most decorated judoka in history.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop",
        timestamp: "1 week ago",
        stats: { views: 2300000, duration: "14:56" }
      },
      {
        id: "tr-mf3",
        type: "article",
        platform: "lequipe",
        title: "Teddy Riner: \"My legacy is about more than medals\"",
        content: "The judo legend discusses his upcoming projects, mentoring the next generation, and life after competition...",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=400&fit=crop",
        timestamp: "2 days ago",
        stats: { readTime: "7 min read" }
      },
      {
        id: "tr-mf4",
        type: "social",
        platform: "twitter",
        content: "Respect the art. Respect your opponent. Respect yourself. That's what judo taught me. 🙏",
        image: "",
        timestamp: "1 day ago",
        stats: { likes: 45000, comments: 890, shares: 6700 }
      },
      {
        id: "tr-mf5",
        type: "video",
        platform: "espn",
        title: "The Legend of Teddy Riner | ESPN 30 for 30",
        content: "An in-depth look at the career of judo's most dominant heavyweight.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop",
        timestamp: "3 months ago",
        stats: { views: 890000, duration: "28:42" }
      },
      {
        id: "tr-mf6",
        type: "article",
        platform: "bbc",
        title: "Teddy Riner: The gentle giant transforming judo",
        content: "How France's most beloved athlete is using his platform to grow the sport worldwide...",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=400&fit=crop",
        timestamp: "4 days ago",
        stats: { readTime: "5 min read" }
      }
    ]
  },
  {
    id: "pierre-gasly",
    name: "Pierre Gasly",
    sport: "F1",
    bio: "Formula 1 driver. Speed, precision, passion. Welcome to my cockpit.",
    tagline: "French F1 star pushing the limits",
    avatar: pierreGaslyImg,
    banner: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&h=600&fit=crop",
    followers: 512000,
    training: [
      {
        id: "pg-t1",
        title: "G-Force & Neck Training",
        description: "How I build strength to handle extreme racing forces.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-28"
      },
      {
        id: "pg-t2",
        title: "Reaction Time & Focus Drills",
        description: "Milliseconds matter — here's how I stay sharp.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-20"
      }
    ],
    life: [
      {
        id: "pg-l1",
        title: "Life on the F1 Circuit",
        description: "Behind the scenes of a race weekend.",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-03-01"
      },
      {
        id: "pg-l2",
        title: "Fashion & Style Off-Track",
        description: "My passion for fashion and personal style.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-22"
      }
    ],
    gear: [
      {
        id: "pg-g1",
        title: "My Racing Essentials",
        description: "Helmet, race suit, gloves, and tech gear for every Grand Prix.",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-02-25"
      }
    ],
    products: [
      {
        id: "pg-p1",
        name: "Driver Fitness Program",
        price: 79,
        currency: "€",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop",
        description: "Complete F1-style fitness and reaction training.",
        category: "athlete",
        athleteId: "pierre-gasly"
      },
      {
        id: "pg-p2",
        name: "Signed Alpine Cap",
        price: 65,
        currency: "€",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop",
        description: "Official team cap with authentic signature.",
        category: "athlete",
        athleteId: "pierre-gasly"
      },
      {
        id: "pg-p3",
        name: "Alpine Team Collection",
        price: 149,
        currency: "€",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=600&fit=crop",
        description: "Official Alpine F1 team merchandise.",
        category: "partner",
        athleteId: "pierre-gasly"
      }
    ],
    cause: {
      id: "pg-c1",
      title: "Racing for Education",
      story: "Supporting STEM education and motorsport opportunities for underprivileged youth in France.",
      target: 45000,
      raised: 19800,
      currency: "€",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=400&fit=crop"
    },
    mediaFeed: [
      {
        id: "pg-mf1",
        type: "social",
        platform: "instagram",
        content: "P5 today! Great points for the team. Every race we're getting stronger. Next one, we push even harder! 🏎️💙",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=800&fit=crop",
        timestamp: "1 hour ago",
        stats: { likes: 134000, comments: 3400 }
      },
      {
        id: "pg-mf2",
        type: "video",
        platform: "youtube",
        title: "Pierre Gasly - Best Overtakes & Racing Moments 2024",
        content: "The most thrilling wheel-to-wheel action from France's F1 star.",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=450&fit=crop",
        timestamp: "5 days ago",
        stats: { views: 1800000, duration: "12:08" }
      },
      {
        id: "pg-mf3",
        type: "article",
        platform: "lequipe",
        title: "Pierre Gasly: \"Alpine can fight for podiums\"",
        content: "The French driver shares his optimism about the team's development and his championship ambitions...",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=400&fit=crop",
        timestamp: "3 days ago",
        stats: { readTime: "6 min read" }
      },
      {
        id: "pg-mf4",
        type: "social",
        platform: "twitter",
        content: "Nothing beats the feeling of racing in front of the French fans. Merci for your incredible support! 🇫🇷❤️",
        image: "",
        timestamp: "2 days ago",
        stats: { likes: 67000, comments: 1500, shares: 8900 }
      },
      {
        id: "pg-mf5",
        type: "video",
        platform: "espn",
        title: "Pierre Gasly: From Monza Glory to Alpine Dreams",
        content: "The journey of France's most exciting F1 talent.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop",
        timestamp: "2 weeks ago",
        stats: { views: 650000, duration: "18:33" }
      },
      {
        id: "pg-mf6",
        type: "article",
        platform: "bbc",
        title: "Pierre Gasly on life, speed, and French F1 renaissance",
        content: "With Alpine's rise, Gasly is leading a new golden era for French motorsport...",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=400&fit=crop",
        timestamp: "1 week ago",
        stats: { readTime: "8 min read" }
      }
    ]
  },
  {
    id: "julian-alaphilippe",
    name: "Julian Alaphilippe",
    sport: "Cycling",
    bio: "World Champion. Attacker. Heart of a lion. Climb into my world.",
    tagline: "Two-time World Champion cyclist",
    avatar: julianAlaphilippeImg,
    banner: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1600&h=600&fit=crop",
    followers: 389000,
    training: [
      {
        id: "ja-t1",
        title: "Climbing Power Training",
        description: "Building explosive power for mountain stages.",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-03-02"
      },
      {
        id: "ja-t2",
        title: "Recovery & Endurance Base",
        description: "How I build the foundation for Grand Tour success.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-24"
      }
    ],
    life: [
      {
        id: "ja-l1",
        title: "Life in the Peloton",
        description: "Stories from the Tour de France and beyond.",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-03-05"
      },
      {
        id: "ja-l2",
        title: "Family & the Rainbow Jersey",
        description: "What being World Champion means to me and my family.",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-02-26"
      }
    ],
    gear: [
      {
        id: "ja-g1",
        title: "My Race Day Setup",
        description: "Bike, helmet, shoes, and nutrition essentials.",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-02-28"
      }
    ],
    products: [
      {
        id: "ja-p1",
        name: "Climbing Masterclass",
        price: 59,
        currency: "€",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&h=600&fit=crop",
        description: "Training program for cyclists who want to climb faster.",
        category: "athlete",
        athleteId: "julian-alaphilippe"
      },
      {
        id: "ja-p2",
        name: "Signed World Champion Jersey",
        price: 199,
        currency: "€",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&h=600&fit=crop",
        description: "Official rainbow jersey with authentic signature.",
        category: "athlete",
        athleteId: "julian-alaphilippe"
      },
      {
        id: "ja-p3",
        name: "Specialized Pro Bundle",
        price: 179,
        currency: "€",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=600&fit=crop",
        description: "Professional cycling gear from Specialized.",
        category: "partner",
        athleteId: "julian-alaphilippe"
      }
    ],
    cause: {
      id: "ja-c1",
      title: "Cycling for All",
      story: "Making cycling accessible and promoting sustainable transportation across Europe.",
      target: 30000,
      raised: 12400,
      currency: "€",
      image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=400&fit=crop"
    },
    mediaFeed: [
      {
        id: "ja-mf1",
        type: "social",
        platform: "instagram",
        content: "Cols, pain, glory. This is what we live for. Tour de France preparation in full swing! 🚴‍♂️⛰️",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=800&fit=crop",
        timestamp: "4 hours ago",
        stats: { likes: 56000, comments: 1200 }
      },
      {
        id: "ja-mf2",
        type: "video",
        platform: "youtube",
        title: "Julian Alaphilippe - Best Attacks & Stage Wins",
        content: "The most explosive moments from cycling's greatest attacker.",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=450&fit=crop",
        timestamp: "1 week ago",
        stats: { views: 1400000, duration: "16:24" }
      },
      {
        id: "ja-mf3",
        type: "article",
        platform: "lequipe",
        title: "Julian Alaphilippe: \"The yellow jersey was my destiny\"",
        content: "The two-time world champion reflects on his iconic Tour de France moments and what drives him...",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=400&fit=crop",
        timestamp: "2 days ago",
        stats: { readTime: "6 min read" }
      },
      {
        id: "ja-mf4",
        type: "social",
        platform: "twitter",
        content: "Two rainbows. Forever grateful. But the hunger for more never stops. Let's go! 🌈🌈",
        image: "",
        timestamp: "1 day ago",
        stats: { likes: 38000, comments: 780, shares: 4500 }
      },
      {
        id: "ja-mf5",
        type: "video",
        platform: "espn",
        title: "The Heart of a Champion: Julian Alaphilippe Story",
        content: "From amateur racer to world champion - the incredible journey of France's cycling hero.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop",
        timestamp: "1 month ago",
        stats: { views: 520000, duration: "22:18" }
      },
      {
        id: "ja-mf6",
        type: "article",
        platform: "bbc",
        title: "Julian Alaphilippe: The most exciting rider in cycling",
        content: "Why the French attacker has captured the hearts of cycling fans worldwide...",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=400&fit=crop",
        timestamp: "5 days ago",
        stats: { readTime: "7 min read" }
      }
    ]
  },
  {
    id: "arthur-rinderknech",
    name: "Arthur Rinderknech",
    sport: "Tennis",
    bio: "Big server. Fighter. French flair on the ATP Tour.",
    tagline: "Power tennis with French style",
    avatar: arthurRinderknechImg,
    banner: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&h=600&fit=crop",
    followers: 89000,
    training: [
      {
        id: "ar-t1",
        title: "Serve Power Development",
        description: "Building the explosive power behind my biggest weapon.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-03-01"
      },
      {
        id: "ar-t2",
        title: "Court Coverage Drills",
        description: "Moving efficiently to cover every angle.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-02-22"
      }
    ],
    life: [
      {
        id: "ar-l1",
        title: "Life on the ATP Tour",
        description: "Behind the scenes of a traveling tennis pro.",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-03-05"
      }
    ],
    gear: [
      {
        id: "ar-g1",
        title: "My Match Equipment",
        description: "Rackets, strings, and everything I need on court.",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-02-28"
      }
    ],
    products: [
      {
        id: "ar-p1",
        name: "Serve Power Program",
        price: 49,
        currency: "€",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=600&fit=crop",
        description: "Develop a powerful, consistent serve.",
        category: "athlete",
        athleteId: "arthur-rinderknech"
      }
    ],
    cause: {
      id: "ar-c1",
      title: "Tennis for All Kids",
      story: "Making tennis accessible to children in underserved communities across France.",
      target: 15000,
      raised: 4200,
      currency: "€",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop"
    },
    mediaFeed: [
      {
        id: "ar-mf1",
        type: "social",
        platform: "instagram",
        content: "Another day grinding on the practice courts. The work never stops! 💪🎾",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=800&fit=crop",
        timestamp: "4 hours ago",
        stats: { likes: 8500, comments: 230 }
      },
      {
        id: "ar-mf2",
        type: "video",
        platform: "youtube",
        title: "Arthur Rinderknech - Best Aces & Serves 2024",
        content: "Watch the biggest serves from one of France's hardest hitters.",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=450&fit=crop",
        timestamp: "1 week ago",
        stats: { views: 125000, duration: "8:42" }
      },
      {
        id: "ar-mf3",
        type: "article",
        platform: "lequipe",
        title: "Rinderknech: \"I'm ready for the big stage\"",
        content: "The French player discusses his ambitions and preparation for the Grand Slams...",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=400&fit=crop",
        timestamp: "3 days ago",
        stats: { readTime: "4 min read" }
      }
    ]
  },
  {
    id: "gael-monfils",
    name: "Gaël Monfils",
    sport: "Tennis",
    bio: "The Entertainer. Acrobatic. Electric. Pure showmanship.",
    tagline: "La Monf - Tennis's greatest showman",
    avatar: gaelMonfilsImg,
    banner: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&h=600&fit=crop",
    followers: 1250000,
    training: [
      {
        id: "gm-t1",
        title: "Explosive Movement Training",
        description: "The athletic foundation behind my acrobatic style.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-03-08"
      },
      {
        id: "gm-t2",
        title: "Defense to Offense Transitions",
        description: "Turning defense into spectacular winners.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-03-01"
      }
    ],
    life: [
      {
        id: "gm-l1",
        title: "Family Life with Elina",
        description: "Balancing tennis with being a dad and husband.",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-03-10"
      }
    ],
    gear: [
      {
        id: "gm-g1",
        title: "My Court Setup",
        description: "The equipment that helps me put on a show.",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-03-05"
      }
    ],
    products: [
      {
        id: "gm-p1",
        name: "Athletic Tennis Masterclass",
        price: 79,
        currency: "€",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
        description: "Learn the athletic foundations of showstopping tennis.",
        category: "athlete",
        athleteId: "gael-monfils"
      },
      {
        id: "gm-p2",
        name: "Signed La Monf Jersey",
        price: 120,
        currency: "€",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
        description: "Official match jersey with authentic signature.",
        category: "athlete",
        athleteId: "gael-monfils"
      }
    ],
    cause: {
      id: "gm-c1",
      title: "Sport & Joy Foundation",
      story: "Bringing the joy of sport to children worldwide through tennis camps and equipment donations.",
      target: 50000,
      raised: 28500,
      currency: "€",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop"
    },
    mediaFeed: [
      {
        id: "gm-mf1",
        type: "social",
        platform: "instagram",
        content: "When you love what you do, the crowd feels it! Thank you for the energy today! 🔥🎾",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=800&fit=crop",
        timestamp: "2 hours ago",
        stats: { likes: 156000, comments: 4200 }
      },
      {
        id: "gm-mf2",
        type: "video",
        platform: "youtube",
        title: "Gaël Monfils - Most Incredible Shots of His Career",
        content: "The most acrobatic and entertaining points from La Monf.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=450&fit=crop",
        timestamp: "2 weeks ago",
        stats: { views: 4500000, duration: "15:28" }
      },
      {
        id: "gm-mf3",
        type: "article",
        platform: "espn",
        title: "Monfils: Still entertaining at 38",
        content: "The French showman continues to delight crowds and compete at the highest level...",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=400&fit=crop",
        timestamp: "1 day ago",
        stats: { readTime: "6 min read" }
      },
      {
        id: "gm-mf4",
        type: "social",
        platform: "twitter",
        content: "Family time is the best time. Grateful for every moment off the court with my girls ❤️",
        image: "",
        timestamp: "5 hours ago",
        stats: { likes: 45000, comments: 890, shares: 3200 }
      }
    ]
  },
  {
    id: "arthur-fils",
    name: "Arthur Fils",
    sport: "Tennis",
    bio: "Rising star. Powerful baseline game. France's next big hope.",
    tagline: "The future of French tennis",
    avatar: arthurFilsImg,
    banner: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&h=600&fit=crop",
    followers: 125000,
    training: [
      {
        id: "af-t1",
        title: "Power Baseline Training",
        description: "Building the heavy groundstrokes that define my game.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-03-12"
      },
      {
        id: "af-t2",
        title: "Mental Toughness Sessions",
        description: "Developing the champion mindset at a young age.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-03-05"
      }
    ],
    life: [
      {
        id: "af-l1",
        title: "A Day in Training",
        description: "My daily routine as a young pro on the rise.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-03-15"
      }
    ],
    gear: [
      {
        id: "af-g1",
        title: "My Asics Setup",
        description: "The gear that supports my powerful game.",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-03-08"
      }
    ],
    products: [
      {
        id: "af-p1",
        name: "Young Pro Training Guide",
        price: 39,
        currency: "€",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=600&fit=crop",
        description: "Training principles for aspiring young players.",
        category: "athlete",
        athleteId: "arthur-fils"
      }
    ],
    cause: {
      id: "af-c1",
      title: "Youth Tennis Development",
      story: "Supporting young tennis talents who lack resources to pursue their dreams.",
      target: 20000,
      raised: 7800,
      currency: "€",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop"
    },
    mediaFeed: [
      {
        id: "af-mf1",
        type: "social",
        platform: "instagram",
        content: "First ATP final! Just the beginning. Hungry for more 🔥💪",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=800&fit=crop",
        timestamp: "6 hours ago",
        stats: { likes: 34000, comments: 890 }
      },
      {
        id: "af-mf2",
        type: "video",
        platform: "youtube",
        title: "Arthur Fils - The Rise of France's Next Star",
        content: "Highlights and breakthrough moments from the young French talent.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=450&fit=crop",
        timestamp: "1 week ago",
        stats: { views: 320000, duration: "10:15" }
      },
      {
        id: "af-mf3",
        type: "article",
        platform: "lequipe",
        title: "Arthur Fils: \"I want to be number one\"",
        content: "The young French star shares his ambitious goals and the work he's putting in...",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
        timestamp: "2 days ago",
        stats: { readTime: "5 min read" }
      }
    ]
  },
  {
    id: "arthur-cazaux",
    name: "Arthur Cazaux",
    sport: "Tennis",
    bio: "Young talent. Lacoste ambassador. All-court game.",
    tagline: "French elegance on the ATP Tour",
    avatar: arthurCazauxImg,
    banner: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&h=600&fit=crop",
    followers: 78000,
    training: [
      {
        id: "ac-t1",
        title: "All-Court Development",
        description: "Building a complete game for every surface.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-03-10"
      }
    ],
    life: [
      {
        id: "ac-l1",
        title: "Growing Up on Tour",
        description: "The journey of a young French professional.",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-03-12"
      }
    ],
    gear: [
      {
        id: "ac-g1",
        title: "Lacoste Collection",
        description: "My signature style on and off the court.",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-03-08"
      }
    ],
    products: [
      {
        id: "ac-p1",
        name: "Complete Game Blueprint",
        price: 45,
        currency: "€",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=600&fit=crop",
        description: "Develop an all-court tennis game.",
        category: "athlete",
        athleteId: "arthur-cazaux"
      }
    ],
    cause: {
      id: "ac-c1",
      title: "Tennis & Education",
      story: "Helping young athletes balance sports and academics.",
      target: 12000,
      raised: 3400,
      currency: "€",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop"
    },
    mediaFeed: [
      {
        id: "ac-mf1",
        type: "social",
        platform: "instagram",
        content: "Hard work pays off. New career high ranking! Thank you for all the support 🙏🎾",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=800&fit=crop",
        timestamp: "3 hours ago",
        stats: { likes: 12000, comments: 340 }
      },
      {
        id: "ac-mf2",
        type: "video",
        platform: "youtube",
        title: "Arthur Cazaux - Best Moments 2024",
        content: "Highlights from the young Frenchman's breakthrough season.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=450&fit=crop",
        timestamp: "5 days ago",
        stats: { views: 85000, duration: "7:33" }
      },
      {
        id: "ac-mf3",
        type: "article",
        platform: "lequipe",
        title: "Cazaux: \"I'm learning every match\"",
        content: "The young French talent discusses his development and goals for the season...",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=400&fit=crop",
        timestamp: "1 day ago",
        stats: { readTime: "4 min read" }
      }
    ]
  },
  {
    id: "corentin-moutet",
    name: "Corentin Moutet",
    sport: "Tennis",
    bio: "Fiery competitor. Creative shot-maker. Never backs down.",
    tagline: "French fire on the tennis court",
    avatar: corentinMoutetImg,
    banner: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&h=600&fit=crop",
    followers: 156000,
    training: [
      {
        id: "cm-t1",
        title: "Creative Shot Practice",
        description: "Developing the unorthodox shots that make my game unique.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-03-15"
      },
      {
        id: "cm-t2",
        title: "Intensity & Focus Training",
        description: "Channeling my competitive fire into winning tennis.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-03-08"
      }
    ],
    life: [
      {
        id: "cm-l1",
        title: "Behind the Intensity",
        description: "What drives my passion and fire on court.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-03-18"
      }
    ],
    gear: [
      {
        id: "cm-g1",
        title: "My Battle Equipment",
        description: "The gear I trust for every fight on court.",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-03-12"
      }
    ],
    products: [
      {
        id: "cm-p1",
        name: "Creative Tennis Playbook",
        price: 55,
        currency: "€",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=600&fit=crop",
        description: "Learn unorthodox shots and creative tactics.",
        category: "athlete",
        athleteId: "corentin-moutet"
      }
    ],
    cause: {
      id: "cm-c1",
      title: "Tennis Passion Project",
      story: "Inspiring the next generation of passionate tennis players.",
      target: 18000,
      raised: 6200,
      currency: "€",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop"
    },
    mediaFeed: [
      {
        id: "cm-mf1",
        type: "social",
        platform: "instagram",
        content: "Fight until the last point. That's who I am. 🔥💪",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=800&fit=crop",
        timestamp: "1 hour ago",
        stats: { likes: 28000, comments: 780 }
      },
      {
        id: "cm-mf2",
        type: "video",
        platform: "youtube",
        title: "Corentin Moutet - Most Intense Moments",
        content: "The passion and fire that makes Moutet one of tennis's most exciting players.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=450&fit=crop",
        timestamp: "3 days ago",
        stats: { views: 450000, duration: "11:45" }
      },
      {
        id: "cm-mf3",
        type: "article",
        platform: "lequipe",
        title: "Moutet: \"I play with my heart\"",
        content: "The French firebrand discusses his emotional style and what drives his competitive spirit...",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
        timestamp: "4 days ago",
        stats: { readTime: "5 min read" }
      },
      {
        id: "cm-mf4",
        type: "social",
        platform: "twitter",
        content: "Roland Garros is coming. Ready to give everything for the home crowd 🇫🇷❤️",
        image: "",
        timestamp: "8 hours ago",
        stats: { likes: 18000, comments: 560, shares: 2100 }
      }
    ]
  },
  {
    id: "ugo-humbert",
    name: "Ugo Humbert",
    sport: "Tennis",
    bio: "Smooth lefty. Elegant game. Masters 1000 champion.",
    tagline: "The elegant left-hander",
    avatar: ugoHumbertImg,
    banner: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&h=600&fit=crop",
    followers: 234000,
    training: [
      {
        id: "uh-t1",
        title: "Lefty Advantage Training",
        description: "Maximizing the tactical benefits of being left-handed.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-03-20"
      },
      {
        id: "uh-t2",
        title: "Smooth Stroke Development",
        description: "Refining the technique behind my fluid game.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
        category: "training",
        createdAt: "2024-03-12"
      }
    ],
    life: [
      {
        id: "uh-l1",
        title: "Life After a Masters Title",
        description: "How winning in Dubai changed everything.",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=500&fit=crop",
        category: "life",
        createdAt: "2024-03-22"
      }
    ],
    gear: [
      {
        id: "uh-g1",
        title: "My Lacoste Partnership",
        description: "The elegant style that matches my game.",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=800&h=500&fit=crop",
        category: "gear",
        createdAt: "2024-03-18"
      }
    ],
    products: [
      {
        id: "uh-p1",
        name: "Lefty Tennis Mastery",
        price: 65,
        currency: "€",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=600&fit=crop",
        description: "Tactical guide for left-handed players.",
        category: "athlete",
        athleteId: "ugo-humbert"
      },
      {
        id: "uh-p2",
        name: "Signed Champions Racket",
        price: 189,
        currency: "€",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=600&h=600&fit=crop",
        description: "Match-used racket from Masters 1000 victory.",
        category: "athlete",
        athleteId: "ugo-humbert"
      }
    ],
    cause: {
      id: "uh-c1",
      title: "Green Tennis Initiative",
      story: "Making professional tennis more environmentally sustainable.",
      target: 25000,
      raised: 11200,
      currency: "€",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop"
    },
    mediaFeed: [
      {
        id: "uh-mf1",
        type: "social",
        platform: "instagram",
        content: "Masters 1000 champion! Dreams do come true. Merci à tous! 🏆🇫🇷",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=800&fit=crop",
        timestamp: "1 day ago",
        stats: { likes: 89000, comments: 3400 }
      },
      {
        id: "uh-mf2",
        type: "video",
        platform: "youtube",
        title: "Ugo Humbert - Road to Masters 1000 Glory",
        content: "The complete journey to Humbert's biggest career title.",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=450&fit=crop",
        timestamp: "3 days ago",
        stats: { views: 890000, duration: "18:22" }
      },
      {
        id: "uh-mf3",
        type: "article",
        platform: "lequipe",
        title: "Humbert: \"This is just the beginning\"",
        content: "After his historic Masters 1000 win, the French lefty sets his sights even higher...",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=400&fit=crop",
        timestamp: "2 days ago",
        stats: { readTime: "6 min read" }
      },
      {
        id: "uh-mf4",
        type: "social",
        platform: "twitter",
        content: "Top 15 and climbing! Thank you for believing in me from day one 🙏💚",
        image: "",
        timestamp: "4 hours ago",
        stats: { likes: 34000, comments: 890, shares: 4500 }
      },
      {
        id: "uh-mf5",
        type: "article",
        platform: "bbc",
        title: "Ugo Humbert: France's elegant left-handed hope",
        content: "How the smooth-stroking Frenchman rose to become one of tennis's most watchable players...",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=800&h=400&fit=crop",
        timestamp: "5 days ago",
        stats: { readTime: "7 min read" }
      }
    ]
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
