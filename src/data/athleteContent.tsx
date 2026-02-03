import { Trophy, Gift, Star, Users, Play, Image, TrendingUp } from "lucide-react";
import { Dumbbell, Target, Apple, Brain } from "lucide-react";
import type { AthleteExclusiveZoneData } from "@/components/athletes/templates/AthleteExclusiveZone";
import type { AthleteTrainingSectionData } from "@/components/athletes/templates/AthleteTrainingSection";

// Arthur Cazaux Images
import arthurAction1 from "@/assets/arthur-cazaux-action1.png";
import arthurAction2 from "@/assets/arthur-cazaux-action2.png";
import arthurAction3 from "@/assets/arthur-cazaux-action3.png";
import arthurAction4 from "@/assets/arthur-cazaux-action4.png";
import arthurCincinnati from "@/assets/arthur-cazaux-cincinnati.png";
import arthurParis from "@/assets/arthur-cazaux-paris.png";
import skills1 from "@/assets/arthur-skills-1.png";
import skills2 from "@/assets/arthur-skills-2.png";
import skills3 from "@/assets/arthur-skills-3.png";
import skills4 from "@/assets/arthur-skills-4.png";
import nutrition1 from "@/assets/arthur-nutrition-1.png";
import nutrition2 from "@/assets/arthur-nutrition-2.png";
import nutrition3 from "@/assets/arthur-nutrition-3.png";
import nutrition4 from "@/assets/arthur-nutrition-4.png";
import mentalReal1 from "@/assets/arthur-mental-real-1.png";
import mentalReal2 from "@/assets/arthur-mental-real-2.png";
import mentalReal3 from "@/assets/arthur-mental-real-3.png";

// Matthieu Jalibert Images
import matthieuMatch from "@/assets/matthieu-jalibert-match.png";
import matthieuTraining from "@/assets/matthieu-jalibert-training.png";
import matthieuLifestyle from "@/assets/matthieu-jalibert-lifestyle.png";
import matthieuBanner from "@/assets/matthieu-jalibert-banner.png";
import matthieuMental1 from "@/assets/matthieu-mental-1.png";
import matthieuFitnessSpeed from "@/assets/matthieu-fitness-speed.png";
import matthieuFitness2 from "@/assets/matthieu-fitness-2.png";
import matthieuFitness3 from "@/assets/matthieu-fitness-3.png";
import matthieuFitness4 from "@/assets/matthieu-fitness-4.png";
import matthieuSkills1 from "@/assets/matthieu-skills-1.png";
import matthieuSkills2 from "@/assets/matthieu-skills-2.png";
import matthieuSkills3 from "@/assets/matthieu-skills-3.png";
import matthieuMental2 from "@/assets/matthieu-mental-2.png";
import matthieuMental3 from "@/assets/matthieu-mental-3.png";
import matthieuMental4 from "@/assets/matthieu-mental-4.png";

// Cassandre Beaugrand Images
import cassandreTraining1 from "@/assets/cassandre-training-1.jpeg";
import cassandreTrainingBike from "@/assets/cassandre-training-bike.jpg";
import cassandreTrainingSwim2 from "@/assets/cassandre-training-swim-2.jpg";
import cassandreTrainingTransition from "@/assets/cassandre-training-transition.jpg";
import cassandreTrainingRun from "@/assets/cassandre-training-run.jpg";
import cassandreTrainingSwim from "@/assets/cassandre-training-swim.jpg";
import cassandreStrength from "@/assets/cassandre-strength.jpg";
import cassandreMentalPrerace from "@/assets/cassandre-mental-prerace.jpg";

// Pierre Gasly Images
import pierreFitness1 from "@/assets/pierre-fitness-1.jpg";
import pierreFitness2 from "@/assets/pierre-fitness-2.jpg";
import pierreFitness3 from "@/assets/pierre-fitness-3.png";
import pierreFitness4 from "@/assets/pierre-fitness-4.jpg";
import pierreSkills1 from "@/assets/pierre-skills-1.jpg";
import pierreSkills2 from "@/assets/pierre-skills-2.jpg";
import pierreSkills3 from "@/assets/pierre-skills-3.jpg";
import pierreSkills4 from "@/assets/pierre-skills-4.jpg";
import pierreMental1 from "@/assets/pierre-mental-1.jpg";
import pierreMental2 from "@/assets/pierre-mental-2.jpeg";
import pierreMental3 from "@/assets/pierre-mental-3.jpg";
import pierreMental4 from "@/assets/pierre-mental-4.jpg";
import pierreNutrition1 from "@/assets/nutrition-race-fuel.jpg";
import pierreNutrition2 from "@/assets/nutrition-training-block.jpg";
import pierreNutrition3 from "@/assets/nutrition-travel.jpg";
import pierreNutrition4 from "@/assets/nutrition-recovery.jpg";
import pierreHighlight1 from "@/assets/pierre-highlight-1.jpg";
import pierreHighlight2 from "@/assets/pierre-highlight-2.jpg";
import pierreHighlight3 from "@/assets/pierre-highlight-3.png";
import pierreHighlight4 from "@/assets/pierre-highlight-4.png";
import pierreHighlight5 from "@/assets/pierre-highlight-5.png";
import pierreHighlight6 from "@/assets/pierre-highlight-6.png";

// Tommy Fleetwood Images
import tommyFitness1 from "@/assets/tommy-fitness-1.jpg";
import tommyFitness2 from "@/assets/tommy-fitness-2.jpg";
import tommyFitness3 from "@/assets/tommy-fitness-3.jpg";
import tommyFitness4 from "@/assets/tommy-fitness-4.jpg";
import tommySkills1 from "@/assets/tommy-skills-1.jpg";
import tommySkills2 from "@/assets/tommy-skills-2.jpg";
import tommySkills3 from "@/assets/tommy-skills-3.jpg";
import tommySkills4 from "@/assets/tommy-skills-4.jpg";
import tommyNutrition1 from "@/assets/tommy-nutrition-1.jpg";
import tommyNutrition2 from "@/assets/tommy-nutrition-2.jpg";
import tommyNutrition3 from "@/assets/tommy-nutrition-3.jpg";
import tommyNutrition4 from "@/assets/tommy-nutrition-4.jpg";
import tommyMental1 from "@/assets/tommy-mental-1.jpg";
import tommyMental2 from "@/assets/tommy-mental-2.jpg";
import tommyMental3 from "@/assets/tommy-mental-3.jpg";
import tommyMental4 from "@/assets/tommy-mental-4.jpg";

// ============================================
// ARTHUR CAZAUX DATA
// ============================================

