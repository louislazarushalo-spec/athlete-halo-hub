import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Dumbbell, Calendar, Target, Info, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { AthleteHeader } from "@/components/layout/AthleteHeader";

// Import all program images
import fitness1 from "@/assets/tommy-fitness-1.jpg";
import fitness2 from "@/assets/tommy-fitness-2.jpg";
import fitness3 from "@/assets/tommy-fitness-3.jpg";
import fitness4 from "@/assets/tommy-fitness-4.jpg";

// Program image mapping - using fitness images for all categories for now
const programImages: Record<string, string> = {
  "fitness-1": fitness1,
  "fitness-2": fitness2,
  "fitness-3": fitness3,
  "fitness-4": fitness4,
  "skills-1": fitness1,
  "skills-2": fitness2,
  "skills-3": fitness3,
  "skills-4": fitness4,
  "nutrition-1": fitness1,
  "nutrition-2": fitness2,
  "nutrition-3": fitness3,
  "nutrition-4": fitness4,
  "mental-1": fitness1,
  "mental-2": fitness2,
  "mental-3": fitness3,
  "mental-4": fitness4,
};

interface Exercise {
  name: string;
  equipment: string;
  thumbnail: string;
}

interface Week {
  number: number;
  title: string;
  focus: string;
  exercises: Exercise[];
}

interface ProgramData {
  title: string;
  description: string;
  category: string;
  stats: {
    duration: string;
    exercises: string;
    length: string;
  };
  equipment: string[];
  targetAreas: string[];
  weeks: Week[];
}

