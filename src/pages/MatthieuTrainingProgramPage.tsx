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
import fitnessSpeed from "@/assets/matthieu-fitness-speed.png";
import fitness2 from "@/assets/matthieu-fitness-2.png";
import fitness3 from "@/assets/matthieu-fitness-3.png";
import fitness4 from "@/assets/matthieu-fitness-4.png";
import skills1 from "@/assets/matthieu-skills-1.png";
import skills2 from "@/assets/matthieu-skills-2.png";
import skills3 from "@/assets/matthieu-skills-3.png";
import nutrition1 from "@/assets/arthur-nutrition-1.png";
import nutrition2 from "@/assets/arthur-nutrition-2.png";
import nutrition3 from "@/assets/arthur-nutrition-3.png";
import nutrition4 from "@/assets/arthur-nutrition-4.png";
import mental1 from "@/assets/matthieu-mental-1.png";
import mental2 from "@/assets/matthieu-mental-2.png";
import mental3 from "@/assets/matthieu-mental-3.png";
import mental4 from "@/assets/matthieu-mental-4.png";

// Program image mapping (matching MatthieuTrainingSection)
const programImages: Record<string, string> = {
  "fitness-1": fitnessSpeed,
  "fitness-2": fitness3,
  "fitness-3": fitness4,
  "fitness-4": fitness2,
  "skills-1": skills1,
  "skills-2": skills3,
  "skills-3": fitness2,
  "skills-4": skills2,
  "nutrition-1": nutrition1,
  "nutrition-2": nutrition2,
  "nutrition-3": nutrition3,
  "nutrition-4": nutrition4,
  "mental-1": mental1,
  "mental-2": mental2,
  "mental-3": mental3,
  "mental-4": mental4,
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
  "fitness-1": {
    title: "Acceleration & Line-Break Speed",
    description: "A 4-week program designed to develop explosive first steps, acceleration power, and the breakaway speed needed to exploit gaps and create tries. Structured to improve reaction time, build raw acceleration, and develop the sprint mechanics required for elite fly-half play.",
    category: "Fitness Program",
    stats: {
      duration: "45–60 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Agility ladder", "Cones", "Resistance bands", "Sled (optional)"],
    targetAreas: ["Glutes & hip flexors", "Hamstrings", "Calves", "Core stability"],
    weeks: [
      {
        number: 1,
        title: "Acceleration Foundations",
        focus: "Building explosive start mechanics and first-step power",
        exercises: [
          { name: "Split Stance Starts", equipment: "Bodyweight", thumbnail: "🏉" },
          { name: "Wall Drive Holds", equipment: "Bodyweight", thumbnail: "💪" },
          { name: "Falling Starts", equipment: "Bodyweight", thumbnail: "⚡" },
          { name: "A-Skip Progression", equipment: "Bodyweight", thumbnail: "🦵" },
          { name: "Band-Resisted Marches", equipment: "Resistance bands", thumbnail: "🔥" },
          { name: "Reactive Cone Sprints", equipment: "Cones", thumbnail: "🎯" }
        ]
      },
      {
        number: 2,
        title: "Power Transfer & Drive Phase",
        focus: "Developing force application and ground contact efficiency",
        exercises: [
          { name: "Sled Push Sprints", equipment: "Sled (optional)", thumbnail: "🏋️" },
          { name: "Broad Jump to Sprint", equipment: "Bodyweight", thumbnail: "🚀" },
          { name: "Single-Leg Bounds", equipment: "Bodyweight", thumbnail: "💥" },
          { name: "Resisted Acceleration Runs", equipment: "Resistance bands", thumbnail: "⚡" },
          { name: "Hip Flexor Power Drives", equipment: "Resistance bands", thumbnail: "🔥" },
          { name: "Ladder Quick Feet to Sprint", equipment: "Agility ladder", thumbnail: "👟" }
        ]
      },
      {
        number: 3,
        title: "Reactive Speed & Gap Exploitation",
        focus: "Developing decision-making speed and line-break timing",
        exercises: [
          { name: "Mirror Drill Sprints", equipment: "Cones", thumbnail: "🪞" },
          { name: "Reactive Ball Drop Sprints", equipment: "Rugby ball", thumbnail: "🏉" },
          { name: "Angle Cut Accelerations", equipment: "Cones", thumbnail: "↗️" },
          { name: "Shadow Defender Breaks", equipment: "Cones", thumbnail: "💨" },
          { name: "3-Cone L-Drill to Sprint", equipment: "Cones", thumbnail: "⚡" }
        ]
      },
      {
        number: 4,
        title: "Match-Specific Line-Break Speed",
        focus: "Integrating speed work into game-like scenarios",
        exercises: [
          { name: "Receive & Accelerate Drills", equipment: "Rugby ball", thumbnail: "🏉" },
          { name: "Support Line Sprint Patterns", equipment: "Cones", thumbnail: "📐" },
          { name: "Break & Finish (Try Line)", equipment: "Rugby ball", thumbnail: "🏆" },
          { name: "Counter-Attack Speed Work", equipment: "Cones", thumbnail: "⚡" },
          { name: "Full-Speed Decision Sprints", equipment: "Cones", thumbnail: "🧠" },
          { name: "Repeat Sprint Recovery", equipment: "Bodyweight", thumbnail: "🔄" }
        ]
      }
    ]
  },
  "fitness-2": {
    title: "Core Rotation & Kicking Power",
    description: "A 4-week program focused on developing the hip and trunk power that generates distance and accuracy on long-range kicks. Build the rotational strength that separates elite fly-halves.",
    category: "Fitness Program",
    stats: {
      duration: "45–60 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Medicine ball", "Resistance bands", "Cable machine", "Kettlebell"],
    targetAreas: ["Core rotation", "Hip power", "Trunk stability", "Leg drive"],
    weeks: [
      {
        number: 1,
        title: "Rotational Foundation",
        focus: "Building core stability and rotation patterns",
        exercises: [
          { name: "Dead Bug with Rotation", equipment: "Bodyweight", thumbnail: "🦎" },
          { name: "Pallof Press Hold", equipment: "Resistance bands", thumbnail: "💪" },
          { name: "Medicine Ball Side Throw", equipment: "Medicine ball", thumbnail: "🏉" },
          { name: "Hip Rotation Mobility", equipment: "Bodyweight", thumbnail: "🔄" },
          { name: "Anti-Rotation Plank", equipment: "Bodyweight", thumbnail: "⚡" },
          { name: "Kneeling Cable Chop", equipment: "Cable machine", thumbnail: "🎯" }
        ]
      },
      {
        number: 2,
        title: "Power Development",
        focus: "Increasing rotational force production",
        exercises: [
          { name: "Rotational Med Ball Slam", equipment: "Medicine ball", thumbnail: "💥" },
          { name: "Cable Woodchop Progressions", equipment: "Cable machine", thumbnail: "🔥" },
          { name: "Kettlebell Swing Variations", equipment: "Kettlebell", thumbnail: "🏋️" },
          { name: "Hip Thrust with Rotation", equipment: "Bodyweight", thumbnail: "🍑" },
          { name: "Standing Trunk Rotation", equipment: "Resistance bands", thumbnail: "🔄" },
          { name: "Side Plank with Rotation", equipment: "Bodyweight", thumbnail: "⚡" }
        ]
      },
      {
        number: 3,
        title: "Kick-Specific Power",
        focus: "Translating power to kicking motion",
        exercises: [
          { name: "Single-Leg Hip Power", equipment: "Resistance bands", thumbnail: "🦵" },
          { name: "Rotational Jump Drills", equipment: "Bodyweight", thumbnail: "🚀" },
          { name: "Kicking Leg Drive Practice", equipment: "Cones", thumbnail: "🏉" },
          { name: "Standing Leg Power Swings", equipment: "Resistance bands", thumbnail: "💨" },
          { name: "Core Stability Under Load", equipment: "Medicine ball", thumbnail: "💪" }
        ]
      },
      {
        number: 4,
        title: "Match Integration",
        focus: "Applying power to game situations",
        exercises: [
          { name: "Penalty Kick Simulation", equipment: "Rugby ball", thumbnail: "🏆" },
          { name: "Conversion Kick Power", equipment: "Rugby ball", thumbnail: "🎯" },
          { name: "Long-Range Kick Drills", equipment: "Rugby ball", thumbnail: "📏" },
          { name: "Fatigue Kick Accuracy", equipment: "Rugby ball", thumbnail: "😤" },
          { name: "Pressure Kick Scenarios", equipment: "Rugby ball", thumbnail: "⚡" }
        ]
      }
    ]
  },
  "fitness-3": {
    title: "Agility & Reactive Footwork",
    description: "A 4-week program to improve lateral quickness, change of direction, and evasion skills against rush defense. Master the footwork that keeps you one step ahead.",
    category: "Fitness Program",
    stats: {
      duration: "40–55 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Agility ladder", "Cones", "Reaction balls", "Hurdles"],
    targetAreas: ["Lateral movement", "Direction changes", "Reactive speed", "Balance"],
    weeks: [
      {
        number: 1,
        title: "Agility Fundamentals",
        focus: "Building basic movement patterns",
        exercises: [
          { name: "Ladder Quick Feet Series", equipment: "Agility ladder", thumbnail: "👟" },
          { name: "Lateral Shuffle Drills", equipment: "Cones", thumbnail: "↔️" },
          { name: "Crossover Step Practice", equipment: "Cones", thumbnail: "🔀" },
          { name: "Balance & Stability Work", equipment: "Bodyweight", thumbnail: "⚖️" },
          { name: "Deceleration Drills", equipment: "Cones", thumbnail: "🛑" },
          { name: "Basic Cone Patterns", equipment: "Cones", thumbnail: "🎯" }
        ]
      },
      {
        number: 2,
        title: "Speed & Quickness",
        focus: "Increasing movement velocity",
        exercises: [
          { name: "5-10-5 Pro Agility", equipment: "Cones", thumbnail: "⚡" },
          { name: "T-Drill Variations", equipment: "Cones", thumbnail: "🔥" },
          { name: "Hurdle Quick Steps", equipment: "Hurdles", thumbnail: "🚧" },
          { name: "Reactive Direction Changes", equipment: "Cones", thumbnail: "🔄" },
          { name: "Speed Ladder Complex", equipment: "Agility ladder", thumbnail: "👟" },
          { name: "Mini Hurdle Hops", equipment: "Hurdles", thumbnail: "⬆️" }
        ]
      },
      {
        number: 3,
        title: "Reactive Agility",
        focus: "Decision-making at speed",
        exercises: [
          { name: "Mirror Drill Reactions", equipment: "Partner", thumbnail: "🪞" },
          { name: "Reaction Ball Catches", equipment: "Reaction balls", thumbnail: "🏐" },
          { name: "Random Cone Sprints", equipment: "Cones", thumbnail: "❓" },
          { name: "Defensive Shadow Work", equipment: "Partner", thumbnail: "🛡️" },
          { name: "Audio/Visual React Drills", equipment: "Various", thumbnail: "👁️" }
        ]
      },
      {
        number: 4,
        title: "Rugby-Specific Agility",
        focus: "Game situation movements",
        exercises: [
          { name: "Evasion Patterns", equipment: "Cones", thumbnail: "💨" },
          { name: "Line Break Footwork", equipment: "Cones", thumbnail: "🏉" },
          { name: "Sidestep Drills", equipment: "Bodyweight", thumbnail: "↗️" },
          { name: "Tackle Avoidance Work", equipment: "Pads", thumbnail: "🛡️" },
          { name: "Match Simulation Agility", equipment: "Various", thumbnail: "🏆" }
        ]
      }
    ]
  },
  "fitness-4": {
    title: "Contact Strength & Body Control",
    description: "A 4-week program for building stability through tackles, collisions, and maintaining passing accuracy under pressure. Develop the physical resilience of an elite fly-half.",
    category: "Fitness Program",
    stats: {
      duration: "50–65 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Medicine ball", "Resistance bands", "Tackle bags", "Dumbbells"],
    targetAreas: ["Contact strength", "Core stability", "Upper body power", "Balance under pressure"],
    weeks: [
      {
        number: 1,
        title: "Strength Foundation",
        focus: "Building base strength for contact",
        exercises: [
          { name: "Goblet Squats", equipment: "Dumbbells", thumbnail: "🏋️" },
          { name: "Push-Up Progressions", equipment: "Bodyweight", thumbnail: "💪" },
          { name: "Row Variations", equipment: "Dumbbells", thumbnail: "🚣" },
          { name: "Core Bracing Drills", equipment: "Bodyweight", thumbnail: "⚡" },
          { name: "Single-Leg Balance", equipment: "Bodyweight", thumbnail: "⚖️" },
          { name: "Shoulder Stability Work", equipment: "Resistance bands", thumbnail: "💫" }
        ]
      },
      {
        number: 2,
        title: "Contact Preparation",
        focus: "Building collision resilience",
        exercises: [
          { name: "Med Ball Chest Pass", equipment: "Medicine ball", thumbnail: "💥" },
          { name: "Tackle Bag Drives", equipment: "Tackle bags", thumbnail: "🏉" },
          { name: "Ground Get-Ups", equipment: "Bodyweight", thumbnail: "⬆️" },
          { name: "Anti-Extension Core", equipment: "Bodyweight", thumbnail: "🔥" },
          { name: "Eccentric Loading", equipment: "Dumbbells", thumbnail: "🏋️" },
          { name: "Impact Absorption Drills", equipment: "Pads", thumbnail: "🛡️" }
        ]
      },
      {
        number: 3,
        title: "Power Under Pressure",
        focus: "Maintaining technique when fatigued",
        exercises: [
          { name: "Contact & Pass Combo", equipment: "Rugby ball + pads", thumbnail: "🏉" },
          { name: "Collision Recovery Drills", equipment: "Tackle bags", thumbnail: "🔄" },
          { name: "Passing After Contact", equipment: "Rugby ball", thumbnail: "🎯" },
          { name: "Fatigue Resistance Circuits", equipment: "Various", thumbnail: "😤" },
          { name: "Balance After Impact", equipment: "Pads", thumbnail: "⚖️" }
        ]
      },
      {
        number: 4,
        title: "Match Simulation",
        focus: "Full-speed contact scenarios",
        exercises: [
          { name: "Live Contact Drills", equipment: "Full gear", thumbnail: "🏆" },
          { name: "Decision Under Pressure", equipment: "Game simulation", thumbnail: "🧠" },
          { name: "Tackle & Recycle Speed", equipment: "Tackle bags", thumbnail: "⚡" },
          { name: "Post-Contact Distribution", equipment: "Rugby ball", thumbnail: "🏉" },
          { name: "80-Minute Simulation", equipment: "Various", thumbnail: "⏱️" }
        ]
      }
    ]
  },
  "skills-1": {
    title: "Passing Precision & Quick Distribution",
    description: "A 4-week technical program for perfecting flat passes, skip passes, long passes, and keeping distribution sharp under defensive pressure. Master the passing game that controls tempo.",
    category: "Skills Program",
    stats: {
      duration: "60–75 min per session",
      exercises: "5–6 drills",
      length: "4 weeks"
    },
    equipment: ["Rugby balls", "Cones", "Passing targets", "Partner(s)"],
    targetAreas: ["Passing accuracy", "Quick hands", "Vision", "Decision making"],
    weeks: [
      {
        number: 1,
        title: "Passing Fundamentals",
        focus: "Building consistent technique",
        exercises: [
          { name: "Grip & Hand Position", equipment: "Rugby ball", thumbnail: "🏉" },
          { name: "Short Pop Pass Drills", equipment: "Rugby balls", thumbnail: "🎯" },
          { name: "Flat Pass Accuracy", equipment: "Targets", thumbnail: "➡️" },
          { name: "Follow-Through Practice", equipment: "Rugby ball", thumbnail: "💪" },
          { name: "Stationary Target Work", equipment: "Cones", thumbnail: "🎯" }
        ]
      },
      {
        number: 2,
        title: "Pass Variety",
        focus: "Developing different pass types",
        exercises: [
          { name: "Skip Pass Distance", equipment: "Rugby balls", thumbnail: "📏" },
          { name: "Cut-Out Pass Timing", equipment: "Partners", thumbnail: "✂️" },
          { name: "Spin Pass Development", equipment: "Rugby ball", thumbnail: "🔄" },
          { name: "Offload Technique", equipment: "Contact pads", thumbnail: "💥" },
          { name: "Behind-the-Back Options", equipment: "Rugby ball", thumbnail: "🔙" }
        ]
      },
      {
        number: 3,
        title: "Passing Under Pressure",
        focus: "Maintaining accuracy with defenders",
        exercises: [
          { name: "Pass After Contact", equipment: "Pads + ball", thumbnail: "💥" },
          { name: "Quick Catch & Release", equipment: "Rugby balls", thumbnail: "⚡" },
          { name: "Moving Target Passes", equipment: "Partners", thumbnail: "🏃" },
          { name: "Defensive Pressure Drills", equipment: "Defenders", thumbnail: "🛡️" },
          { name: "Decision Making Reps", equipment: "Various", thumbnail: "🧠" }
        ]
      },
      {
        number: 4,
        title: "Game Integration",
        focus: "Full-speed game scenarios",
        exercises: [
          { name: "Attack Pattern Runs", equipment: "Full backs", thumbnail: "🏆" },
          { name: "Set Piece Distribution", equipment: "Team drill", thumbnail: "📋" },
          { name: "Counter-Attack Passing", equipment: "Rugby balls", thumbnail: "⚡" },
          { name: "Pressure Situation Reps", equipment: "Game simulation", thumbnail: "😤" },
          { name: "Match Tempo Passing", equipment: "Full speed", thumbnail: "🔥" }
        ]
      }
    ]
  },
  "skills-2": {
    title: "Kicking Accuracy & Tactical Variety",
    description: "A 4-week program for perfecting cross-kicks, grubbers, contestable kicks, and exit kicks to control territory and create chances. Develop the full kicking arsenal.",
    category: "Skills Program",
    stats: {
      duration: "60–75 min per session",
      exercises: "5–6 drills",
      length: "4 weeks"
    },
    equipment: ["Rugby balls", "Cones", "Kicking tee", "Target zones"],
    targetAreas: ["Kicking technique", "Tactical awareness", "Distance control", "Pressure execution"],
    weeks: [
      {
        number: 1,
        title: "Kicking Mechanics",
        focus: "Building consistent technique",
        exercises: [
          { name: "Drop Punt Technique", equipment: "Rugby balls", thumbnail: "🦶" },
          { name: "Contact Point Practice", equipment: "Rugby balls", thumbnail: "🎯" },
          { name: "Follow-Through Drills", equipment: "Bodyweight", thumbnail: "➡️" },
          { name: "Distance Building", equipment: "Rugby balls", thumbnail: "📏" },
          { name: "Left/Right Foot Work", equipment: "Rugby balls", thumbnail: "🔄" }
        ]
      },
      {
        number: 2,
        title: "Kick Variety",
        focus: "Developing different kick types",
        exercises: [
          { name: "Cross-Kick Placement", equipment: "Rugby balls", thumbnail: "↗️" },
          { name: "Grubber Kick Control", equipment: "Rugby balls", thumbnail: "⬇️" },
          { name: "Box Kick Technique", equipment: "Rugby balls", thumbnail: "📦" },
          { name: "Chip & Chase Timing", equipment: "Rugby balls", thumbnail: "💨" },
          { name: "Exit Kick Distance", equipment: "Rugby balls", thumbnail: "🚪" }
        ]
      },
      {
        number: 3,
        title: "Tactical Kicking",
        focus: "Reading the game and executing",
        exercises: [
          { name: "Contestable Kick Practice", equipment: "Rugby balls", thumbnail: "🏆" },
          { name: "Territory Management", equipment: "Field zones", thumbnail: "📍" },
          { name: "Kick to Space Drills", equipment: "Cones", thumbnail: "⬜" },
          { name: "Pressure Kick Scenarios", equipment: "Defenders", thumbnail: "😤" },
          { name: "Chase & Compete Combos", equipment: "Team drill", thumbnail: "🏃" }
        ]
      },
      {
        number: 4,
        title: "Match Execution",
        focus: "Full-speed game kicking",
        exercises: [
          { name: "Penalty & Conversion Routine", equipment: "Kicking tee", thumbnail: "🎯" },
          { name: "Restart Kick Mastery", equipment: "Rugby balls", thumbnail: "🔄" },
          { name: "Last-Minute Pressure Kicks", equipment: "Rugby balls", thumbnail: "⏱️" },
          { name: "Kick Selection Decisions", equipment: "Game simulation", thumbnail: "🧠" },
          { name: "Fatigue Kick Accuracy", equipment: "Rugby balls", thumbnail: "😤" }
        ]
      }
    ]
  },
  "skills-3": {
    title: "Tackling Technique & Defensive Control",
    description: "A 4-week program focused on safe shoulder tackles, defensive alignment, and controlled stopping to shut down attacking threats. Build defensive excellence.",
    category: "Skills Program",
    stats: {
      duration: "55–70 min per session",
      exercises: "5–6 drills",
      length: "4 weeks"
    },
    equipment: ["Tackle bags", "Contact pads", "Cones", "Partners"],
    targetAreas: ["Tackle technique", "Body position", "Defensive reads", "Line speed"],
    weeks: [
      {
        number: 1,
        title: "Tackle Fundamentals",
        focus: "Building safe, effective technique",
        exercises: [
          { name: "Body Position Drills", equipment: "Bodyweight", thumbnail: "🧍" },
          { name: "Shoulder Placement", equipment: "Tackle bags", thumbnail: "💪" },
          { name: "Leg Drive Practice", equipment: "Tackle bags", thumbnail: "🦵" },
          { name: "Wrap & Hold Technique", equipment: "Partners", thumbnail: "🤗" },
          { name: "Low Body Tackles", equipment: "Tackle bags", thumbnail: "⬇️" }
        ]
      },
      {
        number: 2,
        title: "Tackle Variety",
        focus: "Different tackle types for different situations",
        exercises: [
          { name: "Chop Tackle Technique", equipment: "Tackle bags", thumbnail: "✂️" },
          { name: "Dominant Tackle Practice", equipment: "Contact pads", thumbnail: "💥" },
          { name: "Double Tackle Coordination", equipment: "Partners", thumbnail: "👥" },
          { name: "Tackle in Space", equipment: "Cones", thumbnail: "🏃" },
          { name: "Post-Tackle Recovery", equipment: "Bodyweight", thumbnail: "⬆️" }
        ]
      },
      {
        number: 3,
        title: "Defensive Systems",
        focus: "Working within the defensive line",
        exercises: [
          { name: "Line Speed Drills", equipment: "Cones", thumbnail: "⚡" },
          { name: "Communication Practice", equipment: "Team drill", thumbnail: "🗣️" },
          { name: "Drift Defense Work", equipment: "Cones", thumbnail: "↔️" },
          { name: "Blitz Defense Timing", equipment: "Team drill", thumbnail: "🚀" },
          { name: "Defensive Reads", equipment: "Game simulation", thumbnail: "👁️" }
        ]
      },
      {
        number: 4,
        title: "Match Defense",
        focus: "Full-speed defensive scenarios",
        exercises: [
          { name: "1v1 Tackle Situations", equipment: "Live drill", thumbnail: "🏆" },
          { name: "Scramble Defense", equipment: "Team drill", thumbnail: "🔥" },
          { name: "Try-Line Defense", equipment: "Near goal line", thumbnail: "🛡️" },
          { name: "Turnover Opportunities", equipment: "Live drill", thumbnail: "🔄" },
          { name: "80-Minute Defense Sim", equipment: "Full game", thumbnail: "⏱️" }
        ]
      }
    ]
  },
  "skills-4": {
    title: "Evasion & Tackle Avoidance",
    description: "A 4-week program focused on sidesteps, fends, late footwork, and maintaining momentum through traffic to break the defensive line. Master the art of beating defenders.",
    category: "Skills Program",
    stats: {
      duration: "55–70 min per session",
      exercises: "5–6 drills",
      length: "4 weeks"
    },
    equipment: ["Cones", "Tackle bags", "Contact pads", "Partners"],
    targetAreas: ["Footwork", "Balance", "Fend technique", "Decision making"],
    weeks: [
      {
        number: 1,
        title: "Evasion Basics",
        focus: "Building fundamental movements",
        exercises: [
          { name: "Sidestep Technique", equipment: "Cones", thumbnail: "↔️" },
          { name: "Goose Step Practice", equipment: "Cones", thumbnail: "🦢" },
          { name: "Change of Pace", equipment: "Cones", thumbnail: "⚡" },
          { name: "Body Feint Drills", equipment: "Bodyweight", thumbnail: "🎭" },
          { name: "Balance Under Pressure", equipment: "Partners", thumbnail: "⚖️" }
        ]
      },
      {
        number: 2,
        title: "Fend Development",
        focus: "Using the hand-off effectively",
        exercises: [
          { name: "Fend Technique Drills", equipment: "Contact pads", thumbnail: "✋" },
          { name: "Fend & Accelerate", equipment: "Tackle bags", thumbnail: "💨" },
          { name: "One-Arm Carry Fend", equipment: "Rugby ball", thumbnail: "🏉" },
          { name: "Fend Timing Practice", equipment: "Partners", thumbnail: "⏱️" },
          { name: "Power Fend vs Light Fend", equipment: "Contact pads", thumbnail: "💪" }
        ]
      },
      {
        number: 3,
        title: "Late Footwork",
        focus: "Beating defenders with timing",
        exercises: [
          { name: "Late Decision Sidestep", equipment: "Cones", thumbnail: "🎯" },
          { name: "Drawing the Defender", equipment: "Partners", thumbnail: "🎣" },
          { name: "Inside-Outside Steps", equipment: "Cones", thumbnail: "↔️" },
          { name: "Dummy & Go Drills", equipment: "Rugby ball", thumbnail: "🎭" },
          { name: "Space Identification", equipment: "Defenders", thumbnail: "👁️" }
        ]
      },
      {
        number: 4,
        title: "Breaking the Line",
        focus: "Full-speed line break scenarios",
        exercises: [
          { name: "1v1 Beat the Defender", equipment: "Live drill", thumbnail: "🏆" },
          { name: "Through Traffic Runs", equipment: "Multiple defenders", thumbnail: "🚗" },
          { name: "Broken Field Running", equipment: "Cones", thumbnail: "💨" },
          { name: "Offload After Contact", equipment: "Contact + ball", thumbnail: "🏉" },
          { name: "Try-Scoring Scenarios", equipment: "Full simulation", thumbnail: "🏆" }
        ]
      }
    ]
  },
  "nutrition-1": {
    title: "Match Day Fuel Plan",
    description: "A complete guide to what Matthieu eats before, during, and after matches to stay energized, sharp, and fully recovered. Optimize your nutrition for peak rugby performance.",
    category: "Nutrition Program",
    stats: {
      duration: "Full day plan",
      exercises: "5 meal windows",
      length: "Ongoing"
    },
    equipment: ["Kitchen access", "Meal prep containers", "Hydration bottles"],
    targetAreas: ["Pre-match energy", "In-match fueling", "Post-match recovery", "Hydration"],
    weeks: [
      {
        number: 1,
        title: "Pre-Match Nutrition",
        focus: "Fueling 3-4 hours before kickoff",
        exercises: [
          { name: "Carb Loading Breakfast", equipment: "Kitchen", thumbnail: "🥣" },
          { name: "Timing Your Last Meal", equipment: "Clock", thumbnail: "⏰" },
          { name: "Hydration Pre-Loading", equipment: "Water bottle", thumbnail: "💧" },
          { name: "Pre-Match Snack Options", equipment: "Kitchen", thumbnail: "🍌" },
          { name: "Avoiding Digestive Issues", equipment: "Kitchen", thumbnail: "✅" }
        ]
      },
      {
        number: 2,
        title: "Half-Time & During Match",
        focus: "Staying energized through 80 minutes",
        exercises: [
          { name: "Half-Time Nutrition", equipment: "Quick fuel", thumbnail: "🏉" },
          { name: "Electrolyte Management", equipment: "Sports drink", thumbnail: "⚡" },
          { name: "Quick Energy Sources", equipment: "Gels/bars", thumbnail: "🔋" },
          { name: "Caffeine Strategy", equipment: "Optional", thumbnail: "☕" },
          { name: "Heat Management Hydration", equipment: "Ice/water", thumbnail: "🧊" }
        ]
      },
      {
        number: 3,
        title: "Post-Match Recovery",
        focus: "Optimal recovery nutrition",
        exercises: [
          { name: "30-Minute Recovery Window", equipment: "Shake/snack", thumbnail: "⏱️" },
          { name: "Protein for Muscle Repair", equipment: "Kitchen", thumbnail: "🥩" },
          { name: "Carb Replenishment", equipment: "Kitchen", thumbnail: "🍚" },
          { name: "Anti-Inflammatory Foods", equipment: "Kitchen", thumbnail: "🫐" },
          { name: "Sleep-Supporting Dinner", equipment: "Kitchen", thumbnail: "😴" }
        ]
      },
      {
        number: 4,
        title: "Hydration Mastery",
        focus: "Complete hydration strategy",
        exercises: [
          { name: "Daily Hydration Tracking", equipment: "Water bottle", thumbnail: "💧" },
          { name: "Sweat Rate Calculation", equipment: "Scale", thumbnail: "📊" },
          { name: "Electrolyte Balance", equipment: "Supplements", thumbnail: "⚡" },
          { name: "Climate Adaptation", equipment: "Various", thumbnail: "🌡️" },
          { name: "Weight Monitoring", equipment: "Scale", thumbnail: "⚖️" }
        ]
      }
    ]
  },
  "nutrition-2": {
    title: "Tournament Week Eating Routine",
    description: "Matthieu's daily nutrition structure during multi-day tournaments, built to keep digestion light and energy constant throughout demanding competition schedules.",
    category: "Nutrition Program",
    stats: {
      duration: "7-day cycle",
      exercises: "Daily meal plans",
      length: "Tournament duration"
    },
    equipment: ["Kitchen/restaurant access", "Meal prep containers", "Supplements"],
    targetAreas: ["Sustained energy", "Light digestion", "Recovery optimization", "Consistency"],
    weeks: [
      {
        number: 1,
        title: "Tournament Prep Days",
        focus: "Loading phase before event",
        exercises: [
          { name: "Carb Loading Strategy", equipment: "Kitchen", thumbnail: "🍝" },
          { name: "Sleep Optimization Meals", equipment: "Kitchen", thumbnail: "😴" },
          { name: "Digestive System Prep", equipment: "Kitchen", thumbnail: "✅" },
          { name: "Travel Day Nutrition", equipment: "Portable foods", thumbnail: "✈️" },
          { name: "Time Zone Adjustment", equipment: "Meals", thumbnail: "🌍" }
        ]
      },
      {
        number: 2,
        title: "Pool Stage Days",
        focus: "Building through the tournament",
        exercises: [
          { name: "Match Day Breakfast", equipment: "Kitchen", thumbnail: "🥣" },
          { name: "Between-Match Meals", equipment: "Restaurant", thumbnail: "🍽️" },
          { name: "Evening Recovery Dinner", equipment: "Kitchen", thumbnail: "🥗" },
          { name: "Snacking Strategy", equipment: "Portable foods", thumbnail: "🍎" },
          { name: "Hydration Maintenance", equipment: "Water bottle", thumbnail: "💧" }
        ]
      },
      {
        number: 3,
        title: "Knockout Rounds",
        focus: "Maintaining peak performance",
        exercises: [
          { name: "Quarter/Semi Final Prep", equipment: "Kitchen", thumbnail: "🏆" },
          { name: "Back-to-Back Match Days", equipment: "Meal timing", thumbnail: "📅" },
          { name: "Fatigue-Fighting Foods", equipment: "Kitchen", thumbnail: "⚡" },
          { name: "Mental Energy Nutrition", equipment: "Specific foods", thumbnail: "🧠" },
          { name: "Rest Day Nutrition", equipment: "Kitchen", thumbnail: "🔄" }
        ]
      },
      {
        number: 4,
        title: "Finals Weekend",
        focus: "Peak performance nutrition",
        exercises: [
          { name: "Final Day Fueling", equipment: "Kitchen", thumbnail: "🏆" },
          { name: "Nerves Management Foods", equipment: "Light meals", thumbnail: "🧘" },
          { name: "Post-Tournament Recovery", equipment: "Kitchen", thumbnail: "🔄" },
          { name: "Celebration Moderation", equipment: "Balance", thumbnail: "🎉" },
          { name: "Next Event Preparation", equipment: "Planning", thumbnail: "📝" }
        ]
      }
    ]
  },
  "nutrition-3": {
    title: "Recovery Day Menu",
    description: "Meals focused on protein, hydration, and anti-inflammatory foods after demanding match play. Essential nutrition for bouncing back stronger.",
    category: "Nutrition Program",
    stats: {
      duration: "Full day plan",
      exercises: "5 meals + snacks",
      length: "Ongoing"
    },
    equipment: ["Kitchen access", "Blender", "Quality ingredients"],
    targetAreas: ["Muscle repair", "Inflammation reduction", "Sleep quality", "Energy restoration"],
    weeks: [
      {
        number: 1,
        title: "Morning Recovery",
        focus: "Starting recovery strong",
        exercises: [
          { name: "Anti-Inflammatory Breakfast", equipment: "Kitchen", thumbnail: "🥣" },
          { name: "Protein-Rich First Meal", equipment: "Kitchen", thumbnail: "🥚" },
          { name: "Hydration Kickstart", equipment: "Water/tea", thumbnail: "💧" },
          { name: "Light Movement + Fuel", equipment: "Snack", thumbnail: "🚶" },
          { name: "Mid-Morning Smoothie", equipment: "Blender", thumbnail: "🥤" }
        ]
      },
      {
        number: 2,
        title: "Midday Restoration",
        focus: "Building blocks for repair",
        exercises: [
          { name: "Balanced Lunch Plate", equipment: "Kitchen", thumbnail: "🍽️" },
          { name: "Omega-3 Rich Foods", equipment: "Kitchen", thumbnail: "🐟" },
          { name: "Colorful Vegetables", equipment: "Kitchen", thumbnail: "🥗" },
          { name: "Sustained Energy Carbs", equipment: "Kitchen", thumbnail: "🍠" },
          { name: "Afternoon Protein Snack", equipment: "Portable", thumbnail: "🥜" }
        ]
      },
      {
        number: 3,
        title: "Evening Recovery",
        focus: "Preparing for restful sleep",
        exercises: [
          { name: "Light Dinner Options", equipment: "Kitchen", thumbnail: "🥗" },
          { name: "Sleep-Supporting Foods", equipment: "Kitchen", thumbnail: "😴" },
          { name: "Magnesium-Rich Choices", equipment: "Kitchen", thumbnail: "💪" },
          { name: "Avoiding Sleep Disruptors", equipment: "Awareness", thumbnail: "❌" },
          { name: "Evening Hydration Balance", equipment: "Water/herbal tea", thumbnail: "🍵" }
        ]
      },
      {
        number: 4,
        title: "Supplement Support",
        focus: "Strategic supplementation",
        exercises: [
          { name: "Essential Supplements", equipment: "Supplements", thumbnail: "💊" },
          { name: "Timing Optimization", equipment: "Schedule", thumbnail: "⏰" },
          { name: "Quality Protein Sources", equipment: "Protein powder", thumbnail: "💪" },
          { name: "Vitamin D & Minerals", equipment: "Supplements", thumbnail: "☀️" },
          { name: "Sleep Supplements", equipment: "Natural options", thumbnail: "😴" }
        ]
      }
    ]
  },
  "nutrition-4": {
    title: "Travel Day Essentials",
    description: "What Matthieu packs and eats when traveling to matches and tournaments to avoid fatigue and maintain consistent performance despite demanding schedules.",
    category: "Nutrition Program",
    stats: {
      duration: "Travel day plan",
      exercises: "Portable meals",
      length: "Per trip"
    },
    equipment: ["Travel containers", "Cooler bag", "Non-perishable snacks"],
    targetAreas: ["Energy maintenance", "Hydration", "Digestive comfort", "Jet lag management"],
    weeks: [
      {
        number: 1,
        title: "Pre-Travel Prep",
        focus: "Setting up for success",
        exercises: [
          { name: "Meal Prep & Packing", equipment: "Containers", thumbnail: "📦" },
          { name: "Hydration Pre-Loading", equipment: "Water bottle", thumbnail: "💧" },
          { name: "Snack Selection", equipment: "Bags", thumbnail: "🥜" },
          { name: "Supplement Organization", equipment: "Pill organizer", thumbnail: "💊" },
          { name: "Restaurant Research", equipment: "Phone", thumbnail: "📱" }
        ]
      },
      {
        number: 2,
        title: "Airport & Flight",
        focus: "Navigating travel nutrition",
        exercises: [
          { name: "Airport Food Choices", equipment: "Cash/card", thumbnail: "✈️" },
          { name: "In-Flight Hydration", equipment: "Empty bottle", thumbnail: "💧" },
          { name: "Avoiding Bloating Foods", equipment: "Awareness", thumbnail: "❌" },
          { name: "Healthy Snack Timing", equipment: "Packed snacks", thumbnail: "🕐" },
          { name: "Movement & Eating Balance", equipment: "Aisle walks", thumbnail: "🚶" }
        ]
      },
      {
        number: 3,
        title: "Arrival & Adjustment",
        focus: "Time zone nutrition strategy",
        exercises: [
          { name: "First Meal Strategy", equipment: "Restaurant/kitchen", thumbnail: "🍽️" },
          { name: "Circadian Eating", equipment: "Meal timing", thumbnail: "⏰" },
          { name: "Caffeine Management", equipment: "Coffee/tea", thumbnail: "☕" },
          { name: "Light Evening Eating", equipment: "Kitchen", thumbnail: "🥗" },
          { name: "Sleep Prep Nutrition", equipment: "Light foods", thumbnail: "😴" }
        ]
      },
      {
        number: 4,
        title: "On-Site Nutrition",
        focus: "Maintaining routine abroad",
        exercises: [
          { name: "Finding Familiar Foods", equipment: "Research", thumbnail: "🔍" },
          { name: "Grocery Store Essentials", equipment: "Shopping list", thumbnail: "🛒" },
          { name: "Hotel Room Nutrition", equipment: "Mini fridge", thumbnail: "🏨" },
          { name: "Adapting to Local Options", equipment: "Flexibility", thumbnail: "🌍" },
          { name: "Emergency Backup Plan", equipment: "Packed items", thumbnail: "🆘" }
        ]
      }
    ]
  },
  "mental-1": {
    title: "Pre-Match Focus Ritual",
    description: "Matthieu's breathing and visualization routine before stepping on the pitch for important matches. Build the mental clarity that sets up success.",
    category: "Mental Program",
    stats: {
      duration: "30–45 min routine",
      exercises: "5–6 techniques",
      length: "Pre-match"
    },
    equipment: ["Quiet space", "Headphones (optional)", "Journal"],
    targetAreas: ["Focus", "Calm", "Confidence", "Visualization"],
    weeks: [
      {
        number: 1,
        title: "Breathing Foundations",
        focus: "Calming the nervous system",
        exercises: [
          { name: "Box Breathing (4-4-4-4)", equipment: "Quiet space", thumbnail: "🧘" },
          { name: "Deep Belly Breaths", equipment: "Bodyweight", thumbnail: "🌬️" },
          { name: "Progressive Relaxation", equipment: "Quiet space", thumbnail: "😌" },
          { name: "Heart Rate Awareness", equipment: "Awareness", thumbnail: "❤️" },
          { name: "Centering Breath", equipment: "Quiet space", thumbnail: "🎯" }
        ]
      },
      {
        number: 2,
        title: "Visualization Techniques",
        focus: "Seeing success before it happens",
        exercises: [
          { name: "Match Visualization", equipment: "Quiet space", thumbnail: "👁️" },
          { name: "Key Moment Scenarios", equipment: "Mental rehearsal", thumbnail: "🏉" },
          { name: "Physical Sensation Imagery", equipment: "Quiet space", thumbnail: "💪" },
          { name: "Opponent Preparation", equipment: "Video review", thumbnail: "📺" },
          { name: "Victory Moment Visualization", equipment: "Quiet space", thumbnail: "🏆" }
        ]
      },
      {
        number: 3,
        title: "Confidence Building",
        focus: "Activating self-belief",
        exercises: [
          { name: "Affirmation Practice", equipment: "Journal", thumbnail: "📝" },
          { name: "Past Success Recall", equipment: "Memory", thumbnail: "⭐" },
          { name: "Power Pose Routine", equipment: "Mirror", thumbnail: "💪" },
          { name: "Self-Talk Scripts", equipment: "Mental rehearsal", thumbnail: "🗣️" },
          { name: "Gratitude Moment", equipment: "Awareness", thumbnail: "🙏" }
        ]
      },
      {
        number: 4,
        title: "Complete Pre-Match Ritual",
        focus: "Integrating all elements",
        exercises: [
          { name: "2-Hour Pre-Match Timeline", equipment: "Schedule", thumbnail: "⏰" },
          { name: "Warm-Up Integration", equipment: "Pitch access", thumbnail: "🏉" },
          { name: "Final Mental Check", equipment: "Quiet space", thumbnail: "✅" },
          { name: "Tunnel Routine", equipment: "Team area", thumbnail: "🚶" },
          { name: "First Play Focus", equipment: "Mental focus", thumbnail: "🎯" }
        ]
      }
    ]
  },
  "mental-2": {
    title: "Handling Pressure Points",
    description: "The mental cues Matthieu relies on when taking crucial kicks or facing high-pressure moments. Build the composure that wins matches.",
    category: "Mental Program",
    stats: {
      duration: "Ongoing practice",
      exercises: "5–6 techniques",
      length: "In-match"
    },
    equipment: ["On-pitch practice", "Mental rehearsal"],
    targetAreas: ["Composure", "Focus under pressure", "Kick routine", "Clutch performance"],
    weeks: [
      {
        number: 1,
        title: "Pressure Recognition",
        focus: "Understanding your pressure responses",
        exercises: [
          { name: "Physical Symptom Awareness", equipment: "Self-observation", thumbnail: "👁️" },
          { name: "Thought Pattern Tracking", equipment: "Journal", thumbnail: "📝" },
          { name: "Trigger Identification", equipment: "Reflection", thumbnail: "🔍" },
          { name: "Breath Rate Monitoring", equipment: "Awareness", thumbnail: "🌬️" },
          { name: "Pressure Scenario List", equipment: "Journal", thumbnail: "📋" }
        ]
      },
      {
        number: 2,
        title: "Kick Routine Development",
        focus: "Building automatic execution",
        exercises: [
          { name: "Pre-Kick Breathing", equipment: "Quiet focus", thumbnail: "🧘" },
          { name: "Target Visualization", equipment: "Mental imagery", thumbnail: "🎯" },
          { name: "Physical Routine Steps", equipment: "Kicking tee", thumbnail: "🦶" },
          { name: "Crowd Noise Management", equipment: "Mental practice", thumbnail: "🔇" },
          { name: "Routine Timing Practice", equipment: "Stopwatch", thumbnail: "⏱️" }
        ]
      },
      {
        number: 3,
        title: "Clutch Performance",
        focus: "Thriving in big moments",
        exercises: [
          { name: "Embrace Pressure Reframe", equipment: "Mental shift", thumbnail: "💪" },
          { name: "Process Over Outcome", equipment: "Mental focus", thumbnail: "🎯" },
          { name: "One Kick at a Time", equipment: "Awareness", thumbnail: "1️⃣" },
          { name: "Commitment to Execution", equipment: "Decision making", thumbnail: "✅" },
          { name: "Aggressive Mindset Cue", equipment: "Mental trigger", thumbnail: "🔥" }
        ]
      },
      {
        number: 4,
        title: "Pressure Practice",
        focus: "Simulating clutch situations",
        exercises: [
          { name: "Last-Minute Kick Practice", equipment: "Practice field", thumbnail: "⏱️" },
          { name: "Crowd Simulation Kicks", equipment: "Speakers/teammates", thumbnail: "📢" },
          { name: "Fatigue Kick Accuracy", equipment: "After conditioning", thumbnail: "😤" },
          { name: "Win/Lose Scenario Kicks", equipment: "Mental pressure", thumbnail: "🏆" },
          { name: "High-Stakes Practice Games", equipment: "Team practice", thumbnail: "🏉" }
        ]
      }
    ]
  },
  "mental-3": {
    title: "Post-Match Reset Routine",
    description: "How Matthieu decompresses, reflects, and mentally resets after both wins and tough losses. Essential for season-long consistency.",
    category: "Mental Program",
    stats: {
      duration: "60–90 min routine",
      exercises: "5–6 practices",
      length: "Post-match"
    },
    equipment: ["Journal", "Quiet space", "Recovery tools"],
    targetAreas: ["Emotional processing", "Learning extraction", "Mental recovery", "Next match prep"],
    weeks: [
      {
        number: 1,
        title: "Immediate Post-Match",
        focus: "First 30 minutes after final whistle",
        exercises: [
          { name: "Cool-Down Routine", equipment: "Pitch/gym", thumbnail: "🧊" },
          { name: "Hydration & Nutrition", equipment: "Recovery fuel", thumbnail: "💧" },
          { name: "Brief Emotion Check", equipment: "Awareness", thumbnail: "😌" },
          { name: "Coach Debrief", equipment: "Conversation", thumbnail: "🗣️" },
          { name: "Media Management", equipment: "Composure", thumbnail: "🎤" }
        ]
      },
      {
        number: 2,
        title: "Reflection Practice",
        focus: "Learning from the match",
        exercises: [
          { name: "3 Positives Journal", equipment: "Journal", thumbnail: "📝" },
          { name: "1 Key Learning", equipment: "Journal", thumbnail: "💡" },
          { name: "Tactical Review", equipment: "Video/notes", thumbnail: "📺" },
          { name: "Emotional Acknowledgment", equipment: "Self-reflection", thumbnail: "❤️" },
          { name: "Gratitude Practice", equipment: "Journal", thumbnail: "🙏" }
        ]
      },
      {
        number: 3,
        title: "After a Loss",
        focus: "Processing tough outcomes",
        exercises: [
          { name: "Allow the Disappointment", equipment: "Time/space", thumbnail: "😔" },
          { name: "Separate Self from Result", equipment: "Perspective", thumbnail: "🧠" },
          { name: "Identify Controllables", equipment: "Journal", thumbnail: "✅" },
          { name: "Physical Release", equipment: "Exercise", thumbnail: "🏃" },
          { name: "Forward Focus Exercise", equipment: "Goal setting", thumbnail: "➡️" }
        ]
      },
      {
        number: 4,
        title: "After a Win",
        focus: "Celebrating while staying grounded",
        exercises: [
          { name: "Acknowledge the Achievement", equipment: "Celebration", thumbnail: "🎉" },
          { name: "Stay Hungry Mindset", equipment: "Reflection", thumbnail: "🔥" },
          { name: "Avoid Complacency Check", equipment: "Self-awareness", thumbnail: "⚠️" },
          { name: "Next Opponent Focus", equipment: "Preparation", thumbnail: "🎯" },
          { name: "Rest & Recovery Priority", equipment: "Recovery", thumbnail: "😴" }
        ]
      }
    ]
  },
  "mental-4": {
    title: "Confidence Builder Daily Routine",
    description: "Short daily habits that build Matthieu's self-belief and help him stay aggressive in his game plan throughout the season.",
    category: "Mental Program",
    stats: {
      duration: "15–20 min daily",
      exercises: "5–6 habits",
      length: "Ongoing"
    },
    equipment: ["Journal", "Mirror", "Quiet space"],
    targetAreas: ["Self-belief", "Positive mindset", "Daily consistency", "Long-term confidence"],
    weeks: [
      {
        number: 1,
        title: "Morning Mindset",
        focus: "Starting each day strong",
        exercises: [
          { name: "Morning Affirmations", equipment: "Mirror", thumbnail: "🪞" },
          { name: "Daily Intention Setting", equipment: "Journal", thumbnail: "📝" },
          { name: "Gratitude List (3 items)", equipment: "Journal", thumbnail: "🙏" },
          { name: "Visualization (5 min)", equipment: "Quiet space", thumbnail: "👁️" },
          { name: "Physical Wake-Up Routine", equipment: "Bodyweight", thumbnail: "💪" }
        ]
      },
      {
        number: 2,
        title: "Training Confidence",
        focus: "Building belief through practice",
        exercises: [
          { name: "Pre-Training Goal Setting", equipment: "Mental focus", thumbnail: "🎯" },
          { name: "Celebrate Small Wins", equipment: "Awareness", thumbnail: "🎉" },
          { name: "Positive Self-Talk During Drills", equipment: "Mental practice", thumbnail: "🗣️" },
          { name: "End Training on Success", equipment: "Planning", thumbnail: "✅" },
          { name: "Daily Improvement Journal", equipment: "Journal", thumbnail: "📈" }
        ]
      },
      {
        number: 3,
        title: "Evening Reflection",
        focus: "Processing and preparing",
        exercises: [
          { name: "Day Review (What Went Well)", equipment: "Journal", thumbnail: "📝" },
          { name: "Tomorrow's Preparation", equipment: "Planning", thumbnail: "📅" },
          { name: "Letting Go Practice", equipment: "Breathing", thumbnail: "🌬️" },
          { name: "Positive Memory Recall", equipment: "Visualization", thumbnail: "⭐" },
          { name: "Sleep Preparation Routine", equipment: "Relaxation", thumbnail: "😴" }
        ]
      },
      {
        number: 4,
        title: "Weekly Confidence Check",
        focus: "Maintaining long-term belief",
        exercises: [
          { name: "Weekly Wins Review", equipment: "Journal", thumbnail: "🏆" },
          { name: "Progress Tracking", equipment: "Metrics", thumbnail: "📊" },
          { name: "Strength Reminder List", equipment: "Journal", thumbnail: "💪" },
          { name: "Challenge Reframe Exercise", equipment: "Perspective", thumbnail: "🔄" },
          { name: "Next Week Intention", equipment: "Goal setting", thumbnail: "🎯" }
        ]
      }
    ]
  }
};