export const arthurExclusiveZoneData: AthleteExclusiveZoneData = {
  athleteId: "arthur-cazaux",
  prizeDraws: [
    {
      id: "signed_racquet",
      title: "Win Signed Arthur Cazaux Racquet",
      description: "Authenticated Babolat Pure Aero signed by Arthur after his Cincinnati victory",
      badge: "Ends Jan 15",
      icon: Trophy,
      iconBg: "from-amber-500 to-orange-600"
    },
    {
      id: "gear_pack",
      title: "Halo Tennis Gear Pack",
      description: "Premium tennis bag, wristbands, cap, and grip set curated by Halo",
      badge: "Monthly Draw",
      icon: Gift,
      iconBg: "from-green-500 to-emerald-600"
    },
    {
      id: "virtual_qa",
      title: "Virtual Q&A Access",
      description: "Join a platform-hosted live Q&A session with Arthur and other fans",
      badge: "Next: Feb 2025",
      icon: Users,
      iconBg: "from-blue-500 to-indigo-600"
    },
    {
      id: "meetup_event",
      title: "Halo Tennis Meetup Ticket",
      description: "Attend an exclusive Halo-organized tennis event in Paris",
      badge: "Limited",
      icon: Star,
      iconBg: "from-purple-500 to-pink-600"
    }
  ],
  exclusiveContent: [
    {
      id: "match_stats",
      title: "Arthur's 2024 Season Stats Breakdown",
      description: "Serve speeds, break point conversion, and key performance metrics from the ATP Tour",
      thumbnail: arthurAction1,
      type: "Stats",
      icon: TrendingUp
    },
    {
      id: "training_day",
      title: "A Day at the Training Center",
      description: "Behind-the-scenes look at Arthur's typical training day in Paris",
      thumbnail: arthurAction2,
      type: "Video",
      icon: Play
    },
    {
      id: "photo_gallery",
      title: "Cincinnati Victory Gallery",
      description: "Exclusive photos from Arthur's breakthrough Cincinnati tournament",
      thumbnail: arthurCincinnati,
      type: "Gallery",
      icon: Image
    },
    {
      id: "match_breakdown",
      title: "Tactical Match Breakdown",
      description: "Analysis of Arthur's game-winning patterns and strategies",
      thumbnail: arthurAction3,
      type: "Analysis",
      icon: TrendingUp
    },
    {
      id: "paris_moments",
      title: "Paris Masters Moments",
      description: "Key highlights and memorable moments from home soil",
      thumbnail: arthurParis,
      type: "Highlights",
      icon: Play
    }
  ],
  discussionThreads: [
    {
      id: "match_reactions",
      title: "Match Reactions",
      description: "Discuss Arthur's latest matches, results, and pivotal moments",
      participants: 847,
      lastActive: "2 hours ago"
    },
    {
      id: "tournament_predictions",
      title: "Tournament Predictions",
      description: "Share your predictions for upcoming ATP events and Grand Slams",
      participants: 1234,
      lastActive: "30 min ago"
    },
    {
      id: "training_tips",
      title: "Training Tips (Fan to Fan)",
      description: "Exchange tennis training advice, drills, and improvement strategies",
      participants: 562,
      lastActive: "1 hour ago"
    },
    {
      id: "gear_talk",
      title: "Tennis Gear Talk",
      description: "Discuss racquets, strings, shoes, and equipment choices",
      participants: 423,
      lastActive: "45 min ago"
    }
  ]
};

export const arthurTrainingData: AthleteTrainingSectionData = {
  athleteSlug: "arthur-cazaux",
  categories: [
    {
      id: "fitness",
      title: "Fitness",
      description: "Build the physical foundation for explosive tennis, including power, endurance, speed and recovery.",
      icon: <Dumbbell className="h-4 w-4" />,
      programs: [
        {
          id: "fitness-1",
          title: "Court Movement & Footwork Speed",
          description: "My session for developing fast first steps, quick recoveries, and sharp direction changes.",
          image: arthurAction1
        },
        {
          id: "fitness-2",
          title: "Match-Ready Endurance Set",
          description: "The interval routine I use to stay explosive deep into long sets, mixing court sprints with short rest.",
          image: arthurAction2
        },
        {
          id: "fitness-3",
          title: "Rotational Power for Forehand & Backhand",
          description: "The core and trunk rotation exercises that help me generate ball speed and stability on both wings.",
          image: arthurAction3
        },
        {
          id: "fitness-4",
          title: "Recovery Mobility Routine",
          description: "My mobility flow after tough match days to stay loose, reduce stiffness, and prevent injury.",
          image: arthurAction4
        }
      ]
    },
    {
      id: "skills",
      title: "Skills",
      description: "Technical sessions focused on sharpening the weapons I rely on in matches.",
      icon: <Target className="h-4 w-4" />,
      programs: [
        {
          id: "skills-1",
          title: "Heavy Forehand Patterns",
          description: "The forehand patterns I drill every week, including inside-out, inside-in, and finishing at the net.",
          image: skills1
        },
        {
          id: "skills-2",
          title: "Serve + First Ball Domination",
          description: "The playbook I use to take control early in the point through serve placement and aggressive first shots.",
          image: skills2
        },
        {
          id: "skills-3",
          title: "Backhand Stability Under Pressure",
          description: "A repetition session designed to keep my backhand solid and reliable against deep, heavy balls.",
          image: skills3
        },
        {
          id: "skills-4",
          title: "Net Game Finishing",
          description: "Drills to improve my volley touch, reflexes, and transition game for winning points at the net.",
          image: skills4
        }
      ]
    },
    {
      id: "nutrition",
      title: "Nutrition",
      description: "Fueling my body for peak performance, recovery, and longevity on tour.",
      icon: <Apple className="h-4 w-4" />,
      programs: [
        {
          id: "nutrition-1",
          title: "Tournament Day Fuel",
          description: "What I eat before, during, and after matches to maintain focus, energy, and recovery on competition days.",
          image: nutrition1
        },
        {
          id: "nutrition-2",
          title: "Training Block Nutrition",
          description: "The higher-calorie meal structure I follow during intense prep weeks to build strength and stamina.",
          image: nutrition2
        },
        {
          id: "nutrition-3",
          title: "Travel & Recovery Eating",
          description: "How I manage nutrition on the road and prioritize sleep-promoting, anti-inflammatory meals.",
          image: nutrition3
        },
        {
          id: "nutrition-4",
          title: "Hydration & Supplements",
          description: "My approach to hydration, electrolytes, and the few supplements I trust for joint health and recovery.",
          image: nutrition4
        }
      ]
    },
    {
      id: "mental",
      title: "Mental",
      description: "Building the mindset to handle pressure, stay focused, and compete at my best.",
      icon: <Brain className="h-4 w-4" />,
      programs: [
        {
          id: "mental-1",
          title: "Pre-Match Focus Routine",
          description: "What I do in the locker room and during warm-up to lock in mentally and manage nerves.",
          image: mentalReal1
        },
        {
          id: "mental-2",
          title: "Resetting After Losing a Set",
          description: "How I mentally restart when things aren't going my way, using breathing techniques and reframing.",
          image: mentalReal2
        },
        {
          id: "mental-3",
          title: "Managing Big Points",
          description: "The mindset I use when facing break points or tie-breaks — staying present and trusting my game.",
          image: mentalReal3
        },
        {
          id: "mental-4",
          title: "Visualization & Off-Court Practice",
          description: "How I use mental imagery to prepare for opponents and reinforce my confidence away from the court."
        }
      ]
    }
  ]
};