const programsData: Record<string, ProgramData> = {
  // ============================================
  // FITNESS PROGRAMS
  // ============================================
  "fitness-1": {
    title: "Golf-Specific Mobility",
    description: "A 4-week mobility program designed to maintain full range of motion and prevent injury throughout the season. The foundation for a pain-free, powerful golf swing.",
    category: "Fitness Program",
    stats: {
      duration: "20–30 min per session",
      exercises: "8–10",
      length: "4 weeks"
    },
    equipment: ["Foam roller", "Resistance bands", "Yoga mat", "Lacrosse ball"],
    targetAreas: ["Hip mobility", "Thoracic rotation", "Shoulder flexibility", "Ankle mobility"],
    weeks: [
      {
        number: 1,
        title: "Foundation Mobility",
        focus: "Establishing baseline flexibility and movement patterns",
        exercises: [
          { name: "Foam Roll Full Body", equipment: "Foam roller", thumbnail: "🧘" },
          { name: "Hip 90/90 Stretches", equipment: "Yoga mat", thumbnail: "🦵" },
          { name: "Thoracic Spine Rotations", equipment: "Foam roller", thumbnail: "🔄" },
          { name: "Shoulder Circles & Stretches", equipment: "Bands", thumbnail: "💫" },
          { name: "Ankle Mobility Drills", equipment: "Yoga mat", thumbnail: "👟" }
        ]
      },
      {
        number: 2,
        title: "Golf-Specific Patterns",
        focus: "Mobility patterns that mirror the golf swing",
        exercises: [
          { name: "Backswing Hip Loading", equipment: "Bands", thumbnail: "⛳" },
          { name: "Follow-Through Stretch", equipment: "Yoga mat", thumbnail: "🏌️" },
          { name: "Address Position Holds", equipment: "Yoga mat", thumbnail: "🎯" },
          { name: "Wrist & Forearm Mobility", equipment: "Lacrosse ball", thumbnail: "✋" },
          { name: "Spinal Wave Movements", equipment: "Yoga mat", thumbnail: "🐍" }
        ]
      },
      {
        number: 3,
        title: "Dynamic Flexibility",
        focus: "Active mobility and controlled movements",
        exercises: [
          { name: "World's Greatest Stretch", equipment: "Yoga mat", thumbnail: "🌍" },
          { name: "Leg Swings & Circles", equipment: "Bodyweight", thumbnail: "🔄" },
          { name: "Arm Circles & Shoulder Flow", equipment: "Bodyweight", thumbnail: "💫" },
          { name: "Rotation with Resistance", equipment: "Bands", thumbnail: "⚡" },
          { name: "Active Hip Openers", equipment: "Yoga mat", thumbnail: "🦵" }
        ]
      },
      {
        number: 4,
        title: "Pre-Round Integration",
        focus: "Complete warm-up routine for tournament golf",
        exercises: [
          { name: "5-Minute Wake-Up Flow", equipment: "Yoga mat", thumbnail: "☀️" },
          { name: "Range Warm-Up Sequence", equipment: "Bodyweight", thumbnail: "🏌️" },
          { name: "First Tee Prep Routine", equipment: "Bodyweight", thumbnail: "⛳" },
          { name: "Between-Holes Stretches", equipment: "Bodyweight", thumbnail: "🔄" },
          { name: "Post-Round Recovery", equipment: "Foam roller", thumbnail: "😴" }
        ]
      }
    ]
  },
  "fitness-2": {
    title: "Rotational Power Training",
    description: "A 4-week strength program designed to generate clubhead speed and distance off the tee. Build the explosive rotational power that separates tour players from amateurs.",
    category: "Fitness Program",
    stats: {
      duration: "45–60 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Dumbbells", "Medicine ball", "Resistance bands", "Cable machine"],
    targetAreas: ["Core rotation", "Hip power", "Shoulder stability", "Glute activation"],
    weeks: [
      {
        number: 1,
        title: "Core Activation & Stability",
        focus: "Building foundational core strength and rotation patterns",
        exercises: [
          { name: "Dead Bug with Rotation", equipment: "Bodyweight", thumbnail: "🏋️" },
          { name: "Pallof Press Hold", equipment: "Bands", thumbnail: "💪" },
          { name: "Medicine Ball Side Throw", equipment: "Medicine ball", thumbnail: "🎾" },
          { name: "Bird Dog with Reach", equipment: "Bodyweight", thumbnail: "🧘" },
          { name: "Rotational Plank", equipment: "Bodyweight", thumbnail: "🔥" }
        ]
      },
      {
        number: 2,
        title: "Power Development",
        focus: "Increasing resistance and movement velocity",
        exercises: [
          { name: "Rotational Band Pull", equipment: "Bands", thumbnail: "💪" },
          { name: "Weighted Russian Twist", equipment: "Dumbbells", thumbnail: "🏋️" },
          { name: "Medicine Ball Slam (Rotational)", equipment: "Medicine ball", thumbnail: "💥" },
          { name: "Landmine Rotation Press", equipment: "Barbell", thumbnail: "⚡" },
          { name: "Cable Woodchop", equipment: "Cable machine", thumbnail: "⛳" }
        ]
      },
      {
        number: 3,
        title: "Explosive Rotational Power",
        focus: "Maximum power output for swing speed",
        exercises: [
          { name: "Rotational Box Jump", equipment: "Plyo box", thumbnail: "🚀" },
          { name: "Medicine Ball Shotput Throw", equipment: "Medicine ball", thumbnail: "💪" },
          { name: "Explosive Cable Rotation", equipment: "Cable machine", thumbnail: "⚡" },
          { name: "Jumping Lunge with Twist", equipment: "Bodyweight", thumbnail: "🔥" },
          { name: "Speed Rotational Slams", equipment: "Medicine ball", thumbnail: "💥" }
        ]
      },
      {
        number: 4,
        title: "Golf-Specific Integration",
        focus: "Translating power to the golf swing",
        exercises: [
          { name: "Backswing Power Rotation", equipment: "Bands", thumbnail: "🏌️" },
          { name: "Downswing Explosive Pull", equipment: "Cable machine", thumbnail: "⛳" },
          { name: "Split-Stance Rotational Throw", equipment: "Medicine ball", thumbnail: "💪" },
          { name: "Address to Impact Simulation", equipment: "Bands", thumbnail: "⚡" },
          { name: "Full Swing Power Sequence", equipment: "Medicine ball", thumbnail: "🏆" }
        ]
      }
    ]
  },
  "fitness-3": {
    title: "Walking Endurance Protocol",
    description: "A 4-week program designed to build the stamina to stay sharp through 4 rounds of championship golf. Walking 18 holes is more demanding than most realize.",
    category: "Fitness Program",
    stats: {
      duration: "45–90 min per session",
      exercises: "5–7",
      length: "4 weeks"
    },
    equipment: ["Walking shoes", "Heart rate monitor", "Resistance bands"],
    targetAreas: ["Cardiovascular endurance", "Leg stamina", "Mental focus", "Energy management"],
    weeks: [
      {
        number: 1,
        title: "Aerobic Base Building",
        focus: "Establishing cardiovascular foundation",
        exercises: [
          { name: "Continuous Walking (45 min)", equipment: "Walking shoes", thumbnail: "🚶" },
          { name: "Light Interval Walking", equipment: "Walking shoes", thumbnail: "⚡" },
          { name: "Hill Walking Introduction", equipment: "Walking shoes", thumbnail: "⛰️" },
          { name: "Breathing Control Practice", equipment: "Bodyweight", thumbnail: "🧘" },
          { name: "Active Recovery Walks", equipment: "Walking shoes", thumbnail: "🔄" }
        ]
      },
      {
        number: 2,
        title: "Course Simulation",
        focus: "Mimicking tournament walking demands",
        exercises: [
          { name: "18-Hole Distance Walk", equipment: "Walking shoes", thumbnail: "⛳" },
          { name: "Variable Terrain Training", equipment: "Walking shoes", thumbnail: "🏔️" },
          { name: "Walk-Stop-Walk Intervals", equipment: "Walking shoes", thumbnail: "⏱️" },
          { name: "Carry Bag Simulation", equipment: "Weighted pack", thumbnail: "🎒" },
          { name: "Focus During Fatigue", equipment: "Mental", thumbnail: "🧠" }
        ]
      },
      {
        number: 3,
        title: "Leg Strength Endurance",
        focus: "Building leg stamina for walking",
        exercises: [
          { name: "Walking Lunges", equipment: "Bodyweight", thumbnail: "🦵" },
          { name: "Step-Up Endurance", equipment: "Step", thumbnail: "📈" },
          { name: "Calf Raises (High Rep)", equipment: "Bodyweight", thumbnail: "👟" },
          { name: "Single-Leg Balance Work", equipment: "Bodyweight", thumbnail: "⚖️" },
          { name: "Extended Uphill Walking", equipment: "Walking shoes", thumbnail: "⛰️" }
        ]
      },
      {
        number: 4,
        title: "Tournament Simulation",
        focus: "Race-day readiness for 4-day events",
        exercises: [
          { name: "Back-to-Back Long Walks", equipment: "Walking shoes", thumbnail: "🏆" },
          { name: "Early Morning Sessions", equipment: "Walking shoes", thumbnail: "☀️" },
          { name: "Mental Sharpness Under Fatigue", equipment: "Mental", thumbnail: "🧠" },
          { name: "Recovery Between Rounds", equipment: "Foam roller", thumbnail: "🔄" },
          { name: "Championship Week Simulation", equipment: "Full gear", thumbnail: "🏅" }
        ]
      }
    ]
  },
  "fitness-4": {
    title: "Core Stability for Ball Striking",
    description: "A 4-week program focused on the core stability that underpins consistent contact. The foundation of repeatable, powerful ball striking.",
    category: "Fitness Program",
    stats: {
      duration: "30–45 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Yoga mat", "Stability ball", "Resistance bands", "Medicine ball"],
    targetAreas: ["Core stability", "Anti-rotation", "Balance", "Posture"],
    weeks: [
      {
        number: 1,
        title: "Foundation Stability",
        focus: "Building baseline core control",
        exercises: [
          { name: "Dead Bug Progressions", equipment: "Yoga mat", thumbnail: "🐛" },
          { name: "Plank Variations", equipment: "Yoga mat", thumbnail: "💪" },
          { name: "Bird Dog Holds", equipment: "Yoga mat", thumbnail: "🐕" },
          { name: "Glute Bridge Series", equipment: "Yoga mat", thumbnail: "🍑" },
          { name: "Hollow Body Holds", equipment: "Yoga mat", thumbnail: "🧘" }
        ]
      },
      {
        number: 2,
        title: "Anti-Rotation Training",
        focus: "Resisting rotation for swing control",
        exercises: [
          { name: "Pallof Press (All Directions)", equipment: "Bands", thumbnail: "⚡" },
          { name: "Single-Arm Farmer Carry", equipment: "Dumbbell", thumbnail: "🏋️" },
          { name: "Side Plank with Reach", equipment: "Yoga mat", thumbnail: "➡️" },
          { name: "Anti-Rotation Chops", equipment: "Cable/Bands", thumbnail: "🔄" },
          { name: "Stir the Pot", equipment: "Stability ball", thumbnail: "🥣" }
        ]
      },
      {
        number: 3,
        title: "Dynamic Core Control",
        focus: "Maintaining stability during movement",
        exercises: [
          { name: "Cable Rotation Holds", equipment: "Cable machine", thumbnail: "💪" },
          { name: "Medicine Ball Circles", equipment: "Medicine ball", thumbnail: "⭕" },
          { name: "Stability Ball Pike", equipment: "Stability ball", thumbnail: "🎯" },
          { name: "Turkish Get-Up (Light)", equipment: "Kettlebell", thumbnail: "🏋️" },
          { name: "Bear Crawl Patterns", equipment: "Bodyweight", thumbnail: "🐻" }
        ]
      },
      {
        number: 4,
        title: "Swing Integration",
        focus: "Core stability in golf-specific positions",
        exercises: [
          { name: "Address Position Core Holds", equipment: "Bands", thumbnail: "⛳" },
          { name: "Backswing Stability Drill", equipment: "Bands", thumbnail: "🏌️" },
          { name: "Impact Position Holds", equipment: "Bands", thumbnail: "💥" },
          { name: "Balance Board Swings", equipment: "Balance board", thumbnail: "⚖️" },
          { name: "Full Swing with Band Resistance", equipment: "Bands", thumbnail: "🏆" }
        ]
      }
    ]
  },

  // ============================================
  // SKILLS PROGRAMS
  // ============================================
  "skills-1": {
    title: "Iron Play Precision",
    description: "A 4-week program designed to develop the consistency, timing, and technique needed for tour-level iron shots. Build the ball-striking foundation that allows you to attack pins and control trajectory.",
    category: "Skills Program",
    stats: {
      duration: "60–90 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Irons (6-PW)", "Range balls", "Alignment sticks", "Impact bag"],
    targetAreas: ["Ball striking", "Trajectory control", "Distance consistency", "Spin management"],
    weeks: [
      {
        number: 1,
        title: "Foundation & Setup",
        focus: "Building consistent setup and ball position for pure contact",
        exercises: [
          { name: "Address Position Fundamentals", equipment: "Alignment sticks", thumbnail: "⛳" },
          { name: "Ball Position Mapping", equipment: "Irons", thumbnail: "🎯" },
          { name: "Weight Distribution Drills", equipment: "Bodyweight", thumbnail: "⚖️" },
          { name: "Grip Pressure Awareness", equipment: "Irons", thumbnail: "✋" },
          { name: "Pre-Shot Routine Development", equipment: "All clubs", thumbnail: "🧠" },
          { name: "Static Impact Position Holds", equipment: "Impact bag", thumbnail: "💪" }
        ]
      },
      {
        number: 2,
        title: "Contact Quality",
        focus: "Developing center-face contact and compression",
        exercises: [
          { name: "Strike Location Feedback", equipment: "Impact tape", thumbnail: "🎯" },
          { name: "Half-Swing Compression Drills", equipment: "7-iron", thumbnail: "⚡" },
          { name: "Descending Blow Practice", equipment: "Alignment sticks", thumbnail: "📐" },
          { name: "Divot Pattern Analysis", equipment: "Practice range", thumbnail: "👁️" },
          { name: "Slow Motion Impact Training", equipment: "Irons", thumbnail: "🐢" },
          { name: "Punch Shot Sequences", equipment: "8-iron", thumbnail: "💥" }
        ]
      },
      {
        number: 3,
        title: "Trajectory & Distance Control",
        focus: "Managing ball flight and yardage gaps",
        exercises: [
          { name: "Low-Mid-High Shot Ladder", equipment: "7-iron", thumbnail: "📊" },
          { name: "Three-Quarter Swing Calibration", equipment: "All irons", thumbnail: "⚙️" },
          { name: "Wind Adjustment Practice", equipment: "Irons", thumbnail: "💨" },
          { name: "Yardage Gap Testing", equipment: "All irons", thumbnail: "📏" },
          { name: "Fade & Draw Shaping", equipment: "6-iron", thumbnail: "↗️" },
          { name: "Knockdown Shot Mastery", equipment: "8-iron", thumbnail: "⬇️" }
        ]
      },
      {
        number: 4,
        title: "Course Application",
        focus: "Translating range work to on-course performance",
        exercises: [
          { name: "Pin Attack Simulations", equipment: "Irons", thumbnail: "🏆" },
          { name: "Variable Lie Practice", equipment: "Practice area", thumbnail: "⛳" },
          { name: "Pressure Shot Scenarios", equipment: "Irons", thumbnail: "💪" },
          { name: "First-Shot Execution", equipment: "All irons", thumbnail: "1️⃣" },
          { name: "18-Hole Simulation Round", equipment: "Full bag", thumbnail: "🎯" }
        ]
      }
    ]
  },
  "skills-2": {
    title: "Short Game Secrets",
    description: "A 4-week deep dive into chipping, pitching, and bunker play. Learn the techniques I use to get up and down from anywhere and save strokes around the green.",
    category: "Skills Program",
    stats: {
      duration: "45–60 min per session",
      exercises: "8–10",
      length: "4 weeks"
    },
    equipment: ["Wedges (52°, 56°, 60°)", "Chipping net", "Bunker", "Practice green"],
    targetAreas: ["Chipping technique", "Pitch shot variety", "Bunker play", "Distance control"],
    weeks: [
      {
        number: 1,
        title: "Chipping Fundamentals",
        focus: "Building a reliable, repeatable chip technique",
        exercises: [
          { name: "Bump & Run Basics", equipment: "52° wedge", thumbnail: "⛳" },
          { name: "Club Selection Strategy", equipment: "All wedges", thumbnail: "🎯" },
          { name: "Landing Spot Focus", equipment: "Practice green", thumbnail: "👁️" },
          { name: "Hands-Forward Contact", equipment: "56° wedge", thumbnail: "✋" },
          { name: "One-Lever Chipping Drill", equipment: "Wedges", thumbnail: "📐" },
          { name: "Roll-Out Prediction Practice", equipment: "Practice green", thumbnail: "🔮" }
        ]
      },
      {
        number: 2,
        title: "Pitch Shot Mastery",
        focus: "Developing variety and touch on pitch shots",
        exercises: [
          { name: "30-50-70 Yard Calibration", equipment: "56° wedge", thumbnail: "📏" },
          { name: "High Soft Landing Practice", equipment: "60° wedge", thumbnail: "⬆️" },
          { name: "Low Running Pitch", equipment: "52° wedge", thumbnail: "⬇️" },
          { name: "Clock Face Distance Control", equipment: "All wedges", thumbnail: "🕐" },
          { name: "Spin Rate Management", equipment: "Practice green", thumbnail: "🔄" },
          { name: "Awkward Lie Adaptations", equipment: "Wedges", thumbnail: "⚡" }
        ]
      },
      {
        number: 3,
        title: "Bunker Expertise",
        focus: "Conquering greenside sand with confidence",
        exercises: [
          { name: "Explosion Shot Technique", equipment: "56° wedge", thumbnail: "💥" },
          { name: "Open Face Fundamentals", equipment: "60° wedge", thumbnail: "📐" },
          { name: "Sand Depth Control", equipment: "Bunker", thumbnail: "🏖️" },
          { name: "Uphill & Downhill Lies", equipment: "Bunker", thumbnail: "⛰️" },
          { name: "Long Bunker Shot Practice", equipment: "52° wedge", thumbnail: "📏" },
          { name: "Buried Lie Recovery", equipment: "56° wedge", thumbnail: "🔥" }
        ]
      },
      {
        number: 4,
        title: "Scoring Zone Integration",
        focus: "Putting it all together for lower scores",
        exercises: [
          { name: "Up & Down Challenges", equipment: "Full wedge set", thumbnail: "🏆" },
          { name: "Random Lie Practice", equipment: "Practice area", thumbnail: "🎲" },
          { name: "Pressure Putting After Chip", equipment: "Putter + wedges", thumbnail: "💪" },
          { name: "9-Hole Short Game Scramble", equipment: "Full short game set", thumbnail: "⛳" },
          { name: "Competition Scoring Drills", equipment: "All equipment", thumbnail: "🎯" }
        ]
      }
    ]
  },
  "skills-3": {
    title: "Putting Masterclass",
    description: "A 4-week program to transform your putting. Learn to read greens, develop a repeatable stroke, and drain more putts under pressure. The fastest way to lower your scores.",
    category: "Skills Program",
    stats: {
      duration: "30–45 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Putter", "Practice green", "Putting mirror", "Alignment aids"],
    targetAreas: ["Green reading", "Stroke mechanics", "Speed control", "Pressure putting"],
    weeks: [
      {
        number: 1,
        title: "Stroke Fundamentals",
        focus: "Building a mechanically sound, repeatable stroke",
        exercises: [
          { name: "Grip & Setup Assessment", equipment: "Putting mirror", thumbnail: "👁️" },
          { name: "Eye Line Positioning", equipment: "Mirror", thumbnail: "👀" },
          { name: "Pendulum Motion Development", equipment: "Putter", thumbnail: "🔄" },
          { name: "Face Angle Control", equipment: "Alignment aids", thumbnail: "📐" },
          { name: "Tempo & Rhythm Drills", equipment: "Putter", thumbnail: "🎵" },
          { name: "Impact Quality Focus", equipment: "Practice green", thumbnail: "💥" }
        ]
      },
      {
        number: 2,
        title: "Speed Control",
        focus: "Mastering distance control on all putts",
        exercises: [
          { name: "Lag Putt Ladders", equipment: "Practice green", thumbnail: "📏" },
          { name: "Gate Speed Drill", equipment: "Tees", thumbnail: "⛳" },
          { name: "Uphill/Downhill Feel", equipment: "Practice green", thumbnail: "⛰️" },
          { name: "Die vs. Ram Speed Practice", equipment: "Putter", thumbnail: "💨" },
          { name: "Eyes Closed Distance Feel", equipment: "Practice green", thumbnail: "🙈" },
          { name: "30-Footer Touch Development", equipment: "Practice green", thumbnail: "🎯" }
        ]
      },
      {
        number: 3,
        title: "Green Reading Mastery",
        focus: "Learning to see and trust the correct line",
        exercises: [
          { name: "Fall Line Identification", equipment: "Practice green", thumbnail: "📐" },
          { name: "Low Point Reading", equipment: "Practice green", thumbnail: "👁️" },
          { name: "Grain Effect Understanding", equipment: "Practice green", thumbnail: "🌿" },
          { name: "Break Visualization Drills", equipment: "Putter", thumbnail: "🧠" },
          { name: "AimPoint Fundamentals", equipment: "Hands", thumbnail: "☝️" },
          { name: "Commit & Execute Practice", equipment: "Practice green", thumbnail: "✅" }
        ]
      },
      {
        number: 4,
        title: "Pressure Performance",
        focus: "Putting your best when it matters most",
        exercises: [
          { name: "3-Foot Circle Mastery", equipment: "Practice green", thumbnail: "🏆" },
          { name: "Make 10 in a Row Challenge", equipment: "Putter", thumbnail: "🔥" },
          { name: "First Putt Focus Drill", equipment: "Practice green", thumbnail: "1️⃣" },
          { name: "Competition Putting Games", equipment: "Practice green", thumbnail: "🎮" },
          { name: "Pre-Round Routine Practice", equipment: "All equipment", thumbnail: "📋" }
        ]
      }
    ]
  },
  "skills-4": {
    title: "Driver Control",
    description: "A 4-week program focused on finding fairways consistently. Master the techniques for reliable tee shots that set up scoring opportunities.",
    category: "Skills Program",
    stats: {
      duration: "60–75 min per session",
      exercises: "5–6",
      length: "4 weeks"
    },
    equipment: ["Driver", "3-wood", "Range balls", "Alignment sticks", "Launch monitor (optional)"],
    targetAreas: ["Accuracy", "Consistency", "Shot shaping", "Course management"],
    weeks: [
      {
        number: 1,
        title: "Fundamentals & Setup",
        focus: "Building a reliable driver setup",
        exercises: [
          { name: "Tee Height Optimization", equipment: "Driver", thumbnail: "⛳" },
          { name: "Ball Position Mapping", equipment: "Alignment sticks", thumbnail: "🎯" },
          { name: "Stance Width & Alignment", equipment: "Alignment sticks", thumbnail: "📐" },
          { name: "Grip Pressure Control", equipment: "Driver", thumbnail: "✋" },
          { name: "Pre-Shot Routine Development", equipment: "Driver", thumbnail: "🧠" }
        ]
      },
      {
        number: 2,
        title: "Contact & Launch",
        focus: "Optimizing strike location and launch conditions",
        exercises: [
          { name: "Center-Face Contact Drills", equipment: "Impact tape", thumbnail: "🎯" },
          { name: "Launch Angle Awareness", equipment: "Driver", thumbnail: "📈" },
          { name: "Swing Path Control", equipment: "Alignment sticks", thumbnail: "↗️" },
          { name: "Tempo & Timing Work", equipment: "Driver", thumbnail: "🎵" },
          { name: "3-Wood Consistency", equipment: "3-wood", thumbnail: "🏌️" }
        ]
      },
      {
        number: 3,
        title: "Shot Shaping",
        focus: "Controlling ball flight for any situation",
        exercises: [
          { name: "Stock Fade Development", equipment: "Driver", thumbnail: "↗️" },
          { name: "Stock Draw Development", equipment: "Driver", thumbnail: "↖️" },
          { name: "Low Stinger Practice", equipment: "3-wood", thumbnail: "⬇️" },
          { name: "High Bomb for Soft Landing", equipment: "Driver", thumbnail: "⬆️" },
          { name: "Wind Strategy Shots", equipment: "Driver", thumbnail: "💨" }
        ]
      },
      {
        number: 4,
        title: "Course Strategy",
        focus: "Smart tee shot decisions for scoring",
        exercises: [
          { name: "Target Selection Practice", equipment: "Driver", thumbnail: "🎯" },
          { name: "Miss Pattern Management", equipment: "Driver", thumbnail: "📊" },
          { name: "Pressure Tee Shots", equipment: "Driver", thumbnail: "💪" },
          { name: "First Tee Execution", equipment: "Driver", thumbnail: "1️⃣" },
          { name: "18-Hole Strategy Session", equipment: "Full bag", thumbnail: "🏆" }
        ]
      }
    ]
  },

  // ============================================
  // NUTRITION PROGRAMS
  // ============================================
  "nutrition-1": {
    title: "Tournament Week Fuel",
    description: "A complete guide to what I eat before, during, and after rounds to maintain focus and energy. Optimize your nutrition for peak performance on competition days.",
    category: "Nutrition Program",
    stats: {
      duration: "Full day plan",
      exercises: "5 meal windows",
      length: "Ongoing"
    },
    equipment: ["Kitchen access", "Meal prep containers", "Hydration bottles"],
    targetAreas: ["Pre-round energy", "On-course fueling", "Post-round recovery", "Hydration"],
    weeks: [
      {
        number: 1,
        title: "Pre-Round Nutrition",
        focus: "Fueling 2-3 hours before tee time",
        exercises: [
          { name: "Tournament Breakfast Options", equipment: "Kitchen", thumbnail: "🥣" },
          { name: "Timing Your Last Meal", equipment: "Clock", thumbnail: "⏰" },
          { name: "Hydration Start Protocol", equipment: "Water bottle", thumbnail: "💧" },
          { name: "Pre-Round Snack Options", equipment: "Kitchen", thumbnail: "🍌" },
          { name: "Avoiding Digestive Issues", equipment: "Kitchen", thumbnail: "✅" }
        ]
      },
      {
        number: 2,
        title: "On-Course Nutrition",
        focus: "Maintaining energy through 18 holes",
        exercises: [
          { name: "Portable Snack Selection", equipment: "Golf bag", thumbnail: "🥪" },
          { name: "Timing Energy Intake", equipment: "Course", thumbnail: "⏱️" },
          { name: "Blood Sugar Management", equipment: "Snacks", thumbnail: "📈" },
          { name: "Hydration During Play", equipment: "Bottles", thumbnail: "💧" },
          { name: "Avoiding Energy Crashes", equipment: "Planning", thumbnail: "⚡" }
        ]
      },
      {
        number: 3,
        title: "Post-Round Recovery",
        focus: "Refueling for the next day",
        exercises: [
          { name: "Immediate Post-Round Snack", equipment: "Clubhouse", thumbnail: "🍎" },
          { name: "Recovery Meal Planning", equipment: "Kitchen", thumbnail: "🍽️" },
          { name: "Protein for Muscle Recovery", equipment: "Kitchen", thumbnail: "🥩" },
          { name: "Anti-Inflammatory Foods", equipment: "Kitchen", thumbnail: "🥗" },
          { name: "Sleep-Promoting Evening Meal", equipment: "Kitchen", thumbnail: "😴" }
        ]
      },
      {
        number: 4,
        title: "4-Day Event Planning",
        focus: "Nutrition strategy for major championships",
        exercises: [
          { name: "Weekly Meal Prep", equipment: "Kitchen", thumbnail: "📋" },
          { name: "Hotel Room Solutions", equipment: "Portable items", thumbnail: "🏨" },
          { name: "Restaurant Strategy", equipment: "Menu knowledge", thumbnail: "🍽️" },
          { name: "Energy Management Day-to-Day", equipment: "Planning", thumbnail: "📊" },
          { name: "Championship Sunday Fuel", equipment: "Full prep", thumbnail: "🏆" }
        ]
      }
    ]
  },
  "nutrition-2": {
    title: "On-Course Nutrition",
    description: "Managing energy levels during a 5-hour round with the right snacks and hydration. The difference between fading on the back nine and finishing strong.",
    category: "Nutrition Program",
    stats: {
      duration: "During round",
      exercises: "5–6 checkpoints",
      length: "Every round"
    },
    equipment: ["Golf bag cooler", "Water bottles", "Portable snacks"],
    targetAreas: ["Sustained energy", "Mental focus", "Hydration", "Blood sugar stability"],
    weeks: [
      {
        number: 1,
        title: "Understanding Energy Needs",
        focus: "How golf depletes your body",
        exercises: [
          { name: "Calorie Expenditure Awareness", equipment: "Knowledge", thumbnail: "🔥" },
          { name: "Mental Energy Demands", equipment: "Knowledge", thumbnail: "🧠" },
          { name: "Weather Impact on Needs", equipment: "Knowledge", thumbnail: "☀️" },
          { name: "Personal Energy Mapping", equipment: "Journal", thumbnail: "📓" },
          { name: "Identifying Your Weak Holes", equipment: "Analysis", thumbnail: "📊" }
        ]
      },
      {
        number: 2,
        title: "Snack Selection",
        focus: "Choosing the right on-course foods",
        exercises: [
          { name: "Complex Carb Options", equipment: "Snacks", thumbnail: "🥖" },
          { name: "Protein-Rich Portables", equipment: "Snacks", thumbnail: "🥜" },
          { name: "Quick Energy Foods", equipment: "Snacks", thumbnail: "🍌" },
          { name: "Avoiding Heavy Foods", equipment: "Knowledge", thumbnail: "❌" },
          { name: "Building Your Bag Kit", equipment: "Golf bag", thumbnail: "🎒" }
        ]
      },
      {
        number: 3,
        title: "Timing & Strategy",
        focus: "When to eat and drink",
        exercises: [
          { name: "Every 3-Hole Check-In", equipment: "Watch", thumbnail: "⏰" },
          { name: "Par-5 Fueling Opportunities", equipment: "Course", thumbnail: "⛳" },
          { name: "Turn Hydration Boost", equipment: "Clubhouse", thumbnail: "💧" },
          { name: "Back Nine Energy Protocol", equipment: "Snacks", thumbnail: "📈" },
          { name: "Clutch Hole Preparation", equipment: "Planning", thumbnail: "💪" }
        ]
      },
      {
        number: 4,
        title: "Hydration Mastery",
        focus: "Staying properly hydrated throughout",
        exercises: [
          { name: "Pre-Round Hydration Loading", equipment: "Bottles", thumbnail: "💧" },
          { name: "Electrolyte Balance", equipment: "Sports drinks", thumbnail: "⚡" },
          { name: "Weather-Adjusted Intake", equipment: "Planning", thumbnail: "☀️" },
          { name: "Avoiding Over-Hydration", equipment: "Knowledge", thumbnail: "⚖️" },
          { name: "Signs of Dehydration", equipment: "Awareness", thumbnail: "⚠️" }
        ]
      }
    ]
  },
  "nutrition-3": {
    title: "Travel & Jet Lag Recovery",
    description: "How I manage nutrition across time zones and international tournaments. Essential for any golfer competing on a global schedule.",
    category: "Nutrition Program",
    stats: {
      duration: "Travel days",
      exercises: "5 strategies",
      length: "Ongoing"
    },
    equipment: ["Portable snacks", "Water bottle", "Supplements"],
    targetAreas: ["Jet lag management", "Digestive health", "Energy consistency", "Sleep quality"],
    weeks: [
      {
        number: 1,
        title: "Pre-Travel Preparation",
        focus: "Setting up for success before you leave",
        exercises: [
          { name: "Adjusting Sleep Schedule", equipment: "Planning", thumbnail: "😴" },
          { name: "Packing Healthy Snacks", equipment: "Snacks", thumbnail: "🎒" },
          { name: "Hydration Pre-Loading", equipment: "Bottles", thumbnail: "💧" },
          { name: "Researching Destination Food", equipment: "Research", thumbnail: "🔍" },
          { name: "Supplement Preparation", equipment: "Supplements", thumbnail: "💊" }
        ]
      },
      {
        number: 2,
        title: "In-Flight Nutrition",
        focus: "Eating and drinking on long flights",
        exercises: [
          { name: "Avoiding Airline Food Traps", equipment: "Knowledge", thumbnail: "❌" },
          { name: "Healthy Carry-On Snacks", equipment: "Snacks", thumbnail: "🥜" },
          { name: "Hydration During Flight", equipment: "Bottles", thumbnail: "💧" },
          { name: "Caffeine & Alcohol Strategy", equipment: "Planning", thumbnail: "☕" },
          { name: "Movement & Digestion", equipment: "Bodyweight", thumbnail: "🚶" }
        ]
      },
      {
        number: 3,
        title: "Arrival Adaptation",
        focus: "First 48 hours in a new timezone",
        exercises: [
          { name: "Meal Timing Adjustment", equipment: "Clock", thumbnail: "⏰" },
          { name: "Light Exposure & Eating", equipment: "Sunlight", thumbnail: "☀️" },
          { name: "Local Food Selection", equipment: "Restaurants", thumbnail: "🍽️" },
          { name: "Digestive Reset Protocol", equipment: "Kitchen", thumbnail: "🥗" },
          { name: "Sleep Support Foods", equipment: "Kitchen", thumbnail: "😴" }
        ]
      },
      {
        number: 4,
        title: "Maintaining Performance",
        focus: "Staying sharp across multiple time zones",
        exercises: [
          { name: "Consistent Eating Windows", equipment: "Planning", thumbnail: "📅" },
          { name: "Energy-Boosting Meals", equipment: "Kitchen", thumbnail: "⚡" },
          { name: "Avoiding GI Issues Abroad", equipment: "Knowledge", thumbnail: "✅" },
          { name: "Return Travel Preparation", equipment: "Planning", thumbnail: "✈️" },
          { name: "Long-Term Schedule Management", equipment: "Calendar", thumbnail: "📆" }
        ]
      }
    ]
  },
  "nutrition-4": {
    title: "Off-Season Recovery Eating",
    description: "The nutrition approach I use during training blocks and rest periods. Building strength, allowing recovery, and preparing for the next season.",
    category: "Nutrition Program",
    stats: {
      duration: "Off-season",
      exercises: "5 focus areas",
      length: "8–12 weeks"
    },
    equipment: ["Kitchen access", "Meal prep containers", "Scale"],
    targetAreas: ["Muscle building", "Recovery", "Body composition", "Energy balance"],
    weeks: [
      {
        number: 1,
        title: "Recovery Phase Nutrition",
        focus: "Allowing your body to recover from the season",
        exercises: [
          { name: "Calorie Adjustment", equipment: "Planning", thumbnail: "📊" },
          { name: "Anti-Inflammatory Focus", equipment: "Kitchen", thumbnail: "🥗" },
          { name: "Sleep Support Nutrition", equipment: "Kitchen", thumbnail: "😴" },
          { name: "Gut Health Reset", equipment: "Kitchen", thumbnail: "🦠" },
          { name: "Stress Reduction Foods", equipment: "Kitchen", thumbnail: "🧘" }
        ]
      },
      {
        number: 2,
        title: "Building Phase Nutrition",
        focus: "Fueling strength and fitness gains",
        exercises: [
          { name: "Protein Timing Strategy", equipment: "Kitchen", thumbnail: "🥩" },
          { name: "Carb Cycling Basics", equipment: "Planning", thumbnail: "🍞" },
          { name: "Training Day vs. Rest Day", equipment: "Planning", thumbnail: "📅" },
          { name: "Supplement Protocol", equipment: "Supplements", thumbnail: "💊" },
          { name: "Tracking Progress", equipment: "Scale/Journal", thumbnail: "📈" }
        ]
      },
      {
        number: 3,
        title: "Body Composition",
        focus: "Optimizing weight for performance",
        exercises: [
          { name: "Finding Your Optimal Weight", equipment: "Analysis", thumbnail: "⚖️" },
          { name: "Lean Mass Preservation", equipment: "Kitchen", thumbnail: "💪" },
          { name: "Sustainable Eating Habits", equipment: "Planning", thumbnail: "✅" },
          { name: "Meal Prep Mastery", equipment: "Kitchen", thumbnail: "🍱" },
          { name: "Flexibility & Enjoyment", equipment: "Balance", thumbnail: "🎉" }
        ]
      },
      {
        number: 4,
        title: "Pre-Season Transition",
        focus: "Preparing for competition nutrition",
        exercises: [
          { name: "Testing Tournament Meals", equipment: "Kitchen", thumbnail: "🧪" },
          { name: "Dialing In Timing", equipment: "Planning", thumbnail: "⏰" },
          { name: "Travel Prep Nutrition", equipment: "Planning", thumbnail: "✈️" },
          { name: "Competition Weight Target", equipment: "Scale", thumbnail: "🎯" },
          { name: "Mental Prep Through Nutrition", equipment: "Knowledge", thumbnail: "🧠" }
        ]
      }
    ]
  },

  // ============================================
  // MENTAL PROGRAMS
  // ============================================
  "mental-1": {
    title: "Pre-Round Focus Routine",
    description: "What I do on the range and practice green to lock in mentally before teeing off. A consistent pre-round routine is the foundation of confident golf.",
    category: "Mental Program",
    stats: {
      duration: "60–90 min pre-round",
      exercises: "5 phases",
      length: "Every round"
    },
    equipment: ["Full bag", "Practice facility", "Notebook"],
    targetAreas: ["Focus", "Confidence", "Visualization", "Routine consistency"],
    weeks: [
      {
        number: 1,
        title: "Morning Preparation",
        focus: "Setting up your day for success",
        exercises: [
          { name: "Wake-Up Routine", equipment: "Hotel/home", thumbnail: "☀️" },
          { name: "Breakfast & Mindset", equipment: "Kitchen", thumbnail: "🥣" },
          { name: "Intention Setting", equipment: "Notebook", thumbnail: "📝" },
          { name: "Visualization Preview", equipment: "Mental", thumbnail: "🧠" },
          { name: "Travel to Course Routine", equipment: "Car", thumbnail: "🚗" }
        ]
      },
      {
        number: 2,
        title: "Range Warm-Up",
        focus: "Technical preparation with purpose",
        exercises: [
          { name: "Dynamic Stretching Routine", equipment: "Bodyweight", thumbnail: "🧘" },
          { name: "Short to Long Club Progression", equipment: "Full bag", thumbnail: "📈" },
          { name: "Stock Shot Confirmation", equipment: "All clubs", thumbnail: "✅" },
          { name: "Shot Shape Check", equipment: "Irons/woods", thumbnail: "↗️" },
          { name: "Finishing with Confidence", equipment: "Driver", thumbnail: "💪" }
        ]
      },
      {
        number: 3,
        title: "Short Game Prep",
        focus: "Building touch and feel",
        exercises: [
          { name: "Putting Green Speed Read", equipment: "Putter", thumbnail: "🏌️" },
          { name: "Distance Control Drills", equipment: "Putter", thumbnail: "📏" },
          { name: "Chipping Touch Development", equipment: "Wedges", thumbnail: "🎯" },
          { name: "Bunker Feel Check", equipment: "Sand wedge", thumbnail: "🏖️" },
          { name: "Final Confidence Putts", equipment: "Putter", thumbnail: "✅" }
        ]
      },
      {
        number: 4,
        title: "First Tee Preparation",
        focus: "The final minutes before you play",
        exercises: [
          { name: "First Tee Visualization", equipment: "Mental", thumbnail: "🧠" },
          { name: "Breathing & Calming", equipment: "Bodyweight", thumbnail: "🌬️" },
          { name: "Positive Self-Talk", equipment: "Mental", thumbnail: "💬" },
          { name: "Physical Readiness Check", equipment: "Bodyweight", thumbnail: "💪" },
          { name: "Commitment to Process", equipment: "Mental", thumbnail: "🏆" }
        ]
      }
    ]
  },
  "mental-2": {
    title: "Managing Major Championship Pressure",
    description: "How I stay calm and execute on the biggest stages in golf. The mental strategies that separate good golfers from great ones.",
    category: "Mental Program",
    stats: {
      duration: "Ongoing practice",
      exercises: "5 strategies",
      length: "Career-long"
    },
    equipment: ["Journal", "Breathing techniques", "Visualization"],
    targetAreas: ["Pressure management", "Composure", "Decision-making", "Clutch performance"],
    weeks: [
      {
        number: 1,
        title: "Understanding Pressure",
        focus: "Recognizing and accepting pressure",
        exercises: [
          { name: "Pressure Trigger Identification", equipment: "Journal", thumbnail: "📓" },
          { name: "Physical Response Awareness", equipment: "Self-analysis", thumbnail: "💓" },
          { name: "Reframing Pressure as Privilege", equipment: "Mental", thumbnail: "🏆" },
          { name: "Historical Pressure Moments", equipment: "Reflection", thumbnail: "🔙" },
          { name: "Building Pressure Tolerance", equipment: "Practice", thumbnail: "📈" }
        ]
      },
      {
        number: 2,
        title: "In-the-Moment Techniques",
        focus: "Tools for when pressure hits",
        exercises: [
          { name: "Box Breathing Method", equipment: "Bodyweight", thumbnail: "🌬️" },
          { name: "Muscle Tension Release", equipment: "Bodyweight", thumbnail: "💪" },
          { name: "Thought Stopping Techniques", equipment: "Mental", thumbnail: "🛑" },
          { name: "Refocusing Cue Words", equipment: "Mental", thumbnail: "💬" },
          { name: "Process Over Outcome Focus", equipment: "Mental", thumbnail: "🎯" }
        ]
      },
      {
        number: 3,
        title: "Pre-Shot Routine Under Pressure",
        focus: "Maintaining routine when it matters most",
        exercises: [
          { name: "Slowing Down Deliberately", equipment: "Mental", thumbnail: "🐢" },
          { name: "Visualization Clarity", equipment: "Mental", thumbnail: "🧠" },
          { name: "Commitment to the Shot", equipment: "Mental", thumbnail: "✅" },
          { name: "Physical Trigger Consistency", equipment: "Routine", thumbnail: "🔄" },
          { name: "Post-Shot Routine", equipment: "Mental", thumbnail: "🚶" }
        ]
      },
      {
        number: 4,
        title: "Championship Mindset",
        focus: "Thinking like a major champion",
        exercises: [
          { name: "Sunday Back Nine Visualization", equipment: "Mental", thumbnail: "🏆" },
          { name: "One Shot at a Time Philosophy", equipment: "Mental", thumbnail: "1️⃣" },
          { name: "Embracing the Moment", equipment: "Mental", thumbnail: "🌟" },
          { name: "Confidence in Preparation", equipment: "Reflection", thumbnail: "💪" },
          { name: "Legacy & Purpose Thinking", equipment: "Journal", thumbnail: "📖" }
        ]
      }
    ]
  },
  "mental-3": {
    title: "Bouncing Back from Bad Holes",
    description: "The mental reset techniques I use after bogeys or worse to stay in the round. Every great round includes recovery from adversity.",
    category: "Mental Program",
    stats: {
      duration: "In-round application",
      exercises: "5 reset strategies",
      length: "Every round"
    },
    equipment: ["Mental techniques", "Breathing", "Journal (post-round)"],
    targetAreas: ["Resilience", "Emotional control", "Focus recovery", "Momentum management"],
    weeks: [
      {
        number: 1,
        title: "Understanding Your Reactions",
        focus: "Recognizing emotional patterns after mistakes",
        exercises: [
          { name: "Reaction Pattern Mapping", equipment: "Journal", thumbnail: "📓" },
          { name: "Physical Anger Signals", equipment: "Self-awareness", thumbnail: "😤" },
          { name: "Mental Spiral Recognition", equipment: "Mental", thumbnail: "🌀" },
          { name: "Impact on Following Shots", equipment: "Analysis", thumbnail: "📊" },
          { name: "Creating Awareness Triggers", equipment: "Mental", thumbnail: "⚠️" }
        ]
      },
      {
        number: 2,
        title: "The Reset Walk",
        focus: "Using the walk to the next tee",
        exercises: [
          { name: "10-Yard Rule", equipment: "Mental", thumbnail: "🚶" },
          { name: "Deep Breathing During Walk", equipment: "Bodyweight", thumbnail: "🌬️" },
          { name: "Physical Release Techniques", equipment: "Bodyweight", thumbnail: "💪" },
          { name: "Positive Memory Recall", equipment: "Mental", thumbnail: "😊" },
          { name: "Next Shot Visualization", equipment: "Mental", thumbnail: "🧠" }
        ]
      },
      {
        number: 3,
        title: "Perspective Techniques",
        focus: "Maintaining proper perspective",
        exercises: [
          { name: "Big Picture Thinking", equipment: "Mental", thumbnail: "🖼️" },
          { name: "Statistics Reality Check", equipment: "Knowledge", thumbnail: "📊" },
          { name: "Gratitude Practice", equipment: "Mental", thumbnail: "🙏" },
          { name: "Opportunity Reframe", equipment: "Mental", thumbnail: "✨" },
          { name: "Energy Conservation", equipment: "Mental", thumbnail: "🔋" }
        ]
      },
      {
        number: 4,
        title: "Building Resilience",
        focus: "Long-term mental toughness development",
        exercises: [
          { name: "Post-Round Review Process", equipment: "Journal", thumbnail: "📝" },
          { name: "Learning from Mistakes", equipment: "Analysis", thumbnail: "📚" },
          { name: "Resilience Visualization", equipment: "Mental", thumbnail: "💎" },
          { name: "Practice Under Adversity", equipment: "Practice", thumbnail: "💪" },
          { name: "Success Story Collection", equipment: "Journal", thumbnail: "🏆" }
        ]
      }
    ]
  },
  "mental-4": {
    title: "Course Management Mindset",
    description: "Strategic thinking and decision-making under competitive pressure. The mental game of playing smart golf.",
    category: "Mental Program",
    stats: {
      duration: "Every round",
      exercises: "5 decision frameworks",
      length: "Career-long"
    },
    equipment: ["Yardage book", "Notebook", "Course knowledge"],
    targetAreas: ["Decision-making", "Risk assessment", "Patience", "Score management"],
    weeks: [
      {
        number: 1,
        title: "Pre-Round Strategy",
        focus: "Planning before you play",
        exercises: [
          { name: "Course Study & Notes", equipment: "Yardage book", thumbnail: "📖" },
          { name: "Pin Sheet Analysis", equipment: "Course info", thumbnail: "📍" },
          { name: "Weather Impact Planning", equipment: "Weather app", thumbnail: "🌤️" },
          { name: "Personal Strength Mapping", equipment: "Self-analysis", thumbnail: "💪" },
          { name: "Risk-Reward Identification", equipment: "Notes", thumbnail: "⚖️" }
        ]
      },
      {
        number: 2,
        title: "Tee Shot Decisions",
        focus: "Smart choices off the tee",
        exercises: [
          { name: "Target Selection Process", equipment: "Mental", thumbnail: "🎯" },
          { name: "Miss Side Planning", equipment: "Knowledge", thumbnail: "↔️" },
          { name: "Club Selection Framework", equipment: "Full bag", thumbnail: "🏌️" },
          { name: "Ego Management", equipment: "Mental", thumbnail: "🧘" },
          { name: "Position Over Distance", equipment: "Strategy", thumbnail: "📍" }
        ]
      },
      {
        number: 3,
        title: "Approach Shot Strategy",
        focus: "Attacking pins wisely",
        exercises: [
          { name: "Pin Position Assessment", equipment: "Eyes", thumbnail: "👁️" },
          { name: "Safe Zone Identification", equipment: "Knowledge", thumbnail: "✅" },
          { name: "Distance Verification", equipment: "Rangefinder", thumbnail: "📏" },
          { name: "Lie & Conditions Check", equipment: "Assessment", thumbnail: "🔍" },
          { name: "Commit & Execute", equipment: "Mental", thumbnail: "💪" }
        ]
      },
      {
        number: 4,
        title: "Scoring Zone Decisions",
        focus: "Smart play inside 100 yards",
        exercises: [
          { name: "Up & Down Strategy", equipment: "Short game", thumbnail: "⛳" },
          { name: "Putt Reading Patience", equipment: "Putter", thumbnail: "👀" },
          { name: "Lag Putt Philosophy", equipment: "Putter", thumbnail: "🎯" },
          { name: "Bogey Avoidance Mindset", equipment: "Mental", thumbnail: "🛡️" },
          { name: "Birdie Opportunity Recognition", equipment: "Awareness", thumbnail: "🦅" }
        ]
      }
    ]
  }
};

