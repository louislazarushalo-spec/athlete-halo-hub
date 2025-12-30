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
import action1 from "@/assets/arthur-cazaux-action1.png";
import action2 from "@/assets/arthur-cazaux-action2.png";
import action3 from "@/assets/arthur-cazaux-action3.png";
import action4 from "@/assets/arthur-cazaux-action4.png";
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

// Program image mapping
const programImages: Record<string, string> = {
  "fitness-1": action1,
  "fitness-2": action2,
  "fitness-3": action3,
  "fitness-4": action4,
  "skills-1": skills1,
  "skills-2": skills2,
  "skills-3": skills3,
  "skills-4": skills4,
  "nutrition-1": nutrition1,
  "nutrition-2": nutrition2,
  "nutrition-3": nutrition3,
  "nutrition-4": nutrition4,
  "mental-1": mentalReal1,
  "mental-2": mentalReal3,
  "mental-3": mentalReal2,
  "mental-4": action2,
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
    title: "Court Movement & Footwork Speed",
    description: "A 4-week program designed to develop fast first steps, quick recoveries, and sharp direction changes. Build the agility foundation that allows you to reach every ball and recover for the next shot.",
    category: "Fitness Program",
    stats: {
      duration: "45–60 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Agility ladder", "Cones", "Resistance bands", "Bodyweight"],
    targetAreas: ["Footwork", "First step explosiveness", "Recovery speed", "Direction changes"],
    weeks: [
      {
        number: 1,
        title: "Foundation Movement Patterns",
        focus: "Building basic court movement and split step timing",
        exercises: [
          { name: "Split Step Timing Drills", equipment: "Bodyweight", thumbnail: "🎾" },
          { name: "Lateral Shuffle Series", equipment: "Cones", thumbnail: "👟" },
          { name: "Forward/Backward Transitions", equipment: "Cones", thumbnail: "⚡" },
          { name: "Crossover Step Practice", equipment: "Bodyweight", thumbnail: "🦵" },
          { name: "Reaction Ball Catches", equipment: "Reaction ball", thumbnail: "🔥" },
          { name: "Recovery Step Patterns", equipment: "Cones", thumbnail: "🎯" }
        ]
      },
      {
        number: 2,
        title: "Speed & Quickness",
        focus: "Increasing movement velocity and reaction time",
        exercises: [
          { name: "Ladder Quick Feet Drills", equipment: "Agility ladder", thumbnail: "👟" },
          { name: "Cone Sprint Patterns", equipment: "Cones", thumbnail: "🏃" },
          { name: "Reactive Direction Changes", equipment: "Cones", thumbnail: "⚡" },
          { name: "First Step Explosions", equipment: "Resistance bands", thumbnail: "💥" },
          { name: "Shadow Court Movement", equipment: "Bodyweight", thumbnail: "🎾" },
          { name: "Multi-Directional Hops", equipment: "Bodyweight", thumbnail: "🦵" }
        ]
      },
      {
        number: 3,
        title: "Court Coverage Patterns",
        focus: "Tennis-specific movement sequences",
        exercises: [
          { name: "Wide Ball Recovery Drills", equipment: "Cones", thumbnail: "🎾" },
          { name: "Net Approach Footwork", equipment: "Cones", thumbnail: "🏃" },
          { name: "Defensive Slide & Reset", equipment: "Bodyweight", thumbnail: "💪" },
          { name: "Drop Shot Chase Patterns", equipment: "Cones", thumbnail: "💨" },
          { name: "Corner to Corner Sprints", equipment: "Cones", thumbnail: "🔥" }
        ]
      },
      {
        number: 4,
        title: "Match-Ready Movement",
        focus: "Integrating footwork into point play",
        exercises: [
          { name: "Point Simulation Footwork", equipment: "Cones", thumbnail: "🏆" },
          { name: "Random Feed Movement", equipment: "Cones", thumbnail: "🎾" },
          { name: "Fatigue Resistance Drills", equipment: "Bodyweight", thumbnail: "💪" },
          { name: "Recovery Under Pressure", equipment: "Cones", thumbnail: "⚡" },
          { name: "Match Intensity Patterns", equipment: "Cones", thumbnail: "🔥" }
        ]
      }
    ]
  },
  "fitness-2": {
    title: "Match-Ready Endurance Set",
    description: "A 4-week interval program designed to keep you explosive deep into long sets. Mixing court sprints with short rest to build the stamina needed for 3-hour battles.",
    category: "Fitness Program",
    stats: {
      duration: "50–70 min per session",
      exercises: "5–7",
      length: "4 weeks"
    },
    equipment: ["Tennis court", "Cones", "Heart rate monitor", "Stopwatch"],
    targetAreas: ["Cardiovascular endurance", "Lactate threshold", "Recovery capacity", "Mental stamina"],
    weeks: [
      {
        number: 1,
        title: "Aerobic Base Building",
        focus: "Establishing endurance foundation",
        exercises: [
          { name: "Continuous Court Movement", equipment: "Tennis court", thumbnail: "🏃" },
          { name: "Light Interval Sprints", equipment: "Cones", thumbnail: "⚡" },
          { name: "Active Recovery Jogs", equipment: "Bodyweight", thumbnail: "🔄" },
          { name: "Point Play Simulations (Light)", equipment: "Tennis court", thumbnail: "🎾" },
          { name: "Breathing Control Drills", equipment: "Bodyweight", thumbnail: "🧘" }
        ]
      },
      {
        number: 2,
        title: "Interval Introduction",
        focus: "Building work-to-rest ratios",
        exercises: [
          { name: "20/40 Sprint Intervals", equipment: "Tennis court", thumbnail: "🔥" },
          { name: "Court Sprint Pyramids", equipment: "Cones", thumbnail: "📈" },
          { name: "Shadow Point Intervals", equipment: "Bodyweight", thumbnail: "🎾" },
          { name: "Recovery Pace Control", equipment: "Heart rate monitor", thumbnail: "❤️" },
          { name: "Extended Rally Simulations", equipment: "Tennis court", thumbnail: "⏱️" }
        ]
      },
      {
        number: 3,
        title: "Threshold Training",
        focus: "Pushing lactate tolerance",
        exercises: [
          { name: "High-Intensity Court Sprints", equipment: "Tennis court", thumbnail: "🚀" },
          { name: "Repeat Sprint Sets", equipment: "Cones", thumbnail: "💥" },
          { name: "Minimal Rest Intervals", equipment: "Stopwatch", thumbnail: "⏱️" },
          { name: "Match-Pace Point Runs", equipment: "Tennis court", thumbnail: "🎾" },
          { name: "Mental Toughness Finishers", equipment: "Bodyweight", thumbnail: "🧠" }
        ]
      },
      {
        number: 4,
        title: "Match Simulation",
        focus: "Race-day readiness",
        exercises: [
          { name: "Full Set Simulation", equipment: "Tennis court", thumbnail: "🏆" },
          { name: "Tie-Break Intensity Intervals", equipment: "Cones", thumbnail: "⚡" },
          { name: "Third Set Energy Management", equipment: "Tennis court", thumbnail: "🎾" },
          { name: "Recovery Between Sets", equipment: "Bodyweight", thumbnail: "🔄" },
          { name: "Clutch Moment Drills", equipment: "Tennis court", thumbnail: "💪" }
        ]
      }
    ]
  },
  "fitness-3": {
    title: "Rotational Power for Forehand & Backhand",
    description: "A 4-week program designed to build the rotational strength, trunk stability, and power behind Arthur's forehand and backhand. Structured to increase ball speed, improve balance, and develop the explosive core mechanics needed for high-level match play.",
    category: "Fitness Program",
    stats: {
      duration: "45–60 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Dumbbells", "Medicine ball", "Resistance bands", "Bodyweight"],
    targetAreas: ["Core", "Trunk rotation", "Hips and glutes", "Shoulders"],
    weeks: [
      {
        number: 1,
        title: "Core Activation & Baseline Rotation",
        focus: "Building foundational core stability and rotation patterns",
        exercises: [
          { name: "Dead Bug with Rotation", equipment: "Bodyweight", thumbnail: "🏋️" },
          { name: "Pallof Press Hold", equipment: "Resistance bands", thumbnail: "💪" },
          { name: "Medicine Ball Side Throw", equipment: "Medicine ball", thumbnail: "🎾" },
          { name: "Bird Dog with Reach", equipment: "Bodyweight", thumbnail: "🧘" },
          { name: "Half-Kneeling Cable Chop", equipment: "Resistance bands", thumbnail: "⚡" },
          { name: "Rotational Plank", equipment: "Bodyweight", thumbnail: "🔥" }
        ]
      },
      {
        number: 2,
        title: "Added Load & Speed",
        focus: "Increasing resistance and movement velocity",
        exercises: [
          { name: "Rotational Band Pull", equipment: "Resistance bands", thumbnail: "💪" },
          { name: "Weighted Russian Twist", equipment: "Dumbbells", thumbnail: "🏋️" },
          { name: "Medicine Ball Slam (Rotational)", equipment: "Medicine ball", thumbnail: "💥" },
          { name: "Landmine Rotation Press", equipment: "Dumbbells", thumbnail: "⚡" },
          { name: "Side Plank with Rotation", equipment: "Bodyweight", thumbnail: "🔥" },
          { name: "Cable Woodchop (Low to High)", equipment: "Resistance bands", thumbnail: "🎾" }
        ]
      },
      {
        number: 3,
        title: "Explosive Rotational Power",
        focus: "Maximum power output and explosive movements",
        exercises: [
          { name: "Rotational Box Jump", equipment: "Bodyweight", thumbnail: "🚀" },
          { name: "Medicine Ball Shotput Throw", equipment: "Medicine ball", thumbnail: "💪" },
          { name: "Explosive Cable Rotation", equipment: "Resistance bands", thumbnail: "⚡" },
          { name: "Jumping Lunge with Twist", equipment: "Bodyweight", thumbnail: "🔥" },
          { name: "Rotational Slam Ball", equipment: "Medicine ball", thumbnail: "💥" }
        ]
      },
      {
        number: 4,
        title: "Match-Specific Power & Stability",
        focus: "Sport-specific movements mimicking match conditions",
        exercises: [
          { name: "Forehand Power Rotation", equipment: "Resistance bands", thumbnail: "🎾" },
          { name: "Backhand Explosive Pull", equipment: "Resistance bands", thumbnail: "🎾" },
          { name: "Split-Stance Rotational Throw", equipment: "Medicine ball", thumbnail: "💪" },
          { name: "Reactive Core Stabilization", equipment: "Bodyweight", thumbnail: "⚡" },
          { name: "Match-Tempo Cable Rotations", equipment: "Resistance bands", thumbnail: "🔥" },
          { name: "Integrated Power Sequence", equipment: "Medicine ball", thumbnail: "🏆" }
        ]
      }
    ]
  },
  "fitness-4": {
    title: "Recovery Mobility Routine",
    description: "A 4-week mobility program designed to keep you loose, reduce stiffness, and prevent injury after tough match days. Essential for maintaining movement quality throughout a demanding season.",
    category: "Fitness Program",
    stats: {
      duration: "30–45 min per session",
      exercises: "8–10",
      length: "4 weeks"
    },
    equipment: ["Foam roller", "Lacrosse ball", "Resistance bands", "Yoga mat"],
    targetAreas: ["Hips", "Shoulders", "Thoracic spine", "Ankles"],
    weeks: [
      {
        number: 1,
        title: "Foundation Mobility",
        focus: "Basic mobility patterns and tissue work",
        exercises: [
          { name: "Foam Roll Full Body", equipment: "Foam roller", thumbnail: "🧘" },
          { name: "Hip 90/90 Stretches", equipment: "Yoga mat", thumbnail: "🦵" },
          { name: "Thoracic Spine Rotations", equipment: "Bodyweight", thumbnail: "🔄" },
          { name: "Shoulder Circles & Stretches", equipment: "Bodyweight", thumbnail: "💫" },
          { name: "Ankle Mobility Drills", equipment: "Bodyweight", thumbnail: "👟" }
        ]
      },
      {
        number: 2,
        title: "Deep Tissue Release",
        focus: "Targeted trigger point work",
        exercises: [
          { name: "Lacrosse Ball Hip Work", equipment: "Lacrosse ball", thumbnail: "🎯" },
          { name: "Glute Release Techniques", equipment: "Foam roller", thumbnail: "🍑" },
          { name: "Forearm & Wrist Mobility", equipment: "Bodyweight", thumbnail: "💪" },
          { name: "Calf & Achilles Release", equipment: "Lacrosse ball", thumbnail: "🦵" },
          { name: "Upper Back Release", equipment: "Foam roller", thumbnail: "🧘" }
        ]
      },
      {
        number: 3,
        title: "Dynamic Flexibility",
        focus: "Active mobility and controlled movements",
        exercises: [
          { name: "World's Greatest Stretch", equipment: "Bodyweight", thumbnail: "🌍" },
          { name: "Leg Swings & Circles", equipment: "Bodyweight", thumbnail: "🔄" },
          { name: "Arm Circles & Shoulder Flow", equipment: "Bodyweight", thumbnail: "💫" },
          { name: "Spinal Wave Movements", equipment: "Yoga mat", thumbnail: "🐍" },
          { name: "Active Hip Openers", equipment: "Bodyweight", thumbnail: "🦵" }
        ]
      },
      {
        number: 4,
        title: "Recovery Integration",
        focus: "Complete recovery routine",
        exercises: [
          { name: "Full Body Flow Sequence", equipment: "Yoga mat", thumbnail: "🧘" },
          { name: "Breathing & Relaxation", equipment: "Bodyweight", thumbnail: "🌬️" },
          { name: "Gentle Movement Prep", equipment: "Bodyweight", thumbnail: "💫" },
          { name: "Sleep Prep Stretches", equipment: "Yoga mat", thumbnail: "😴" },
          { name: "Mindful Body Scan", equipment: "Bodyweight", thumbnail: "🧠" }
        ]
      }
    ]
  },
  "skills-1": {
    title: "Heavy Forehand Patterns",
    description: "A 4-week technical program focused on the forehand patterns Arthur drills every week, including inside-out, inside-in, and finishing at the net. Build the weapons that win points.",
    category: "Skills Program",
    stats: {
      duration: "60–75 min per session",
      exercises: "5–6 patterns",
      length: "4 weeks"
    },
    equipment: ["Tennis racket", "Ball hopper", "Cones", "Target markers"],
    targetAreas: ["Forehand technique", "Court positioning", "Shot selection", "Finishing ability"],
    weeks: [
      {
        number: 1,
        title: "Forehand Foundation",
        focus: "Building consistent heavy topspin",
        exercises: [
          { name: "Baseline Rally Consistency", equipment: "Tennis racket", thumbnail: "🎾" },
          { name: "Heavy Topspin Development", equipment: "Tennis racket", thumbnail: "🔄" },
          { name: "Crosscourt Depth Control", equipment: "Target markers", thumbnail: "🎯" },
          { name: "Contact Point Awareness", equipment: "Tennis racket", thumbnail: "👁️" },
          { name: "Recovery & Reset Patterns", equipment: "Cones", thumbnail: "👟" }
        ]
      },
      {
        number: 2,
        title: "Inside-Out Mastery",
        focus: "Dominating with the inside-out forehand",
        exercises: [
          { name: "Inside-Out Pattern Drills", equipment: "Cones", thumbnail: "↗️" },
          { name: "Footwork for Running Forehand", equipment: "Cones", thumbnail: "👟" },
          { name: "Target Practice Inside-Out", equipment: "Target markers", thumbnail: "🎯" },
          { name: "Point Construction Patterns", equipment: "Tennis racket", thumbnail: "🧠" },
          { name: "Pressure Situation Reps", equipment: "Tennis racket", thumbnail: "💪" }
        ]
      },
      {
        number: 3,
        title: "Inside-In Attack",
        focus: "Hitting winners down the line",
        exercises: [
          { name: "Inside-In Winner Drills", equipment: "Tennis racket", thumbnail: "💥" },
          { name: "Timing & Disguise Work", equipment: "Tennis racket", thumbnail: "🎭" },
          { name: "Open Stance Power Shots", equipment: "Tennis racket", thumbnail: "⚡" },
          { name: "Approach & Finish Combos", equipment: "Cones", thumbnail: "🏃" },
          { name: "Match-Point Scenarios", equipment: "Tennis racket", thumbnail: "🏆" }
        ]
      },
      {
        number: 4,
        title: "Net Finishing",
        focus: "Coming forward behind the forehand",
        exercises: [
          { name: "Approach Shot Patterns", equipment: "Cones", thumbnail: "🏃" },
          { name: "Forehand to Volley Transition", equipment: "Tennis racket", thumbnail: "🎾" },
          { name: "Put-Away Volleys", equipment: "Tennis racket", thumbnail: "💥" },
          { name: "Swinging Volley Practice", equipment: "Tennis racket", thumbnail: "⚡" },
          { name: "Complete Point Patterns", equipment: "Cones", thumbnail: "🏆" }
        ]
      }
    ]
  },
  "skills-2": {
    title: "Serve + First Ball Domination",
    description: "A 4-week program focused on taking control early in the point through serve placement and aggressive first shots. Build the playbook to dominate service games.",
    category: "Skills Program",
    stats: {
      duration: "60–75 min per session",
      exercises: "5–6 patterns",
      length: "4 weeks"
    },
    equipment: ["Tennis racket", "Ball hopper", "Cones", "Target markers"],
    targetAreas: ["Serve technique", "Placement accuracy", "First ball aggression", "Point construction"],
    weeks: [
      {
        number: 1,
        title: "Serve Foundations",
        focus: "Building consistent serve mechanics",
        exercises: [
          { name: "Serve Motion Drills", equipment: "Tennis racket", thumbnail: "🎾" },
          { name: "Toss Consistency Work", equipment: "Tennis racket", thumbnail: "🎯" },
          { name: "Power Development", equipment: "Tennis racket", thumbnail: "💪" },
          { name: "First Serve Percentage", equipment: "Ball hopper", thumbnail: "📊" },
          { name: "Second Serve Reliability", equipment: "Tennis racket", thumbnail: "🔄" }
        ]
      },
      {
        number: 2,
        title: "Placement Mastery",
        focus: "Hitting serve targets consistently",
        exercises: [
          { name: "Wide Serve Patterns", equipment: "Target markers", thumbnail: "↗️" },
          { name: "T-Serve Precision", equipment: "Target markers", thumbnail: "🎯" },
          { name: "Body Serve Tactics", equipment: "Tennis racket", thumbnail: "👤" },
          { name: "Kick Serve Development", equipment: "Tennis racket", thumbnail: "🔄" },
          { name: "Slice Serve Angles", equipment: "Tennis racket", thumbnail: "↘️" }
        ]
      },
      {
        number: 3,
        title: "Serve + 1 Patterns",
        focus: "Aggressive first ball setups",
        exercises: [
          { name: "Serve Wide + Inside-Out", equipment: "Cones", thumbnail: "🎾" },
          { name: "Serve T + Down the Line", equipment: "Cones", thumbnail: "💥" },
          { name: "Serve & Volley Patterns", equipment: "Tennis racket", thumbnail: "🏃" },
          { name: "Short Ball Attack", equipment: "Cones", thumbnail: "⚡" },
          { name: "Recovery Positioning", equipment: "Cones", thumbnail: "👟" }
        ]
      },
      {
        number: 4,
        title: "Match Domination",
        focus: "Winning service games under pressure",
        exercises: [
          { name: "Deuce Point Patterns", equipment: "Tennis racket", thumbnail: "🎾" },
          { name: "Ad Point Strategies", equipment: "Tennis racket", thumbnail: "🧠" },
          { name: "Game Point Execution", equipment: "Tennis racket", thumbnail: "🏆" },
          { name: "Tie-Break Serving", equipment: "Tennis racket", thumbnail: "⚡" },
          { name: "Pressure Simulation", equipment: "Tennis racket", thumbnail: "💪" }
        ]
      }
    ]
  },
  "skills-3": {
    title: "Backhand Stability Under Pressure",
    description: "A 4-week repetition program designed to keep your backhand solid and reliable against deep, heavy balls. Build the consistency that wins rallies.",
    category: "Skills Program",
    stats: {
      duration: "60–75 min per session",
      exercises: "5–6 patterns",
      length: "4 weeks"
    },
    equipment: ["Tennis racket", "Ball hopper", "Cones", "Target markers"],
    targetAreas: ["Backhand technique", "Consistency", "Defensive stability", "Rally endurance"],
    weeks: [
      {
        number: 1,
        title: "Backhand Mechanics",
        focus: "Reinforcing proper technique",
        exercises: [
          { name: "Contact Point Drills", equipment: "Tennis racket", thumbnail: "🎾" },
          { name: "Unit Turn Practice", equipment: "Tennis racket", thumbnail: "🔄" },
          { name: "Follow-Through Extension", equipment: "Tennis racket", thumbnail: "➡️" },
          { name: "Crosscourt Consistency", equipment: "Target markers", thumbnail: "🎯" },
          { name: "Footwork Integration", equipment: "Cones", thumbnail: "👟" }
        ]
      },
      {
        number: 2,
        title: "Handling Heavy Balls",
        focus: "Staying solid against power",
        exercises: [
          { name: "Deep Ball Absorption", equipment: "Tennis racket", thumbnail: "💪" },
          { name: "High Ball Management", equipment: "Tennis racket", thumbnail: "⬆️" },
          { name: "Reset Shots Practice", equipment: "Target markers", thumbnail: "🔄" },
          { name: "Defensive Depth Control", equipment: "Tennis racket", thumbnail: "🎯" },
          { name: "Recovery Footwork", equipment: "Cones", thumbnail: "👟" }
        ]
      },
      {
        number: 3,
        title: "Pressure Situations",
        focus: "Maintaining form under stress",
        exercises: [
          { name: "Extended Rally Drills", equipment: "Tennis racket", thumbnail: "⏱️" },
          { name: "Behind in Rally Recovery", equipment: "Tennis racket", thumbnail: "🔙" },
          { name: "Point-Ending Backhand", equipment: "Tennis racket", thumbnail: "💥" },
          { name: "Mental Focus Reps", equipment: "Tennis racket", thumbnail: "🧠" },
          { name: "Fatigue Simulation", equipment: "Cones", thumbnail: "💪" }
        ]
      },
      {
        number: 4,
        title: "Match Integration",
        focus: "Using backhand in point play",
        exercises: [
          { name: "Cross-Court Rally Games", equipment: "Tennis racket", thumbnail: "🏆" },
          { name: "Backhand-to-Forehand Transition", equipment: "Cones", thumbnail: "🔄" },
          { name: "Approach Shot Backhand", equipment: "Tennis racket", thumbnail: "🏃" },
          { name: "Passing Shot Practice", equipment: "Target markers", thumbnail: "💨" },
          { name: "Match Point Scenarios", equipment: "Tennis racket", thumbnail: "🎾" }
        ]
      }
    ]
  },
  "skills-4": {
    title: "Transition to the Net and Finishing Points",
    description: "A 4-week program focused on footwork sequences, volley precision and swing volleys that help you finish points confidently at the net.",
    category: "Skills Program",
    stats: {
      duration: "60–75 min per session",
      exercises: "5–6 patterns",
      length: "4 weeks"
    },
    equipment: ["Tennis racket", "Ball hopper", "Cones", "Target markers"],
    targetAreas: ["Net transitions", "Volley technique", "Point finishing", "Court coverage"],
    weeks: [
      {
        number: 1,
        title: "Approach Fundamentals",
        focus: "Building approach shot technique",
        exercises: [
          { name: "Approach Shot Footwork", equipment: "Cones", thumbnail: "👟" },
          { name: "Split Step Timing at Net", equipment: "Tennis racket", thumbnail: "⚡" },
          { name: "First Volley Placement", equipment: "Target markers", thumbnail: "🎯" },
          { name: "Recovery Positioning", equipment: "Cones", thumbnail: "🔄" },
          { name: "Closing Speed Drills", equipment: "Cones", thumbnail: "🏃" }
        ]
      },
      {
        number: 2,
        title: "Volley Precision",
        focus: "Developing touch and placement",
        exercises: [
          { name: "Forehand Volley Angles", equipment: "Target markers", thumbnail: "↗️" },
          { name: "Backhand Volley Depth", equipment: "Target markers", thumbnail: "🎾" },
          { name: "Low Volley Technique", equipment: "Tennis racket", thumbnail: "⬇️" },
          { name: "High Volley Put-Aways", equipment: "Tennis racket", thumbnail: "💥" },
          { name: "Reflex Volley Drills", equipment: "Tennis racket", thumbnail: "⚡" }
        ]
      },
      {
        number: 3,
        title: "Swing Volley Mastery",
        focus: "Aggressive finishing shots",
        exercises: [
          { name: "Swing Volley Technique", equipment: "Tennis racket", thumbnail: "💥" },
          { name: "Mid-Court Power Shots", equipment: "Tennis racket", thumbnail: "⚡" },
          { name: "Drive Volley Patterns", equipment: "Cones", thumbnail: "🏃" },
          { name: "Overhead Finishing", equipment: "Tennis racket", thumbnail: "⬆️" },
          { name: "Touch Drop Volleys", equipment: "Target markers", thumbnail: "🪶" }
        ]
      },
      {
        number: 4,
        title: "Point Finishing",
        focus: "Complete net game integration",
        exercises: [
          { name: "Approach + Finish Combos", equipment: "Cones", thumbnail: "🏆" },
          { name: "Passing Shot Defense", equipment: "Tennis racket", thumbnail: "🛡️" },
          { name: "Lob Recovery Technique", equipment: "Tennis racket", thumbnail: "🔙" },
          { name: "Doubles Net Play", equipment: "Tennis racket", thumbnail: "👥" },
          { name: "Clutch Finishing Drills", equipment: "Tennis racket", thumbnail: "💪" }
        ]
      }
    ]
  },
  "nutrition-1": {
    title: "Match Day Fuel Plan",
    description: "A complete guide to what Arthur eats before, during, and after matches to stay energized, sharp, and fully recovered. Optimize your nutrition for peak performance.",
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
        focus: "Fueling 3-4 hours before match",
        exercises: [
          { name: "Carb Loading Breakfast", equipment: "Kitchen", thumbnail: "🥣" },
          { name: "Timing Your Last Meal", equipment: "Clock", thumbnail: "⏰" },
          { name: "Hydration Start Protocol", equipment: "Water bottle", thumbnail: "💧" },
          { name: "Pre-Match Snack Options", equipment: "Kitchen", thumbnail: "🍌" },
          { name: "Avoiding Digestive Issues", equipment: "Kitchen", thumbnail: "✅" }
        ]
      },
      {
        number: 2,
        title: "During Match Fueling",
        focus: "Staying energized through long matches",
        exercises: [
          { name: "Changeover Nutrition", equipment: "Court bag", thumbnail: "🎾" },
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
          { name: "Urine Color Monitoring", equipment: "Awareness", thumbnail: "✅" }
        ]
      }
    ]
  },
  "nutrition-2": {
    title: "Tournament Week Eating Routine",
    description: "Arthur's daily nutrition structure during multi-day events, built to keep digestion light and energy constant throughout demanding tournament weeks.",
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
        title: "Early Round Days",
        focus: "Building through the draw",
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
        title: "Deep in Tournament",
        focus: "Maintaining peak performance",
        exercises: [
          { name: "Quarter/Semi Final Prep", equipment: "Kitchen", thumbnail: "🏆" },
          { name: "Multiple Match Days", equipment: "Meal timing", thumbnail: "📅" },
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
    description: "What Arthur packs and eats when traveling to events to avoid fatigue and maintain consistent performance despite demanding schedules.",
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
    description: "Arthur's breathing and visualization routine before stepping on court for important matches. Build the mental clarity that sets up success.",
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
          { name: "Key Point Scenarios", equipment: "Mental rehearsal", thumbnail: "🎾" },
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
          { name: "Warm-Up Integration", equipment: "Court access", thumbnail: "🎾" },
          { name: "Final Mental Check", equipment: "Quiet space", thumbnail: "✅" },
          { name: "Walk-On Routine", equipment: "Court entrance", thumbnail: "🚶" },
          { name: "First Point Focus", equipment: "Mental focus", thumbnail: "🎯" }
        ]
      }
    ]
  },
  "mental-2": {
    title: "Handling Pressure Points",
    description: "The mental cues Arthur relies on when serving out sets or facing break points. Build the composure that wins clutch moments.",
    category: "Mental Program",
    stats: {
      duration: "Ongoing practice",
      exercises: "5–6 techniques",
      length: "In-match"
    },
    equipment: ["On-court practice", "Mental rehearsal"],
    targetAreas: ["Composure", "Focus under pressure", "Point-by-point mindset", "Clutch performance"],
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
        title: "Reset Techniques",
        focus: "Quick recovery between points",
        exercises: [
          { name: "Ball Bounce Routine", equipment: "Tennis ball", thumbnail: "🎾" },
          { name: "String Check Ritual", equipment: "Racket", thumbnail: "🔧" },
          { name: "Baseline Breath", equipment: "On-court", thumbnail: "🧘" },
          { name: "Towel Break Reset", equipment: "Towel", thumbnail: "🧺" },
          { name: "Eye Focus Technique", equipment: "Court markers", thumbnail: "👁️" }
        ]
      },
      {
        number: 3,
        title: "Clutch Point Mindset",
        focus: "Thriving in big moments",
        exercises: [
          { name: "Embrace Pressure Reframe", equipment: "Mental shift", thumbnail: "💪" },
          { name: "Process Over Outcome", equipment: "Mental focus", thumbnail: "🎯" },
          { name: "One Point at a Time", equipment: "Awareness", thumbnail: "1️⃣" },
          { name: "Commitment to Shot", equipment: "Decision making", thumbnail: "✅" },
          { name: "Aggressive Mindset Cue", equipment: "Mental trigger", thumbnail: "🔥" }
        ]
      },
      {
        number: 4,
        title: "Pressure Practice",
        focus: "Simulating clutch situations",
        exercises: [
          { name: "Tie-Break Practice Matches", equipment: "Practice partner", thumbnail: "🎾" },
          { name: "Serve-Out-Set Drills", equipment: "Practice partner", thumbnail: "💪" },
          { name: "Down a Break Scenarios", equipment: "Practice partner", thumbnail: "📉" },
          { name: "Crowd Noise Simulation", equipment: "Speakers", thumbnail: "📢" },
          { name: "High-Stakes Point Games", equipment: "Practice partner", thumbnail: "🏆" }
        ]
      }
    ]
  },
  "mental-3": {
    title: "Post-Match Reset Routine",
    description: "How Arthur decompresses, reflects, and mentally resets after both wins and tough losses. Essential for tournament consistency.",
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
        focus: "First 30 minutes after match",
        exercises: [
          { name: "Cool-Down Routine", equipment: "Court/gym", thumbnail: "🧊" },
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
    description: "Short daily habits that build Arthur's self-belief and help him stay aggressive in his game plan throughout the season.",
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
          { name: "Pre-Practice Goal Setting", equipment: "Mental focus", thumbnail: "🎯" },
          { name: "Celebrate Small Wins", equipment: "Awareness", thumbnail: "🎉" },
          { name: "Positive Self-Talk During Drills", equipment: "Mental practice", thumbnail: "🗣️" },
          { name: "End Practice on Success", equipment: "Planning", thumbnail: "✅" },
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

const defaultProgram = programsData["fitness-3"];

export default function TrainingProgramPage() {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { isSubscribed } = useSubscription();
  const [openWeeks, setOpenWeeks] = useState<number[]>([1]);
  const [programStarted, setProgramStarted] = useState(false);

  const isPremiumSubscribed = isSubscribed("arthur-cazaux");
  const programData = programId ? programsData[programId] || defaultProgram : defaultProgram;
  const bannerImage = programId ? programImages[programId] || action3 : action3;

  // Redirect non-premium users
  useEffect(() => {
    if (!isPremiumSubscribed) {
      navigate(`/athlete/arthur-cazaux`);
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
          <Button onClick={() => navigate(`/subscribe/arthur-cazaux`)}>
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