// ============================================
// MATTHIEU JALIBERT DATA
// ============================================

export const matthieuExclusiveZoneData: AthleteExclusiveZoneData = {
  athleteId: "matthieu-jalibert",
  prizeDraws: [
    {
      id: "signed_ball",
      title: "Win Signed Matthieu Jalibert Match Ball",
      description: "Authenticated Gilbert rugby ball signed by Matthieu after his Top 14 performance",
      badge: "Ends Jan 15",
      icon: Trophy,
      iconBg: "from-amber-500 to-orange-600"
    },
    {
      id: "gear_pack",
      title: "Halo Rugby Gear Pack",
      description: "Premium rugby boots, wristbands, rugby ball, and a curated training kit",
      badge: "Monthly Draw",
      icon: Gift,
      iconBg: "from-green-500 to-emerald-600"
    },
    {
      id: "virtual_qa",
      title: "Virtual Q&A Access",
      description: "Join a platform-hosted live session on rugby tactics and match breakdown with Matthieu",
      badge: "Next: Feb 2025",
      icon: Users,
      iconBg: "from-blue-500 to-indigo-600"
    },
    {
      id: "meetup_event",
      title: "Halo Rugby Fan Meetup Ticket",
      description: "Attend an exclusive Halo-organized rugby event at a stadium experience",
      badge: "Limited",
      icon: Star,
      iconBg: "from-purple-500 to-pink-600"
    }
  ],
  exclusiveContent: [
    {
      id: "season_highlights",
      title: "Matthieu's 2024 Season Highlights",
      description: "Key tries, conversions, and breakthrough moments from the Top 14 and Champions Cup",
      thumbnail: matthieuMatch,
      type: "Highlights",
      icon: Play
    },
    {
      id: "training_day",
      title: "A Day with UBB",
      description: "Behind-the-scenes look at Matthieu's training routine at Union Bordeaux Bègles",
      thumbnail: matthieuTraining,
      type: "Video",
      icon: Play
    },
    {
      id: "photo_gallery",
      title: "Match Day Gallery",
      description: "Exclusive photos from Top 14 and international fixtures",
      thumbnail: matthieuLifestyle,
      type: "Gallery",
      icon: Image
    },
    {
      id: "tactical_breakdown",
      title: "Fly-Half Tactical Breakdown",
      description: "Analysis of Matthieu's decision-making, kicking game, and playmaking patterns",
      thumbnail: matthieuBanner,
      type: "Analysis",
      icon: TrendingUp
    },
    {
      id: "mental_prep",
      title: "Pre-Match Mental Preparation",
      description: "How Matthieu prepares mentally before big games",
      thumbnail: matthieuMental1,
      type: "Feature",
      icon: TrendingUp
    }
  ],
  discussionThreads: [
    {
      id: "match_reactions",
      title: "Match Reactions",
      description: "Discuss Matthieu's latest matches, plays, and key moments on the pitch",
      participants: 1247,
      lastActive: "2 hours ago"
    },
    {
      id: "tournament_predictions",
      title: "Tournament Predictions",
      description: "Share your predictions for Top 14, Champions Cup, and international fixtures",
      participants: 2134,
      lastActive: "30 min ago"
    },
    {
      id: "training_tips",
      title: "Training Tips (Fan to Fan)",
      description: "Exchange rugby training drills, kicking tips, passing mechanics, and conditioning",
      participants: 862,
      lastActive: "1 hour ago"
    },
    {
      id: "gear_talk",
      title: "Rugby Gear Talk",
      description: "Discuss boots, balls, protective gear, and equipment used by Matthieu",
      participants: 623,
      lastActive: "45 min ago"
    }
  ]
};

export const matthieuTrainingData: AthleteTrainingSectionData = {
  athleteSlug: "matthieu-jalibert",
  categories: [
    {
      id: "fitness",
      title: "Fitness",
      description: "Build the physical foundation for elite fly-half play, including explosive power, endurance, and rugby-specific conditioning.",
      icon: <Dumbbell className="h-4 w-4" />,
      programs: [
        {
          id: "fitness-1",
          title: "Explosive Speed & Acceleration",
          description: "My sprint training program to develop the acceleration needed to break defensive lines.",
          image: matthieuFitnessSpeed
        },
        {
          id: "fitness-2",
          title: "Rugby-Specific Conditioning",
          description: "The interval and endurance work I do to maintain high performance across 80 minutes.",
          image: matthieuFitness2
        },
        {
          id: "fitness-3",
          title: "Lower Body Power Development",
          description: "Strength exercises focused on leg drive, tackling power, and kicking distance.",
          image: matthieuFitness3
        },
        {
          id: "fitness-4",
          title: "Recovery & Mobility Routine",
          description: "Post-match and training recovery protocols to stay fresh and prevent injuries.",
          image: matthieuFitness4
        }
      ]
    },
    {
      id: "skills",
      title: "Skills",
      description: "Technical sessions to sharpen passing, kicking, and decision-making on the field.",
      icon: <Target className="h-4 w-4" />,
      programs: [
        {
          id: "skills-1",
          title: "Goal Kicking Mastery",
          description: "My complete kicking routine covering technique, consistency, and pressure management.",
          image: matthieuSkills1
        },
        {
          id: "skills-2",
          title: "Passing Under Pressure",
          description: "Drills to develop accurate, quick passing in high-pressure match situations.",
          image: matthieuSkills2
        },
        {
          id: "skills-3",
          title: "Tactical Kicking Game",
          description: "Box kicks, grubbers, and territory management — the kicks that win matches.",
          image: matthieuSkills3
        },
        {
          id: "skills-4",
          title: "Playmaking & Decision-Making",
          description: "Reading defenses, creating space, and executing the right play at the right time."
        }
      ]
    },
    {
      id: "nutrition",
      title: "Nutrition",
      description: "Fuel strategies for rugby performance, muscle recovery, and sustained energy.",
      icon: <Apple className="h-4 w-4" />,
      programs: [
        {
          id: "nutrition-1",
          title: "Match Day Fuel",
          description: "What I eat before, during, and after games to perform at my best.",
          image: nutrition1
        },
        {
          id: "nutrition-2",
          title: "Training Block Nutrition",
          description: "Higher calorie eating for intense training weeks and muscle building.",
          image: nutrition2
        },
        {
          id: "nutrition-3",
          title: "Recovery Nutrition",
          description: "Post-match and post-training meals that accelerate recovery.",
          image: nutrition3
        },
        {
          id: "nutrition-4",
          title: "Hydration & Supplements",
          description: "My hydration strategy and the supplements I trust for performance.",
          image: nutrition4
        }
      ]
    },
    {
      id: "mental",
      title: "Mental",
      description: "Mental preparation techniques for handling pressure, leadership, and match focus.",
      icon: <Brain className="h-4 w-4" />,
      programs: [
        {
          id: "mental-1",
          title: "Pre-Match Mental Routine",
          description: "How I prepare mentally before stepping onto the pitch for big games.",
          image: matthieuMental1
        },
        {
          id: "mental-2",
          title: "Handling Kicking Pressure",
          description: "Staying calm and focused when taking crucial kicks in high-pressure moments.",
          image: matthieuMental2
        },
        {
          id: "mental-3",
          title: "Leadership on the Field",
          description: "How I communicate with teammates and manage the game as a fly-half.",
          image: matthieuMental3
        },
        {
          id: "mental-4",
          title: "Bouncing Back from Mistakes",
          description: "The mental reset techniques I use to stay focused after errors.",
          image: matthieuMental4
        }
      ]
    }
  ]
};