const defaultProgram = programsData["fitness-1"];

export default function MatthieuTrainingProgramPage() {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { isSubscribed } = useSubscription();
  const [openWeeks, setOpenWeeks] = useState<number[]>([1]);
  const [programStarted, setProgramStarted] = useState(false);

  const isPremiumSubscribed = isSubscribed("matthieu-jalibert");
  const programData = programId ? programsData[programId] || defaultProgram : defaultProgram;
  const bannerImage = programId ? programImages[programId] || fitnessSpeed : fitnessSpeed;

  // Redirect non-premium users
  useEffect(() => {
    if (!isPremiumSubscribed) {
      navigate(`/athlete/matthieu-jalibert`);
    }
  }, [isPremiumSubscribed, navigate]);

  const toggleWeek = (weekNum: number) => {
    setOpenWeeks(prev => 
      prev.includes(weekNum) 
        ? prev.filter(w => w !== weekNum)
        : [...prev, weekNum]
    );
  };

  const handleStartProgram = () => {
    setProgramStarted(true);
  };

  if (!isPremiumSubscribed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <Lock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Premium Content</h2>
          <p className="text-muted-foreground mb-4">Subscribe to access this training program</p>
          <Button onClick={() => navigate(`/subscribe/matthieu-jalibert`)}>
            Unlock Premium
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <AthleteHeader />
      
      {/* Banner Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img 
          src={bannerImage} 
          alt={programData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/50 backdrop-blur-sm hover:bg-background/70"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Banner Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Badge className="mb-3 bg-primary/90">{programData.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl">
            {programData.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
            {programData.description}
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center bg-muted/30 border-border/50">
            <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="font-semibold">{programData.stats.duration}</p>
          </Card>
          <Card className="p-4 text-center bg-muted/30 border-border/50">
            <Dumbbell className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Exercises</p>
            <p className="font-semibold">{programData.stats.exercises} per session</p>
          </Card>
          <Card className="p-4 text-center bg-muted/30 border-border/50">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Program Length</p>
            <p className="font-semibold">{programData.stats.length}</p>
          </Card>
        </div>

        {/* Equipment & Target Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card className="p-6 bg-muted/20 border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Equipment Needed</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.equipment.map((item) => (
                <Badge key={item} variant="secondary" className="px-3 py-1">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-muted/20 border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Target Areas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.targetAreas.map((area) => (
                <Badge key={area} variant="outline" className="px-3 py-1 border-primary/50 text-primary">
                  {area}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Weekly Breakdown */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Weekly Breakdown</h2>
          <div className="space-y-4">
            {programData.weeks.map((week) => (
              <Collapsible 
                key={week.number}
                open={openWeeks.includes(week.number)}
                onOpenChange={() => toggleWeek(week.number)}
              >
                <Card className="overflow-hidden border-border/50">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="text-left">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                            Week {week.number}
                          </span>
                          <h3 className="font-semibold">{week.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{week.focus}</p>
                      </div>
                      {openWeeks.includes(week.number) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-5 pb-5 pt-2 border-t border-border/50">
                      <div className="grid gap-3">
                        {week.exercises.map((exercise, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl">
                              {exercise.thumbnail}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{exercise.name}</p>
                              <p className="text-xs text-muted-foreground">{exercise.equipment}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Info className="h-4 w-4" />
                            </Button>
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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border/50">
        <div className="container mx-auto max-w-lg">
          <Button 
            variant="gold" 
            size="lg" 
            className="w-full text-base font-semibold"
            onClick={handleStartProgram}
          >
            {programStarted ? "Resume Program" : "Start Week 1"}
          </Button>
        </div>
      </div>
    </div>
  );
}