const defaultProgram: ProgramData = {
  title: "Golf Training Program",
  description: "A comprehensive program to elevate your golf game.",
  category: "Program",
  stats: {
    duration: "45–60 min per session",
    exercises: "6–8",
    length: "4 weeks"
  },
  equipment: ["Golf clubs", "Practice facility"],
  targetAreas: ["Technique", "Consistency", "Scoring"],
  weeks: []
};

const TommyTrainingProgramPage = () => {
  const navigate = useNavigate();
  const [openWeeks, setOpenWeeks] = useState<number[]>([1]);
  const { programId } = useParams<{ programId: string }>();
  const { isSubscribed } = useSubscription();
  const [programStarted, setProgramStarted] = useState(false);

  const isPremiumSubscribed = isSubscribed("tommy-fleetwood");
  const programData = programId ? (programsData[programId] || defaultProgram) : defaultProgram;
  const bannerImage = programId ? (programImages[programId] || fitness1) : fitness1;

  useEffect(() => {
    if (!isPremiumSubscribed) {
      navigate(`/subscribe/tommy-fleetwood`);
    }
  }, [isPremiumSubscribed, navigate]);

  const toggleWeek = (weekNum: number) => {
    setOpenWeeks((prev) =>
      prev.includes(weekNum)
        ? prev.filter((w) => w !== weekNum)
        : [...prev, weekNum]
    );
  };

  const handleStartProgram = () => {
    setProgramStarted(true);
  };

  if (!isPremiumSubscribed) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AthleteHeader />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Premium Content</h2>
            <p className="text-muted-foreground mb-4">
              Subscribe to Tommy's Halo to access this training program.
            </p>
            <Button onClick={() => navigate(`/subscribe/tommy-fleetwood`)}>
              Subscribe Now
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AthleteHeader />

      {/* Banner */}
      <div className="relative h-[340px] w-full overflow-hidden">
        <img
          src={bannerImage}
          alt={programData.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-full z-10"
          onClick={() => navigate(`/athlete/tommy-fleetwood?tab=training`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Program Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge className="mb-2 bg-primary/90">{programData.category}</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{programData.title}</h1>
          <p className="text-muted-foreground max-w-2xl">{programData.description}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm">{programData.stats.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-primary" />
              <span className="text-sm">{programData.stats.exercises} exercises</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm">{programData.stats.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Equipment & Target Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Equipment Needed</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.equipment.map((item, i) => (
                <Badge key={i} variant="secondary">{item}</Badge>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Target Areas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.targetAreas.map((area, i) => (
                <Badge key={i} variant="outline">{area}</Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Weekly Breakdown */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-4 w-4 text-primary" />
            <h2 className="font-display text-xl font-semibold">Weekly Breakdown</h2>
          </div>

          <div className="space-y-3">
            {programData.weeks.map((week) => (
              <Collapsible
                key={week.number}
                open={openWeeks.includes(week.number)}
                onOpenChange={() => toggleWeek(week.number)}
              >
                <Card className="overflow-hidden">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{week.number}</span>
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">{week.title}</h3>
                          <p className="text-sm text-muted-foreground">{week.focus}</p>
                        </div>
                      </div>
                      {openWeeks.includes(week.number) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-2 border-t border-border">
                      <div className="grid gap-2">
                        {week.exercises.map((exercise, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-lg">
                              {exercise.thumbnail}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{exercise.name}</h4>
                              <p className="text-xs text-muted-foreground">{exercise.equipment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="max-w-4xl mx-auto">
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleStartProgram}
          >
            {programStarted ? "Continue Program" : "Start Program"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TommyTrainingProgramPage;