// ============================================
// CASSANDRE BEAUGRAND DATA
// ============================================

export const cassandreExclusiveZoneData: AthleteExclusiveZoneData = {
  athleteId: "cassandre-beaugrand",
  prizeDraws: [
    {
      id: "signed_wetsuit",
      title: "Win Signed Cassandre Beaugrand Wetsuit",
      description: "Authenticated race wetsuit signed by Cassandre after her Olympic gold victory",
      badge: "Ends Jan 15",
      icon: Trophy,
      iconBg: "from-amber-500 to-orange-600"
    },
    {
      id: "gear_pack",
      title: "Halo Triathlon Gear Pack",
      description: "Premium tri suit, goggles, race belt, and transition bag curated by Halo",
      badge: "Monthly Draw",
      icon: Gift,
      iconBg: "from-green-500 to-emerald-600"
    },
    {
      id: "virtual_qa",
      title: "Virtual Q&A Access",
      description: "Join a platform-hosted live Q&A session with Cassandre and other fans",
      badge: "Next: Feb 2025",
      icon: Users,
      iconBg: "from-blue-500 to-indigo-600"
    },
    {
      id: "meetup_event",
      title: "Halo Triathlon Meetup Ticket",
      description: "Attend an exclusive Halo-organized triathlon event in Paris",
      badge: "Limited",
      icon: Star,
      iconBg: "from-purple-500 to-pink-600"
    }
  ],
  exclusiveContent: [
    {
      id: "race_stats",
      title: "Cassandre's 2024 Season Stats Breakdown",
      description: "Swim splits, T1/T2 times, and key performance metrics from the WTCS Tour",
      thumbnail: cassandreTrainingRun,
      type: "Stats",
      icon: TrendingUp
    },
    {
      id: "training_day",
      title: "A Day at Training Camp",
      description: "Behind-the-scenes look at Cassandre's typical training day with her squad",
      thumbnail: cassandreTraining1,
      type: "Video",
      icon: Play
    },
    {
      id: "photo_gallery",
      title: "Olympic Gold Gallery",
      description: "Exclusive photos from Cassandre's historic Paris 2024 Olympic victory",
      thumbnail: cassandreTrainingBike,
      type: "Gallery",
      icon: Image
    },
    {
      id: "race_breakdown",
      title: "Race Tactical Breakdown",
      description: "Analysis of Cassandre's race-winning strategies and transition techniques",
      thumbnail: cassandreTrainingSwim2,
      type: "Analysis",
      icon: TrendingUp
    },
    {
      id: "transition_secrets",
      title: "Transition Zone Secrets",
      description: "How Cassandre dominates T1 and T2 with precision and speed",
      thumbnail: cassandreTrainingTransition,
      type: "Feature",
      icon: Play
    }
  ],
  discussionThreads: [
    {
      id: "race_reactions",
      title: "Race Reactions",
      description: "Discuss Cassandre's latest races, results, and pivotal moments",
      participants: 1247,
      lastActive: "2 hours ago"
    },
    {
      id: "race_predictions",
      title: "Race Predictions",
      description: "Share your predictions for upcoming WTCS events and Championships",
      participants: 2134,
      lastActive: "30 min ago"
    },
    {
      id: "training_tips",
      title: "Training Tips (Fan to Fan)",
      description: "Exchange triathlon training advice, drills, and improvement strategies",
      participants: 862,
      lastActive: "1 hour ago"
    },
    {
      id: "gear_talk",
      title: "Triathlon Gear Talk",
      description: "Discuss bikes, wetsuits, running shoes, and equipment choices",
      participants: 623,
      lastActive: "45 min ago"
    }
  ]
};

export const cassandreTrainingData: AthleteTrainingSectionData = {
  athleteSlug: "cassandre-beaugrand",
  categories: [
    {
      id: "fitness",
      title: "Fitness",
      description: "Build the endurance and power foundation for elite triathlon performance across all three disciplines.",
      icon: <Dumbbell className="h-4 w-4" />,
      programs: [
        {
          id: "fitness-1",
          title: "Swim Power & Endurance",
          description: "My pool sessions to build the strength and stamina for open water race starts.",
          image: cassandreTrainingSwim
        },
        {
          id: "fitness-2",
          title: "Bike Power Development",
          description: "The cycling workouts I use to build leg power and maintain speed over 40km.",
          image: cassandreTrainingBike
        },
        {
          id: "fitness-3",
          title: "Run Speed & Endurance",
          description: "Track and road sessions that prepare me for the decisive 10km run leg.",
          image: cassandreTrainingRun
        },
        {
          id: "fitness-4",
          title: "Strength & Core Training",
          description: "The gym work that supports all three disciplines and prevents injury.",
          image: cassandreStrength
        }
      ]
    },
    {
      id: "skills",
      title: "Skills",
      description: "Technical sessions for swim efficiency, bike handling, run form, and race-winning transitions.",
      icon: <Target className="h-4 w-4" />,
      programs: [
        {
          id: "skills-1",
          title: "Open Water Swim Technique",
          description: "Sighting, drafting, and positioning tactics for race-day swim success.",
          image: cassandreTrainingSwim2
        },
        {
          id: "skills-2",
          title: "Transition Mastery",
          description: "The drills I use to shave seconds off T1 and T2 — every second counts.",
          image: cassandreTrainingTransition
        },
        {
          id: "skills-3",
          title: "Bike Handling & Cornering",
          description: "Technical skills for drafting, cornering, and positioning in the pack."
        },
        {
          id: "skills-4",
          title: "Run Form Under Fatigue",
          description: "Maintaining efficient running mechanics when legs are heavy off the bike."
        }
      ]
    },
    {
      id: "nutrition",
      title: "Nutrition",
      description: "Fueling strategies for training blocks, race day, and optimal recovery.",
      icon: <Apple className="h-4 w-4" />,
      programs: [
        {
          id: "nutrition-1",
          title: "Race Day Fuel",
          description: "What I eat and drink before, during, and after races to perform my best.",
          image: nutrition1
        },
        {
          id: "nutrition-2",
          title: "Training Block Nutrition",
          description: "Eating for high-volume training weeks when calorie demands are extreme.",
          image: nutrition2
        },
        {
          id: "nutrition-3",
          title: "Recovery Nutrition",
          description: "Post-training meals and timing strategies for optimal adaptation.",
          image: nutrition3
        },
        {
          id: "nutrition-4",
          title: "Travel & Race Week Eating",
          description: "Managing nutrition on the road and during race week taper.",
          image: nutrition4
        }
      ]
    },
    {
      id: "mental",
      title: "Mental",
      description: "Mental preparation for handling race pressure, pain management, and competitive focus.",
      icon: <Brain className="h-4 w-4" />,
      programs: [
        {
          id: "mental-1",
          title: "Pre-Race Mental Routine",
          description: "How I prepare mentally in the hours and minutes before the starting gun.",
          image: cassandreMentalPrerace
        },
        {
          id: "mental-2",
          title: "Managing Race Pain",
          description: "Mental techniques for pushing through when the body wants to stop."
        },
        {
          id: "mental-3",
          title: "Staying Present in Competition",
          description: "How I maintain focus and avoid getting distracted by competitors."
        },
        {
          id: "mental-4",
          title: "Visualization & Race Rehearsal",
          description: "Using mental imagery to prepare for race scenarios and build confidence."
        }
      ]
    }
  ]
};

// ============================================
// PIERRE GASLY DATA
// ============================================

export const pierreExclusiveZoneData: AthleteExclusiveZoneData = {
  athleteId: "pierre-gasly",
  prizeDraws: [
    {
      id: "signed_helmet",
      title: "Win Signed Pierre Gasly Race Helmet",
      description: "Authenticated 1:2 scale replica helmet signed by Pierre after his Monza 2020 victory — the most emotional win in F1 history",
      badge: "Ends Jan 15",
      icon: Trophy,
      iconBg: "from-amber-500 to-orange-600"
    },
    {
      id: "race_gloves",
      title: "Race-Worn Gloves Giveaway",
      description: "Genuine race-worn Alpine F1 gloves from the 2024 season with certificate of authenticity",
      badge: "Monthly Draw",
      icon: Gift,
      iconBg: "from-green-500 to-emerald-600"
    },
    {
      id: "virtual_garage_tour",
      title: "Virtual Factory Tour with Pierre",
      description: "Join an exclusive virtual walkthrough of the Alpine F1 factory in Enstone with Pierre as your guide",
      badge: "Next: Feb 2025",
      icon: Users,
      iconBg: "from-blue-500 to-indigo-600"
    },
    {
      id: "monaco_gp_experience",
      title: "Monaco GP VIP Experience",
      description: "Win a paddock pass and yacht viewing experience for Pierre's home Grand Prix in Monaco",
      badge: "Limited",
      icon: Star,
      iconBg: "from-purple-500 to-pink-600"
    }
  ],
  exclusiveContent: [
    {
      id: "onboard_analysis",
      title: "Onboard Lap Analysis with Pierre",
      description: "Watch Pierre break down his qualifying laps sector by sector, explaining braking points, racing lines, and setup choices",
      thumbnail: pierreHighlight1,
      type: "Video",
      icon: Play
    },
    {
      id: "monza_2020_story",
      title: "The Monza Victory Story",
      description: "The full story behind Pierre's emotional 2020 Italian GP win — from tragedy to triumph, in his own words",
      thumbnail: pierreHighlight2,
      type: "Documentary",
      icon: Play
    },
    {
      id: "season_stats",
      title: "2024 Season Performance Deep Dive",
      description: "Detailed breakdown of lap times, overtakes, qualifying battles, and race pace compared to teammates and rivals",
      thumbnail: pierreHighlight3,
      type: "Stats",
      icon: TrendingUp
    },
    {
      id: "simulator_session",
      title: "Inside the F1 Simulator",
      description: "Go behind the scenes at Alpine's state-of-the-art simulator and see how Pierre prepares for race weekends",
      thumbnail: pierreHighlight4,
      type: "Video",
      icon: Play
    },
    {
      id: "race_engineer_comms",
      title: "Radio Highlights Collection",
      description: "Exclusive extended team radio from key moments — strategy calls, celebrations, and intense battles",
      thumbnail: pierreHighlight5,
      type: "Audio",
      icon: Play
    },
    {
      id: "helmet_design_story",
      title: "Helmet Design Process",
      description: "How Pierre designs his race helmets — from initial sketches to the finished product honoring Anthoine Hubert",
      thumbnail: pierreHighlight6,
      type: "Gallery",
      icon: Image
    }
  ],
  discussionThreads: [
    {
      id: "race_weekend_live",
      title: "Race Weekend Live Chat",
      description: "Live discussion during every Grand Prix — quali predictions, race reactions, and post-race analysis",
      participants: 4521,
      lastActive: "5 min ago"
    },
    {
      id: "alpine_development",
      title: "Alpine 2025 Car Discussion",
      description: "Discuss the A525 development, new regulations, and what changes could help Pierre challenge for podiums",
      participants: 2847,
      lastActive: "20 min ago"
    },
    {
      id: "sim_racing_community",
      title: "Sim Racing Setup Exchange",
      description: "Share your F1 game setups for each circuit, compare lap times, and get tips from the community",
      participants: 1823,
      lastActive: "45 min ago"
    },
    {
      id: "driver_market_rumors",
      title: "Driver Market & Team News",
      description: "Discuss the latest F1 driver market rumors, contract situations, and team movements",
      participants: 3156,
      lastActive: "10 min ago"
    },
    {
      id: "karting_beginners",
      title: "Getting Into Karting",
      description: "Advice for fans wanting to start karting — equipment, tracks, and tips inspired by Pierre's journey",
      participants: 892,
      lastActive: "1 hour ago"
    }
  ]
};

export const pierreTrainingData: AthleteTrainingSectionData = {
  athleteSlug: "pierre-gasly",
  categories: [
    {
      id: "fitness",
      title: "Fitness",
      description: "Build the physical foundation for elite F1 performance, including neck strength, G-force resistance, and cardiovascular endurance.",
      icon: <Dumbbell className="h-4 w-4" />,
      programs: [
        {
          id: "fitness-1",
          title: "Neck & Core Strengthening",
          description: "My essential routine for building the neck strength needed to handle 5G+ forces during cornering and braking.",
          image: pierreFitness1
        },
        {
          id: "fitness-2",
          title: "Cardiovascular Endurance Training",
          description: "The cardio sessions I use to maintain peak heart rate performance across 2-hour races in extreme heat.",
          image: pierreFitness2
        },
        {
          id: "fitness-3",
          title: "Reaction Time & Reflexes",
          description: "Drills and exercises to sharpen the split-second reactions needed for wheel-to-wheel racing.",
          image: pierreFitness3
        },
        {
          id: "fitness-4",
          title: "Heat Acclimatization Protocol",
          description: "My approach to preparing for races in extreme temperatures like Singapore, Qatar, and Bahrain.",
          image: pierreFitness4
        }
      ]
    },
    {
      id: "skills",
      title: "Skills",
      description: "Technical sessions focused on driving precision, race-craft, and simulator preparation.",
      icon: <Target className="h-4 w-4" />,
      programs: [
        {
          id: "skills-1",
          title: "Braking Point Precision",
          description: "How I train my braking consistency to hit the same points lap after lap under pressure.",
          image: pierreSkills1
        },
        {
          id: "skills-2",
          title: "Overtaking Techniques",
          description: "The race-craft I use for late-braking moves, switchbacks, and creating overtaking opportunities.",
          image: pierreSkills2
        },
        {
          id: "skills-3",
          title: "Tire Management Mastery",
          description: "Understanding tire degradation, temperature windows, and extending stint lengths.",
          image: pierreSkills3
        },
        {
          id: "skills-4",
          title: "Wet Weather Driving",
          description: "Techniques for handling reduced grip, spray visibility, and aquaplaning in rain conditions.",
          image: pierreSkills4
        }
      ]
    },
    {
      id: "nutrition",
      title: "Nutrition",
      description: "Fueling strategies for race weekends, travel recovery, and maintaining optimal weight.",
      icon: <Apple className="h-4 w-4" />,
      programs: [
        {
          id: "nutrition-1",
          title: "Race Weekend Fuel",
          description: "What I eat before, during, and after race weekends to maintain focus and physical performance.",
          image: pierreNutrition1
        },
        {
          id: "nutrition-2",
          title: "Weight Management Protocol",
          description: "Balancing muscle mass, hydration, and minimum weight requirements for optimal performance.",
          image: pierreNutrition2
        },
        {
          id: "nutrition-3",
          title: "Travel & Jet Lag Recovery",
          description: "Managing nutrition across 24 races and constant timezone changes throughout the season.",
          image: pierreNutrition3
        },
        {
          id: "nutrition-4",
          title: "Hydration Strategy",
          description: "My approach to staying hydrated when losing 2-3kg of fluid during a single race.",
          image: pierreNutrition4
        }
      ]
    },
    {
      id: "mental",
      title: "Mental",
      description: "Mental preparation for handling pressure, staying focused, and performing under the global spotlight.",
      icon: <Brain className="h-4 w-4" />,
      programs: [
        {
          id: "mental-1",
          title: "Pre-Race Focus Routine",
          description: "What I do in the hours before lights out to get into the zone and manage adrenaline.",
          image: pierreMental1
        },
        {
          id: "mental-2",
          title: "Managing Race Pressure",
          description: "How I stay calm during critical moments like safety car restarts, final laps, and title fights.",
          image: pierreMental2
        },
        {
          id: "mental-3",
          title: "Bouncing Back from DNFs",
          description: "The mental reset techniques I use after crashes, mechanical failures, or disappointing results.",
          image: pierreMental3
        },
        {
          id: "mental-4",
          title: "Visualization & Track Prep",
          description: "Using mental imagery to learn new circuits and prepare for every corner before arriving.",
          image: pierreMental4
        }
      ]
    }
  ]
};

// ============================================
// TOMMY FLEETWOOD DATA
// ============================================

export const tommyExclusiveZoneData: AthleteExclusiveZoneData = {
  athleteId: "tommy-fleetwood",
  prizeDraws: [
    {
      id: "signed_glove",
      title: "Win Signed Tommy Fleetwood Golf Glove",
      description: "Authenticated Nike golf glove signed by Tommy after his Ryder Cup performance",
      badge: "Ends Jan 15",
      icon: Trophy,
      iconBg: "from-amber-500 to-orange-600"
    },
    {
      id: "gear_pack",
      title: "Halo Golf Gear Pack",
      description: "Premium TaylorMade golf balls, Nike cap, Tour towel, and divot tool curated by Halo",
      badge: "Monthly Draw",
      icon: Gift,
      iconBg: "from-green-500 to-emerald-600"
    },
    {
      id: "virtual_qa",
      title: "Virtual Q&A Access",
      description: "Join a platform-hosted live session on course management and swing tips with Tommy",
      badge: "Next: Feb 2025",
      icon: Users,
      iconBg: "from-blue-500 to-indigo-600"
    },
    {
      id: "pro_am_experience",
      title: "Halo Pro-Am Experience",
      description: "Attend an exclusive Halo-organized golf day at a championship course",
      badge: "Limited",
      icon: Star,
      iconBg: "from-purple-500 to-pink-600"
    }
  ],
  exclusiveContent: [
    {
      id: "season_stats",
      title: "Tommy's 2024 Season Stats Breakdown",
      description: "Driving accuracy, greens in regulation, and key performance metrics from the PGA and DP World Tours",
      thumbnail: tommySkills1,
      type: "Stats",
      icon: TrendingUp
    },
    {
      id: "practice_routine",
      title: "A Day at the Practice Range",
      description: "Behind-the-scenes look at Tommy's typical practice session before a tournament",
      thumbnail: tommySkills2,
      type: "Video",
      icon: Play
    },
    {
      id: "ryder_cup_gallery",
      title: "Ryder Cup Moments Gallery",
      description: "Exclusive photos from Tommy's memorable Ryder Cup performances",
      thumbnail: tommySkills3,
      type: "Gallery",
      icon: Image
    },
    {
      id: "course_breakdown",
      title: "Course Strategy Breakdown",
      description: "How Tommy approaches Augusta National, St Andrews, and other major venues",
      thumbnail: tommySkills4,
      type: "Analysis",
      icon: TrendingUp
    },
    {
      id: "major_moments",
      title: "Major Championship Highlights",
      description: "Key moments and close calls from The Open, US Open, and PGA Championship",
      thumbnail: tommyMental2,
      type: "Highlights",
      icon: Play
    }
  ],
  discussionThreads: [
    {
      id: "tournament_reactions",
      title: "Tournament Reactions",
      description: "Discuss Tommy's latest rounds, results, and pivotal moments on tour",
      participants: 1547,
      lastActive: "2 hours ago"
    },
    {
      id: "major_predictions",
      title: "Major Championship Predictions",
      description: "Share your predictions for The Open, Masters, US Open, and PGA Championship",
      participants: 2834,
      lastActive: "30 min ago"
    },
    {
      id: "swing_tips",
      title: "Swing Tips (Fan to Fan)",
      description: "Exchange golf tips, drills, and improvement strategies inspired by Tommy's technique",
      participants: 962,
      lastActive: "1 hour ago"
    },
    {
      id: "gear_talk",
      title: "Golf Gear Talk",
      description: "Discuss clubs, balls, shoes, and equipment choices from TaylorMade and Nike",
      participants: 723,
      lastActive: "45 min ago"
    }
  ]
};

export const tommyTrainingData: AthleteTrainingSectionData = {
  athleteSlug: "tommy-fleetwood",
  categories: [
    {
      id: "fitness",
      title: "Fitness",
      description: "Build the physical foundation for 72-hole major championship performance.",
      icon: <Dumbbell className="h-4 w-4" />,
      programs: [
        {
          id: "fitness-1",
          title: "Golf-Specific Mobility",
          description: "My daily mobility routine to maintain full range of motion and prevent injury throughout the season.",
          image: tommyFitness1
        },
        {
          id: "fitness-2",
          title: "Rotational Power Training",
          description: "The strength work that generates clubhead speed and distance off the tee.",
          image: tommyFitness2
        },
        {
          id: "fitness-3",
          title: "Walking Endurance Protocol",
          description: "Building the stamina to stay sharp through 4 rounds of championship golf.",
          image: tommyFitness3
        },
        {
          id: "fitness-4",
          title: "Core Stability for Ball Striking",
          description: "The foundation of consistent contact — core exercises for tour-level stability.",
          image: tommyFitness4
        }
      ]
    },
    {
      id: "skills",
      title: "Skills",
      description: "Master the techniques that have made Tommy one of the most admired ball-strikers on tour.",
      icon: <Target className="h-4 w-4" />,
      programs: [
        {
          id: "skills-1",
          title: "Iron Play Precision",
          description: "Master the art of consistent ball striking with my approach to iron play.",
          image: tommySkills1
        },
        {
          id: "skills-2",
          title: "Short Game Secrets",
          description: "Chipping, pitching, and bunker play techniques to lower your scores.",
          image: tommySkills2
        },
        {
          id: "skills-3",
          title: "Putting Masterclass",
          description: "Read greens like a pro and develop a repeatable stroke.",
          image: tommySkills3
        },
        {
          id: "skills-4",
          title: "Driver Control",
          description: "Finding fairways consistently with my approach to tee shots.",
          image: tommySkills4
        }
      ]
    },
    {
      id: "nutrition",
      title: "Nutrition",
      description: "Fueling my body for peak performance across a 30-event global schedule.",
      icon: <Apple className="h-4 w-4" />,
      programs: [
        {
          id: "nutrition-1",
          title: "Tournament Week Fuel",
          description: "What I eat before, during, and after rounds to maintain focus and energy.",
          image: tommyNutrition1
        },
        {
          id: "nutrition-2",
          title: "On-Course Nutrition",
          description: "Managing energy levels during a 5-hour round with the right snacks and hydration.",
          image: tommyNutrition2
        },
        {
          id: "nutrition-3",
          title: "Travel & Jet Lag Recovery",
          description: "How I manage nutrition across time zones and international tournaments.",
          image: tommyNutrition3
        },
        {
          id: "nutrition-4",
          title: "Off-Season Recovery Eating",
          description: "The nutrition approach I use during training blocks and rest periods.",
          image: tommyNutrition4
        }
      ]
    },
    {
      id: "mental",
      title: "Mental",
      description: "Building the mindset to handle pressure, stay patient, and compete at my best.",
      icon: <Brain className="h-4 w-4" />,
      programs: [
        {
          id: "mental-1",
          title: "Pre-Round Focus Routine",
          description: "What I do on the range and practice green to lock in mentally before teeing off.",
          image: tommyMental1
        },
        {
          id: "mental-2",
          title: "Managing Major Championship Pressure",
          description: "How I stay calm and execute on the biggest stages in golf.",
          image: tommyMental2
        },
        {
          id: "mental-3",
          title: "Bouncing Back from Bad Holes",
          description: "The mental reset techniques I use after bogeys or worse to stay in the round.",
          image: tommyMental3
        },
        {
          id: "mental-4",
          title: "Course Management Mindset",
          description: "Strategic thinking and decision-making under competitive pressure.",
          image: tommyMental4
        }
      ]
    }
  ]
};

// ============================================
// NIC VON RUPP DATA
// ============================================

export const nicExclusiveZoneData: AthleteExclusiveZoneData = {
  athleteId: "nic-von-rupp",
  prizeDraws: [
    {
      id: "signed_board",
      title: "Win Signed Nic Von Rupp Surfboard",
      description: "Authenticated custom big wave gun signed by Nic after his Nazaré season",
      badge: "Ends Jan 15",
      icon: Trophy,
      iconBg: "from-amber-500 to-orange-600"
    },
    {
      id: "gear_pack",
      title: "Halo Surf Gear Pack",
      description: "Premium wetsuit, impact vest, and surf accessories curated by Halo",
      badge: "Monthly Draw",
      icon: Gift,
      iconBg: "from-green-500 to-emerald-600"
    },
    {
      id: "virtual_qa",
      title: "Virtual Q&A Access",
      description: "Join a platform-hosted live Q&A session with Nic and other fans",
      badge: "Next: Feb 2025",
      icon: Users,
      iconBg: "from-blue-500 to-indigo-600"
    },
    {
      id: "meetup_event",
      title: "Halo Surf Meetup Ticket",
      description: "Attend an exclusive Halo-organized surf event in Nazaré",
      badge: "Limited",
      icon: Star,
      iconBg: "from-purple-500 to-pink-600"
    }
  ],
  exclusiveContent: [
    {
      id: "wave_stats",
      title: "Nic's 2024 Big Wave Season Stats",
      description: "Wave heights, successful rides, and key performance metrics from the WSL Big Wave Tour",
      thumbnail: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop",
      type: "Stats",
      icon: TrendingUp
    },
    {
      id: "training_day",
      title: "A Day of Ocean Training",
      description: "Behind-the-scenes look at Nic's breath-hold and conditioning work",
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      type: "Video",
      icon: Play
    },
    {
      id: "photo_gallery",
      title: "Nazaré Season Gallery",
      description: "Exclusive photos from Nic's biggest waves at Praia do Norte",
      thumbnail: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop",
      type: "Gallery",
      icon: Image
    },
    {
      id: "wave_breakdown",
      title: "Big Wave Breakdown",
      description: "Analysis of Nic's approach to reading and riding giant waves",
      thumbnail: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop",
      type: "Analysis",
      icon: TrendingUp
    },
    {
      id: "portugal_moments",
      title: "Portuguese Coast Highlights",
      description: "Key moments from sessions along the Portuguese coastline",
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      type: "Highlights",
      icon: Play
    }
  ],
  discussionThreads: [
    {
      id: "swell_reactions",
      title: "Swell Reactions",
      description: "Discuss Nic's latest sessions, wave sizes, and standout rides",
      participants: 1247,
      lastActive: "2 hours ago"
    },
    {
      id: "swell_predictions",
      title: "Swell Predictions",
      description: "Share your predictions for upcoming big wave events and conditions",
      participants: 2134,
      lastActive: "30 min ago"
    },
    {
      id: "training_tips",
      title: "Training Tips (Fan to Fan)",
      description: "Exchange surf training advice, breath-hold techniques, and ocean conditioning",
      participants: 862,
      lastActive: "1 hour ago"
    },
    {
      id: "gear_talk",
      title: "Surf Gear Talk",
      description: "Discuss boards, wetsuits, safety equipment, and gear choices",
      participants: 623,
      lastActive: "45 min ago"
    }
  ]
};

export const nicTrainingData: AthleteTrainingSectionData = {
  athleteSlug: "nic-von-rupp",
  categories: [
    {
      id: "fitness",
      title: "Fitness",
      description: "Build the physical foundation for big wave surfing, including breath-hold, power, and ocean conditioning.",
      icon: <Dumbbell className="h-4 w-4" />,
      programs: [
        {
          id: "fitness-1",
          title: "Breath-Hold Training",
          description: "My breath-hold progression program for surviving long hold-downs in giant surf.",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop"
        },
        {
          id: "fitness-2",
          title: "Ocean Swimming Conditioning",
          description: "The swimming and paddling workouts I use to build endurance for heavy water.",
          image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=500&fit=crop"
        },
        {
          id: "fitness-3",
          title: "Explosive Power for Pop-Ups",
          description: "The strength and plyometric work that keeps my pop-up fast on critical drops.",
          image: "https://images.unsplash.com/photo-1531722569936-825d3dd91b15?w=800&h=500&fit=crop"
        },
        {
          id: "fitness-4",
          title: "Recovery and Mobility",
          description: "My mobility and recovery routine after heavy sessions to stay loose and injury-free.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop"
        }
      ]
    },
    {
      id: "skills",
      title: "Skills",
      description: "Technical sessions focused on big wave positioning, line selection, and survival.",
      icon: <Target className="h-4 w-4" />,
      programs: [
        {
          id: "skills-1",
          title: "Reading Big Wave Sets",
          description: "How I analyze swell direction, period, and lineup positioning for optimal wave selection.",
          image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=500&fit=crop"
        },
        {
          id: "skills-2",
          title: "Critical Drop Technique",
          description: "The mechanics of committing to steep drops and maintaining control on the way down.",
          image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=500&fit=crop"
        },
        {
          id: "skills-3",
          title: "Barrel Navigation",
          description: "Positioning and body mechanics for surviving inside giant barrels.",
          image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=500&fit=crop"
        },
        {
          id: "skills-4",
          title: "Safety and Rescue Protocols",
          description: "Jet ski coordination, inflation vest use, and survival techniques in heavy water.",
          image: "https://images.unsplash.com/photo-1531722569936-825d3dd91b15?w=800&h=500&fit=crop"
        }
      ]
    },
    {
      id: "nutrition",
      title: "Nutrition",
      description: "Fueling my body for long sessions, recovery, and peak ocean performance.",
      icon: <Apple className="h-4 w-4" />,
      programs: [
        {
          id: "nutrition-1",
          title: "Big Swell Day Fuel",
          description: "What I eat before, during, and after heavy sessions to maintain energy and focus.",
          image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop"
        },
        {
          id: "nutrition-2",
          title: "Training Block Nutrition",
          description: "The higher-calorie meal structure I follow during intense preparation phases.",
          image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop"
        },
        {
          id: "nutrition-3",
          title: "Travel and Competition Eating",
          description: "How I manage nutrition while traveling the world chasing swells.",
          image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop"
        },
        {
          id: "nutrition-4",
          title: "Hydration and Supplements",
          description: "My approach to staying hydrated in the ocean and the supplements I trust.",
          image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop"
        }
      ]
    },
    {
      id: "mental",
      title: "Mental",
      description: "Building the mindset to face fear, commit to giants, and perform under pressure.",
      icon: <Brain className="h-4 w-4" />,
      programs: [
        {
          id: "mental-1",
          title: "Pre-Swell Visualization",
          description: "How I mentally prepare in the days leading up to a massive swell event.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop"
        },
        {
          id: "mental-2",
          title: "Managing Fear on Giant Waves",
          description: "The techniques I use to stay calm and committed when dropping into the unknown.",
          image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=500&fit=crop"
        },
        {
          id: "mental-3",
          title: "Post-Wipeout Recovery",
          description: "Mental reset strategies after heavy hold-downs and near misses.",
          image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=500&fit=crop"
        },
        {
          id: "mental-4",
          title: "Flow State in Big Waves",
          description: "How I access deep focus and intuition when everything is on the line.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop"
        }
      ]
    }
  ]
};
