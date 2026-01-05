import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Dumbbell, Calendar, Target, Info, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { AthleteHeader } from "@/components/layout/AthleteHeader";

// Training program images
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

// Program image mapping
const programImages: Record<string, string> = {
  "fitness-1": pierreFitness1,
  "fitness-2": pierreFitness2,
  "fitness-3": pierreFitness3,
  "fitness-4": pierreFitness4,
  "skills-1": pierreSkills1,
  "skills-2": pierreSkills2,
  "skills-3": pierreSkills3,
  "skills-4": pierreSkills4,
  "mental-1": pierreMental1,
  "mental-2": pierreMental2,
  "mental-3": pierreMental3,
  "mental-4": pierreMental4,
  "nutrition-1": pierreNutrition1,
  "nutrition-2": pierreNutrition2,
  "nutrition-3": pierreNutrition3,
  "nutrition-4": pierreNutrition4,
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
    title: "Neck & Core Strengthening",
    description: "A 4-week program designed to build the neck and core strength essential for handling 5G+ forces during high-speed cornering and heavy braking. F1 drivers experience forces that pull the head sideways and forward—this routine prepares you for the demands of the cockpit.",
    category: "Fitness Program",
    stats: {
      duration: "45–60 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Neck harness", "Resistance bands", "Medicine ball", "Cable machine", "Stability ball"],
    targetAreas: ["Neck muscles", "Core stability", "Trap development", "Spinal erectors"],
    weeks: [
      {
        number: 1,
        title: "Foundation Building",
        focus: "Establishing base neck and core strength with controlled movements",
        exercises: [
          { name: "Neck Flexion/Extension Holds", equipment: "Resistance band", thumbnail: "🔥" },
          { name: "Isometric Lateral Neck Holds", equipment: "Bodyweight", thumbnail: "💪" },
          { name: "Dead Bug Progressions", equipment: "Bodyweight", thumbnail: "🦎" },
          { name: "Pallof Press", equipment: "Cable machine", thumbnail: "🎯" },
          { name: "Plank Variations", equipment: "Bodyweight", thumbnail: "⏱️" },
          { name: "Bird Dog Holds", equipment: "Bodyweight", thumbnail: "🐕" }
        ]
      },
      {
        number: 2,
        title: "Resistance Progression",
        focus: "Adding load and multi-directional neck work",
        exercises: [
          { name: "Neck Harness Flexion", equipment: "Neck harness", thumbnail: "🏋️" },
          { name: "Lateral Neck Raises", equipment: "Neck harness", thumbnail: "💪" },
          { name: "Medicine Ball Rotations", equipment: "Medicine ball", thumbnail: "🔄" },
          { name: "Cable Anti-Rotation", equipment: "Cable machine", thumbnail: "🎯" },
          { name: "Stability Ball Rollouts", equipment: "Stability ball", thumbnail: "⚡" },
          { name: "Farmers Walk", equipment: "Dumbbells", thumbnail: "🚶" }
        ]
      },
      {
        number: 3,
        title: "G-Force Simulation",
        focus: "Replicating cockpit forces with dynamic movements",
        exercises: [
          { name: "Neck Circuit Training", equipment: "Neck harness", thumbnail: "🔥" },
          { name: "Rapid Head Movements", equipment: "Resistance band", thumbnail: "⚡" },
          { name: "Weighted Plank Holds", equipment: "Weight plate", thumbnail: "🏋️" },
          { name: "Cable Woodchops", equipment: "Cable machine", thumbnail: "💥" },
          { name: "Stability Ball Pike", equipment: "Stability ball", thumbnail: "🎯" },
          { name: "Hanging Leg Raises", equipment: "Pull-up bar", thumbnail: "💪" }
        ]
      },
      {
        number: 4,
        title: "Race Readiness",
        focus: "Peak strength and endurance for race conditions",
        exercises: [
          { name: "Full Neck Endurance Circuit", equipment: "Neck harness", thumbnail: "🏆" },
          { name: "Simulated G-Force Holds", equipment: "Resistance band", thumbnail: "🚀" },
          { name: "Core Endurance Finisher", equipment: "Mixed", thumbnail: "⏱️" },
          { name: "Anti-Extension Holds", equipment: "Stability ball", thumbnail: "💪" },
          { name: "Race Simulation Core Work", equipment: "Bodyweight", thumbnail: "🎯" },
          { name: "Recovery Stretching", equipment: "Bodyweight", thumbnail: "🧘" }
        ]
      }
    ]
  },
  "fitness-2": {
    title: "Cardiovascular Endurance Training",
    description: "A 4-week cardio program built for the unique demands of F1 racing. Drivers maintain heart rates of 150-170 BPM for nearly two hours while making split-second decisions. This program builds the aerobic base and heat tolerance needed to stay sharp from lights out to checkered flag.",
    category: "Fitness Program",
    stats: {
      duration: "60–90 min per session",
      exercises: "4–6",
      length: "4 weeks"
    },
    equipment: ["Cycling bike", "Rowing machine", "Treadmill", "Heart rate monitor", "Sauna access"],
    targetAreas: ["Aerobic capacity", "Heart rate recovery", "Heat tolerance", "Mental endurance"],
    weeks: [
      {
        number: 1,
        title: "Aerobic Base Building",
        focus: "Establishing steady-state cardio foundation",
        exercises: [
          { name: "Zone 2 Cycling", equipment: "Cycling bike", thumbnail: "🚴" },
          { name: "Easy Rowing Intervals", equipment: "Rowing machine", thumbnail: "🚣" },
          { name: "Incline Treadmill Walk", equipment: "Treadmill", thumbnail: "🚶" },
          { name: "Heart Rate Zone Training", equipment: "HR monitor", thumbnail: "❤️" },
          { name: "Active Recovery Sessions", equipment: "Mixed", thumbnail: "🔄" }
        ]
      },
      {
        number: 2,
        title: "Intensity Introduction",
        focus: "Adding interval work to build race-pace fitness",
        exercises: [
          { name: "Threshold Cycling Intervals", equipment: "Cycling bike", thumbnail: "🔥" },
          { name: "Rowing 500m Repeats", equipment: "Rowing machine", thumbnail: "💨" },
          { name: "Tempo Run Segments", equipment: "Treadmill", thumbnail: "🏃" },
          { name: "Heart Rate Variability Work", equipment: "HR monitor", thumbnail: "📈" },
          { name: "Heat Exposure Introduction", equipment: "Sauna", thumbnail: "🌡️" }
        ]
      },
      {
        number: 3,
        title: "Race Simulation Cardio",
        focus: "Replicating the 90-minute race cardiovascular demand",
        exercises: [
          { name: "90-Minute Endurance Ride", equipment: "Cycling bike", thumbnail: "🚀" },
          { name: "Rowing Race Pace", equipment: "Rowing machine", thumbnail: "🏆" },
          { name: "Variable Intensity Running", equipment: "Treadmill", thumbnail: "⚡" },
          { name: "Sauna Heat Training", equipment: "Sauna", thumbnail: "🔥" },
          { name: "Cognitive Load Training", equipment: "Mixed", thumbnail: "🧠" }
        ]
      },
      {
        number: 4,
        title: "Peak Performance Week",
        focus: "Sharpening fitness for race weekend readiness",
        exercises: [
          { name: "Race Simulation Circuit", equipment: "Mixed", thumbnail: "🏎️" },
          { name: "Recovery Cardio Sessions", equipment: "Cycling bike", thumbnail: "🌊" },
          { name: "Final Heat Adaptation", equipment: "Sauna", thumbnail: "🌡️" },
          { name: "Race Day Activation", equipment: "Bodyweight", thumbnail: "✨" },
          { name: "Mental Focus Training", equipment: "None", thumbnail: "🎯" }
        ]
      }
    ]
  },
  "fitness-3": {
    title: "Reaction Time & Reflexes",
    description: "A 4-week program focused on sharpening the split-second reactions essential for wheel-to-wheel racing. From race starts to avoiding incidents, F1 drivers need reactions measured in hundredths of a second. This routine trains your nervous system for lightning-fast responses.",
    category: "Fitness Program",
    stats: {
      duration: "40–50 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Reaction lights", "Tennis balls", "Agility ladder", "Balance board", "Eye tracking device"],
    targetAreas: ["Visual processing", "Hand-eye coordination", "Peripheral awareness", "Decision speed"],
    weeks: [
      {
        number: 1,
        title: "Neural Activation",
        focus: "Awakening the nervous system for speed",
        exercises: [
          { name: "Ball Drop Catches", equipment: "Tennis balls", thumbnail: "🎾" },
          { name: "Reaction Light Drills", equipment: "Reaction lights", thumbnail: "💡" },
          { name: "Ladder Speed Work", equipment: "Agility ladder", thumbnail: "👟" },
          { name: "Visual Tracking Exercises", equipment: "Eye device", thumbnail: "👁️" },
          { name: "Balance Board Holds", equipment: "Balance board", thumbnail: "⚖️" },
          { name: "Hand Speed Drills", equipment: "Bodyweight", thumbnail: "✋" }
        ]
      },
      {
        number: 2,
        title: "Speed Processing",
        focus: "Reducing reaction time through repetition",
        exercises: [
          { name: "Multi-Direction Ball Catches", equipment: "Tennis balls", thumbnail: "🔄" },
          { name: "Complex Light Sequences", equipment: "Reaction lights", thumbnail: "⚡" },
          { name: "Cognitive Ladder Patterns", equipment: "Agility ladder", thumbnail: "🧠" },
          { name: "Peripheral Vision Training", equipment: "Eye device", thumbnail: "👁️" },
          { name: "Unstable Surface Work", equipment: "Balance board", thumbnail: "💪" },
          { name: "Dual-Task Challenges", equipment: "Mixed", thumbnail: "🎯" }
        ]
      },
      {
        number: 3,
        title: "Decision Speed",
        focus: "Making correct choices under time pressure",
        exercises: [
          { name: "Choice Reaction Drills", equipment: "Reaction lights", thumbnail: "🚦" },
          { name: "Anticipation Training", equipment: "Mixed", thumbnail: "🔮" },
          { name: "Pattern Recognition Speed", equipment: "Eye device", thumbnail: "📊" },
          { name: "Multi-Stimulus Response", equipment: "Reaction lights", thumbnail: "💥" },
          { name: "Balance Under Distraction", equipment: "Balance board", thumbnail: "🎭" },
          { name: "Race Start Simulation", equipment: "Mixed", thumbnail: "🏎️" }
        ]
      },
      {
        number: 4,
        title: "Competition Sharpening",
        focus: "Peak reaction readiness for race conditions",
        exercises: [
          { name: "Lights Out Reaction Test", equipment: "Reaction lights", thumbnail: "🏆" },
          { name: "Fatigue-State Reactions", equipment: "Mixed", thumbnail: "💪" },
          { name: "Visual Overload Training", equipment: "Eye device", thumbnail: "⚡" },
          { name: "Split-Second Decision Drills", equipment: "Reaction lights", thumbnail: "🎯" },
          { name: "Race Simulation Reactions", equipment: "Mixed", thumbnail: "🏎️" },
          { name: "Maintenance Protocol", equipment: "Mixed", thumbnail: "🔄" }
        ]
      }
    ]
  },
  "fitness-4": {
    title: "Heat Acclimatization Protocol",
    description: "A 4-week program designed to prepare your body for racing in extreme heat conditions. F1 drivers face cockpit temperatures exceeding 50°C in races like Singapore, Qatar, and Bahrain. This protocol builds heat tolerance while maintaining cognitive function and physical performance.",
    category: "Fitness Program",
    stats: {
      duration: "60–75 min per session",
      exercises: "4–6",
      length: "4 weeks"
    },
    equipment: ["Sauna", "Hot yoga access", "Heat suit", "Cycling bike", "Hydration monitoring"],
    targetAreas: ["Thermoregulation", "Sweat efficiency", "Cognitive heat tolerance", "Hydration management"],
    weeks: [
      {
        number: 1,
        title: "Heat Introduction",
        focus: "Safely beginning heat exposure protocols",
        exercises: [
          { name: "Post-Workout Sauna (10 min)", equipment: "Sauna", thumbnail: "🌡️" },
          { name: "Hot Yoga Session", equipment: "Yoga studio", thumbnail: "🧘" },
          { name: "Warm Environment Cycling", equipment: "Heat room", thumbnail: "🚴" },
          { name: "Hydration Baseline Testing", equipment: "Scale", thumbnail: "💧" },
          { name: "Cool-Down Protocols", equipment: "Cold water", thumbnail: "❄️" }
        ]
      },
      {
        number: 2,
        title: "Progressive Exposure",
        focus: "Extending heat tolerance duration",
        exercises: [
          { name: "Sauna Sessions (15-20 min)", equipment: "Sauna", thumbnail: "🔥" },
          { name: "Heat Suit Training", equipment: "Heat suit", thumbnail: "🏋️" },
          { name: "Hot Environment Intervals", equipment: "Mixed", thumbnail: "⚡" },
          { name: "Sweat Rate Monitoring", equipment: "Hydration kit", thumbnail: "📊" },
          { name: "Cognitive Tasks in Heat", equipment: "Sauna", thumbnail: "🧠" }
        ]
      },
      {
        number: 3,
        title: "Race Simulation Heat",
        focus: "Replicating cockpit conditions",
        exercises: [
          { name: "Extended Sauna (25 min)", equipment: "Sauna", thumbnail: "🌡️" },
          { name: "Heat Suit Cardio (45 min)", equipment: "Heat suit + Bike", thumbnail: "🏎️" },
          { name: "Decision Making in Heat", equipment: "Sauna + Tasks", thumbnail: "🎯" },
          { name: "Race-Length Heat Exposure", equipment: "Mixed", thumbnail: "🏆" },
          { name: "Optimal Cooling Strategies", equipment: "Cold water", thumbnail: "❄️" }
        ]
      },
      {
        number: 4,
        title: "Peak Heat Readiness",
        focus: "Race-ready heat performance",
        exercises: [
          { name: "Full Race Heat Simulation", equipment: "Heat suit + Bike", thumbnail: "🚀" },
          { name: "Precision Tasks Under Heat", equipment: "Sauna", thumbnail: "🎯" },
          { name: "Recovery Optimization", equipment: "Cold bath", thumbnail: "❄️" },
          { name: "Race Week Heat Protocol", equipment: "Sauna", thumbnail: "🏎️" },
          { name: "Maintenance Heat Sessions", equipment: "Mixed", thumbnail: "🔄" }
        ]
      }
    ]
  },
  "skills-1": {
    title: "Braking Point Precision",
    description: "A 4-week program focused on mastering the art of late braking. In F1, braking 5 meters later than your rival can make the difference between winning and losing a position. This program trains consistency, confidence, and precision at the limit.",
    category: "Skills Program",
    stats: {
      duration: "60–90 min per session",
      exercises: "5–7",
      length: "4 weeks"
    },
    equipment: ["Racing simulator", "Telemetry software", "Data analysis tools", "Video review system"],
    targetAreas: ["Braking consistency", "Trail braking", "Reference points", "Pressure modulation"],
    weeks: [
      {
        number: 1,
        title: "Braking Fundamentals",
        focus: "Establishing consistent reference points and technique",
        exercises: [
          { name: "Fixed Braking Point Drills", equipment: "Simulator", thumbnail: "🎯" },
          { name: "Brake Pressure Analysis", equipment: "Telemetry", thumbnail: "📊" },
          { name: "Corner Entry Speed Work", equipment: "Simulator", thumbnail: "🏎️" },
          { name: "Visual Reference Training", equipment: "Track walk video", thumbnail: "👁️" },
          { name: "Consistency Lap Runs", equipment: "Simulator", thumbnail: "🔄" }
        ]
      },
      {
        number: 2,
        title: "Trail Braking Introduction",
        focus: "Learning to carry brake into the corner",
        exercises: [
          { name: "Trail Brake Progression", equipment: "Simulator", thumbnail: "🔥" },
          { name: "Brake Release Timing", equipment: "Telemetry", thumbnail: "⏱️" },
          { name: "Corner Rotation Analysis", equipment: "Data tools", thumbnail: "📈" },
          { name: "Weight Transfer Awareness", equipment: "Simulator", thumbnail: "⚖️" },
          { name: "Sector Time Comparison", equipment: "Telemetry", thumbnail: "📊" }
        ]
      },
      {
        number: 3,
        title: "Limit Exploration",
        focus: "Finding the absolute braking limit",
        exercises: [
          { name: "Progressive Late Braking", equipment: "Simulator", thumbnail: "🚀" },
          { name: "Lock-Up Recovery Drills", equipment: "Simulator", thumbnail: "🔒" },
          { name: "ABS-Off Threshold Work", equipment: "Simulator", thumbnail: "💪" },
          { name: "Overtaking Brake Zones", equipment: "Simulator", thumbnail: "⚔️" },
          { name: "Dirty Air Braking", equipment: "Simulator", thumbnail: "💨" }
        ]
      },
      {
        number: 4,
        title: "Race Application",
        focus: "Applying skills under race pressure",
        exercises: [
          { name: "Race Start Braking", equipment: "Simulator", thumbnail: "🏁" },
          { name: "Defensive Braking Lines", equipment: "Simulator", thumbnail: "🛡️" },
          { name: "Fuel Load Adaptation", equipment: "Simulator", thumbnail: "⛽" },
          { name: "Tire Degradation Braking", equipment: "Simulator", thumbnail: "🔄" },
          { name: "Full Race Simulation", equipment: "Simulator", thumbnail: "🏆" }
        ]
      }
    ]
  },
  "skills-2": {
    title: "Overtaking Techniques",
    description: "A 4-week masterclass in race-craft and overtaking. From late-braking lunges to strategic positioning, this program covers all the techniques needed to make passes stick while racing wheel-to-wheel at 300+ km/h.",
    category: "Skills Program",
    stats: {
      duration: "75–90 min per session",
      exercises: "5–6",
      length: "4 weeks"
    },
    equipment: ["Racing simulator", "Multi-car practice mode", "Video analysis", "Telemetry comparison"],
    targetAreas: ["Overtaking execution", "Defensive driving", "Race positioning", "DRS utilization"],
    weeks: [
      {
        number: 1,
        title: "Positioning Fundamentals",
        focus: "Setting up overtaking opportunities",
        exercises: [
          { name: "Slipstream Positioning", equipment: "Simulator", thumbnail: "💨" },
          { name: "DRS Zone Optimization", equipment: "Simulator", thumbnail: "📍" },
          { name: "Exit Speed Priority", equipment: "Telemetry", thumbnail: "🚀" },
          { name: "Gap Management", equipment: "Simulator", thumbnail: "📏" },
          { name: "Tire Advantage Exploitation", equipment: "Simulator", thumbnail: "🎯" }
        ]
      },
      {
        number: 2,
        title: "Attack Techniques",
        focus: "Executing clean overtakes",
        exercises: [
          { name: "Late-Brake Lunges", equipment: "Simulator", thumbnail: "⚔️" },
          { name: "Switchback Moves", equipment: "Simulator", thumbnail: "🔄" },
          { name: "Around the Outside", equipment: "Simulator", thumbnail: "🌀" },
          { name: "Dummy Moves", equipment: "Simulator", thumbnail: "🎭" },
          { name: "Cross-Over Techniques", equipment: "Simulator", thumbnail: "✖️" }
        ]
      },
      {
        number: 3,
        title: "Defense & Counter-Attack",
        focus: "Protecting position and responding to attacks",
        exercises: [
          { name: "Defensive Line Selection", equipment: "Simulator", thumbnail: "🛡️" },
          { name: "Legal Blocking Techniques", equipment: "Simulator", thumbnail: "🚧" },
          { name: "Counter-Attack Setup", equipment: "Simulator", thumbnail: "⚡" },
          { name: "Brake Point Defense", equipment: "Simulator", thumbnail: "🔒" },
          { name: "Position Swap Management", equipment: "Simulator", thumbnail: "🔀" }
        ]
      },
      {
        number: 4,
        title: "Race Scenarios",
        focus: "Multi-lap battles and strategic overtaking",
        exercises: [
          { name: "Multi-Lap Pressure", equipment: "Simulator", thumbnail: "⏱️" },
          { name: "Pack Racing Tactics", equipment: "Simulator", thumbnail: "👥" },
          { name: "Restart Aggression", equipment: "Simulator", thumbnail: "🏁" },
          { name: "Final Lap Scenarios", equipment: "Simulator", thumbnail: "🏆" },
          { name: "Championship Pressure Sims", equipment: "Simulator", thumbnail: "🎖️" }
        ]
      }
    ]
  },
  "skills-3": {
    title: "Tire Management Mastery",
    description: "A 4-week program on the critical skill of tire management. Understanding how to extend stint lengths, manage degradation, and optimize grip windows can be worth multiple positions in a race. This is where championships are won.",
    category: "Skills Program",
    stats: {
      duration: "90–120 min per session",
      exercises: "4–6",
      length: "4 weeks"
    },
    equipment: ["Racing simulator with tire model", "Telemetry software", "Data analysis", "Strategy tools"],
    targetAreas: ["Tire preservation", "Temperature management", "Degradation understanding", "Strategic pacing"],
    weeks: [
      {
        number: 1,
        title: "Tire Basics",
        focus: "Understanding tire behavior and feedback",
        exercises: [
          { name: "Tire Warm-Up Protocols", equipment: "Simulator", thumbnail: "🌡️" },
          { name: "Grip Level Recognition", equipment: "Simulator", thumbnail: "🎯" },
          { name: "Temperature Window Finding", equipment: "Telemetry", thumbnail: "📊" },
          { name: "Compound Comparison Runs", equipment: "Simulator", thumbnail: "🔄" },
          { name: "Feedback Sensitivity Drills", equipment: "Simulator", thumbnail: "👐" }
        ]
      },
      {
        number: 2,
        title: "Preservation Techniques",
        focus: "Extending tire life through driving style",
        exercises: [
          { name: "Smooth Input Training", equipment: "Simulator", thumbnail: "🌊" },
          { name: "Lift and Coast Practice", equipment: "Simulator", thumbnail: "⛵" },
          { name: "Understeer Prevention", equipment: "Simulator", thumbnail: "🔄" },
          { name: "Rear Tire Saving", equipment: "Simulator", thumbnail: "🛞" },
          { name: "Stint Simulation Runs", equipment: "Simulator", thumbnail: "⏱️" }
        ]
      },
      {
        number: 3,
        title: "Degradation Management",
        focus: "Racing fast on worn tires",
        exercises: [
          { name: "High-Deg Adaptation", equipment: "Simulator", thumbnail: "📉" },
          { name: "Line Adjustment Strategy", equipment: "Simulator", thumbnail: "🛤️" },
          { name: "Brake Balance Changes", equipment: "Simulator", thumbnail: "⚖️" },
          { name: "Pace Management", equipment: "Telemetry", thumbnail: "📈" },
          { name: "Delta Time Control", equipment: "Simulator", thumbnail: "⏱️" }
        ]
      },
      {
        number: 4,
        title: "Strategic Application",
        focus: "Race-winning tire strategy execution",
        exercises: [
          { name: "Undercut Defense", equipment: "Simulator", thumbnail: "🛡️" },
          { name: "Overcut Execution", equipment: "Simulator", thumbnail: "⚔️" },
          { name: "Tire Cliff Awareness", equipment: "Telemetry", thumbnail: "🪨" },
          { name: "Full Race Tire Management", equipment: "Simulator", thumbnail: "🏆" },
          { name: "Strategy Adaptation Drills", equipment: "Strategy tools", thumbnail: "🧠" }
        ]
      }
    ]
  },
  "skills-4": {
    title: "Wet Weather Driving",
    description: "A 4-week program mastering the art of driving in the rain. Wet races are where legends are made—from Senna at Donington to my own Monza victory. This program covers everything from finding grip to managing spray and aquaplaning.",
    category: "Skills Program",
    stats: {
      duration: "60–90 min per session",
      exercises: "5–6",
      length: "4 weeks"
    },
    equipment: ["Racing simulator with weather", "Variable conditions mode", "Onboard video analysis", "Track condition tools"],
    targetAreas: ["Wet grip finding", "Aquaplaning management", "Visibility adaptation", "Intermediate conditions"],
    weeks: [
      {
        number: 1,
        title: "Wet Fundamentals",
        focus: "Basic wet weather techniques and line selection",
        exercises: [
          { name: "Wet Line Discovery", equipment: "Simulator", thumbnail: "🌧️" },
          { name: "Grip Level Assessment", equipment: "Simulator", thumbnail: "🎯" },
          { name: "Smooth Input Practice", equipment: "Simulator", thumbnail: "🌊" },
          { name: "Spray Management", equipment: "Simulator", thumbnail: "💨" },
          { name: "Standing Water Recognition", equipment: "Simulator", thumbnail: "🌊" }
        ]
      },
      {
        number: 2,
        title: "Confidence Building",
        focus: "Increasing speed and commitment in wet conditions",
        exercises: [
          { name: "Progressive Pace Building", equipment: "Simulator", thumbnail: "📈" },
          { name: "Aquaplane Recovery", equipment: "Simulator", thumbnail: "🚗" },
          { name: "Braking on Wet Track", equipment: "Simulator", thumbnail: "🔒" },
          { name: "Corner Exit Traction", equipment: "Simulator", thumbnail: "⚡" },
          { name: "Kerb Avoidance Drills", equipment: "Simulator", thumbnail: "🚧" }
        ]
      },
      {
        number: 3,
        title: "Intermediate Mastery",
        focus: "Drying track and tire crossover decisions",
        exercises: [
          { name: "Changing Conditions", equipment: "Simulator", thumbnail: "🔄" },
          { name: "Dry Line Emergence", equipment: "Simulator", thumbnail: "☀️" },
          { name: "Tire Crossover Timing", equipment: "Strategy tools", thumbnail: "⏱️" },
          { name: "Mixed Conditions Racing", equipment: "Simulator", thumbnail: "🌤️" },
          { name: "Risk Assessment", equipment: "Video analysis", thumbnail: "🧠" }
        ]
      },
      {
        number: 4,
        title: "Race Excellence",
        focus: "Winning in wet conditions",
        exercises: [
          { name: "Wet Race Starts", equipment: "Simulator", thumbnail: "🏁" },
          { name: "Safety Car Restarts", equipment: "Simulator", thumbnail: "🚗" },
          { name: "Overtaking in Spray", equipment: "Simulator", thumbnail: "💨" },
          { name: "Full Wet Race Simulation", equipment: "Simulator", thumbnail: "🏆" },
          { name: "Legendary Wet Drives Study", equipment: "Video analysis", thumbnail: "📺" }
        ]
      }
    ]
  },
  "mental-1": {
    title: "Pre-Race Focus Routine",
    description: "A 4-week program on mental preparation for race day. From the moment I wake up to lights out, every F1 driver has rituals and routines to get into the zone. This program shares my approach to managing adrenaline and finding peak focus.",
    category: "Mental Program",
    stats: {
      duration: "30–60 min per session",
      exercises: "4–6",
      length: "4 weeks"
    },
    equipment: ["Quiet space", "Meditation app", "Music playlist", "Breathing timer", "Journal"],
    targetAreas: ["Race day focus", "Adrenaline management", "Pre-race anxiety", "Mental clarity"],
    weeks: [
      {
        number: 1,
        title: "Morning Routine Foundation",
        focus: "Establishing race morning rituals",
        exercises: [
          { name: "Wake-Up Mindfulness", equipment: "Quiet space", thumbnail: "🌅" },
          { name: "Controlled Breathing (Box)", equipment: "Breathing timer", thumbnail: "🌬️" },
          { name: "Race Day Journaling", equipment: "Journal", thumbnail: "📝" },
          { name: "Intention Setting", equipment: "Quiet space", thumbnail: "🎯" },
          { name: "Physical Activation", equipment: "Bodyweight", thumbnail: "💪" }
        ]
      },
      {
        number: 2,
        title: "Paddock to Garage",
        focus: "Managing energy through race preparation",
        exercises: [
          { name: "Team Brief Focus", equipment: "Quiet space", thumbnail: "🤝" },
          { name: "Data Review Mindset", equipment: "Focus app", thumbnail: "📊" },
          { name: "Walkabout Grounding", equipment: "Track walk", thumbnail: "🚶" },
          { name: "Energy Conservation", equipment: "Quiet space", thumbnail: "🔋" },
          { name: "Hydration Ritual", equipment: "Water bottle", thumbnail: "💧" }
        ]
      },
      {
        number: 3,
        title: "Cockpit Preparation",
        focus: "Final mental preparation before lights out",
        exercises: [
          { name: "Visor Down Routine", equipment: "Quiet space", thumbnail: "🏎️" },
          { name: "Formation Lap Focus", equipment: "Visualization", thumbnail: "🔄" },
          { name: "Grid Box Centering", equipment: "Breathing", thumbnail: "🧘" },
          { name: "Start Sequence Visualization", equipment: "Mental imagery", thumbnail: "🏁" },
          { name: "Adrenaline Channeling", equipment: "Breathing timer", thumbnail: "⚡" }
        ]
      },
      {
        number: 4,
        title: "Race Day Mastery",
        focus: "Complete pre-race mental protocol",
        exercises: [
          { name: "Full Morning Protocol", equipment: "Mixed", thumbnail: "🌅" },
          { name: "Pressure Scenario Practice", equipment: "Visualization", thumbnail: "💪" },
          { name: "Focus Trigger Development", equipment: "Personal cue", thumbnail: "🎯" },
          { name: "Race Simulation Mental Prep", equipment: "Simulator", thumbnail: "🏆" },
          { name: "Routine Refinement", equipment: "Journal", thumbnail: "✨" }
        ]
      }
    ]
  },
  "mental-2": {
    title: "Managing Race Pressure",
    description: "A 4-week program for staying calm and making clear decisions during the most intense moments of racing. From safety car restarts to final lap battles, this program trains the mental skills needed to thrive under pressure.",
    category: "Mental Program",
    stats: {
      duration: "45–60 min per session",
      exercises: "5–6",
      length: "4 weeks"
    },
    equipment: ["Racing simulator", "Heart rate monitor", "Stress scenarios", "Breathing tools", "Video review"],
    targetAreas: ["Pressure performance", "Decision clarity", "Emotional control", "Crisis management"],
    weeks: [
      {
        number: 1,
        title: "Pressure Awareness",
        focus: "Understanding your pressure responses",
        exercises: [
          { name: "Heart Rate Monitoring", equipment: "HR monitor", thumbnail: "❤️" },
          { name: "Pressure Point Identification", equipment: "Journal", thumbnail: "📝" },
          { name: "Breathing Under Load", equipment: "Breathing timer", thumbnail: "🌬️" },
          { name: "Stress Response Journaling", equipment: "Journal", thumbnail: "📖" },
          { name: "Recovery Baseline", equipment: "HR monitor", thumbnail: "📊" }
        ]
      },
      {
        number: 2,
        title: "Control Techniques",
        focus: "Developing pressure management tools",
        exercises: [
          { name: "Tactical Breathing", equipment: "Breathing timer", thumbnail: "🌬️" },
          { name: "Positive Self-Talk Scripts", equipment: "Journal", thumbnail: "💬" },
          { name: "Focus Cue Development", equipment: "Personal triggers", thumbnail: "🎯" },
          { name: "Arousal Regulation", equipment: "HR monitor", thumbnail: "📈" },
          { name: "Pressure Simulation Lite", equipment: "Simulator", thumbnail: "🏎️" }
        ]
      },
      {
        number: 3,
        title: "High-Stakes Scenarios",
        focus: "Practicing under simulated race pressure",
        exercises: [
          { name: "Safety Car Restart Sims", equipment: "Simulator", thumbnail: "🚗" },
          { name: "Final Lap Battles", equipment: "Simulator", thumbnail: "🏁" },
          { name: "Championship Decider", equipment: "Simulator", thumbnail: "🏆" },
          { name: "Radio Pressure Handling", equipment: "Simulator", thumbnail: "📻" },
          { name: "Split-Second Decisions", equipment: "Simulator", thumbnail: "⚡" }
        ]
      },
      {
        number: 4,
        title: "Pressure Mastery",
        focus: "Thriving in high-pressure moments",
        exercises: [
          { name: "Full Pressure Race Sim", equipment: "Simulator", thumbnail: "🏎️" },
          { name: "Post-Pressure Recovery", equipment: "Breathing", thumbnail: "🧘" },
          { name: "Mental Debrief Practice", equipment: "Journal", thumbnail: "📝" },
          { name: "Clutch Performance Training", equipment: "Simulator", thumbnail: "💪" },
          { name: "Pressure Routine Integration", equipment: "Mixed", thumbnail: "✨" }
        ]
      }
    ]
  },
  "mental-3": {
    title: "Bouncing Back from DNFs",
    description: "A 4-week program on mental resilience after disappointment. Whether it's a crash, mechanical failure, or mistake, learning to reset and come back stronger is essential. This program shares my techniques for processing setbacks and returning to peak performance.",
    category: "Mental Program",
    stats: {
      duration: "30–45 min per session",
      exercises: "4–5",
      length: "4 weeks"
    },
    equipment: ["Journal", "Video review", "Support network", "Quiet space", "Exercise equipment"],
    targetAreas: ["Resilience building", "Setback processing", "Confidence restoration", "Forward focus"],
    weeks: [
      {
        number: 1,
        title: "Processing Disappointment",
        focus: "Healthy ways to handle setbacks",
        exercises: [
          { name: "Immediate Reset Protocol", equipment: "Breathing", thumbnail: "🔄" },
          { name: "Emotion Acknowledgment", equipment: "Journal", thumbnail: "📝" },
          { name: "Physical Release", equipment: "Exercise", thumbnail: "💪" },
          { name: "Support Circle Connection", equipment: "Phone/in-person", thumbnail: "🤝" },
          { name: "Sleep Reset", equipment: "Quiet space", thumbnail: "😴" }
        ]
      },
      {
        number: 2,
        title: "Analysis Without Blame",
        focus: "Objective review and learning",
        exercises: [
          { name: "Fact-Based Debrief", equipment: "Data/video", thumbnail: "📊" },
          { name: "What I Controlled", equipment: "Journal", thumbnail: "🎯" },
          { name: "Learning Extraction", equipment: "Journal", thumbnail: "📚" },
          { name: "Team Debrief Mindset", equipment: "Meeting", thumbnail: "🤝" },
          { name: "Future Application Plan", equipment: "Journal", thumbnail: "📋" }
        ]
      },
      {
        number: 3,
        title: "Confidence Rebuilding",
        focus: "Restoring self-belief after setbacks",
        exercises: [
          { name: "Success Recall", equipment: "Video/memory", thumbnail: "🏆" },
          { name: "Competence Reminders", equipment: "Journal", thumbnail: "💪" },
          { name: "Gradual Challenge Progression", equipment: "Simulator", thumbnail: "📈" },
          { name: "Positive Feedback Integration", equipment: "Team input", thumbnail: "👍" },
          { name: "Visualization Success", equipment: "Mental imagery", thumbnail: "🌟" }
        ]
      },
      {
        number: 4,
        title: "Forward Momentum",
        focus: "Turning setbacks into motivation",
        exercises: [
          { name: "Next Race Focus", equipment: "Preparation", thumbnail: "🏎️" },
          { name: "Goal Recommitment", equipment: "Journal", thumbnail: "🎯" },
          { name: "Hunger Channeling", equipment: "Motivation work", thumbnail: "🔥" },
          { name: "Comeback Visualization", equipment: "Mental imagery", thumbnail: "🚀" },
          { name: "Resilience Routine", equipment: "Mixed", thumbnail: "✨" }
        ]
      }
    ]
  },
  "mental-4": {
    title: "Visualization & Track Prep",
    description: "A 4-week program on using mental imagery to prepare for circuits. Before I even arrive at a track, I've driven hundreds of laps in my mind. This program teaches the visualization techniques used by elite drivers to learn new tracks and optimize performance.",
    category: "Mental Program",
    stats: {
      duration: "30–45 min per session",
      exercises: "4–6",
      length: "4 weeks"
    },
    equipment: ["Onboard videos", "Track maps", "Quiet space", "VR headset (optional)", "Notes/journal"],
    targetAreas: ["Track memorization", "Corner visualization", "Braking references", "Race scenarios"],
    weeks: [
      {
        number: 1,
        title: "Visualization Basics",
        focus: "Developing mental imagery skills",
        exercises: [
          { name: "Sensory Recall Practice", equipment: "Quiet space", thumbnail: "🧠" },
          { name: "Simple Lap Imagery", equipment: "Quiet space", thumbnail: "🔄" },
          { name: "Visual Clarity Training", equipment: "Onboard video", thumbnail: "👁️" },
          { name: "Feeling-Based Imagery", equipment: "Quiet space", thumbnail: "🎯" },
          { name: "Speed of Imagery", equipment: "Timer", thumbnail: "⏱️" }
        ]
      },
      {
        number: 2,
        title: "Track Learning",
        focus: "Memorizing new circuits through visualization",
        exercises: [
          { name: "Sector-by-Sector Study", equipment: "Track map", thumbnail: "📍" },
          { name: "Reference Point Memorization", equipment: "Onboard video", thumbnail: "🎯" },
          { name: "Braking Zone Visualization", equipment: "Quiet space", thumbnail: "🔒" },
          { name: "Corner Character Study", equipment: "Track notes", thumbnail: "📝" },
          { name: "Full Lap Mental Drives", equipment: "Quiet space", thumbnail: "🏎️" }
        ]
      },
      {
        number: 3,
        title: "Performance Imagery",
        focus: "Visualizing optimal performance",
        exercises: [
          { name: "Perfect Lap Visualization", equipment: "Quiet space", thumbnail: "🏆" },
          { name: "Problem Corner Focus", equipment: "Video + imagery", thumbnail: "🔧" },
          { name: "Qualifying Lap Imagery", equipment: "Quiet space", thumbnail: "⏱️" },
          { name: "Race Start Scenarios", equipment: "Quiet space", thumbnail: "🏁" },
          { name: "Overtaking Opportunity Spots", equipment: "Track analysis", thumbnail: "⚔️" }
        ]
      },
      {
        number: 4,
        title: "Race Preparation",
        focus: "Complete race weekend mental preparation",
        exercises: [
          { name: "Full Race Visualization", equipment: "Quiet space", thumbnail: "🏎️" },
          { name: "Strategy Scenario Imaging", equipment: "Strategy notes", thumbnail: "📋" },
          { name: "Weather Condition Prep", equipment: "Quiet space", thumbnail: "🌧️" },
          { name: "Pressure Moment Rehearsal", equipment: "Quiet space", thumbnail: "💪" },
          { name: "Success Outcome Imagery", equipment: "Quiet space", thumbnail: "🏆" }
        ]
      }
    ]
  },
  "nutrition-1": {
    title: "Race Weekend Fuel",
    description: "A 4-week nutrition program designed around the unique demands of an F1 race weekend. From Thursday arrivals to Sunday podiums, learn how I fuel my body for maximum focus, reaction time, and physical endurance across intense 2-hour races.",
    category: "Nutrition Program",
    stats: {
      duration: "Daily planning",
      exercises: "4–5 meal strategies",
      length: "4 weeks"
    },
    equipment: ["Meal prep containers", "Portable snacks", "Hydration systems", "Nutrition tracking app", "Team chef coordination"],
    targetAreas: ["Pre-race energy", "In-cockpit hydration", "Post-race recovery", "Mental clarity"],
    weeks: [
      {
        number: 1,
        title: "Pre-Race Foundation",
        focus: "Building glycogen stores and optimizing pre-race nutrition",
        exercises: [
          { name: "Carb Loading Strategy", equipment: "Meal planning", thumbnail: "🍝" },
          { name: "Thursday Arrival Nutrition", equipment: "Travel meals", thumbnail: "✈️" },
          { name: "Friday Practice Fuel", equipment: "Quick snacks", thumbnail: "⚡" },
          { name: "Evening Recovery Meals", equipment: "Team chef", thumbnail: "🍽️" },
          { name: "Sleep Optimization Foods", equipment: "Meal timing", thumbnail: "😴" }
        ]
      },
      {
        number: 2,
        title: "Qualifying Day Fuel",
        focus: "Peak mental sharpness for Saturday sessions",
        exercises: [
          { name: "Morning Brain Foods", equipment: "Omega-3 sources", thumbnail: "🧠" },
          { name: "Between Sessions Snacks", equipment: "Portable options", thumbnail: "🍌" },
          { name: "Qualifying Window Nutrition", equipment: "Light meals", thumbnail: "⏱️" },
          { name: "Post-Quali Recovery", equipment: "Protein focus", thumbnail: "💪" },
          { name: "Evening Prep Meals", equipment: "Balanced dinner", thumbnail: "🍽️" }
        ]
      },
      {
        number: 3,
        title: "Race Day Execution",
        focus: "Optimal fueling for 2 hours of intense racing",
        exercises: [
          { name: "Race Morning Breakfast", equipment: "4 hours pre-race", thumbnail: "🌅" },
          { name: "Pre-Race Energy Timing", equipment: "2 hours pre-race", thumbnail: "⏰" },
          { name: "In-Car Hydration Mix", equipment: "Drink system", thumbnail: "💧" },
          { name: "Immediate Post-Race Fuel", equipment: "Recovery shake", thumbnail: "🥤" },
          { name: "Celebration Nutrition", equipment: "Balanced approach", thumbnail: "🏆" }
        ]
      },
      {
        number: 4,
        title: "Recovery & Travel",
        focus: "Post-race recovery and travel nutrition",
        exercises: [
          { name: "Monday Recovery Focus", equipment: "Anti-inflammatory", thumbnail: "🔄" },
          { name: "Travel Day Eating", equipment: "Portable meals", thumbnail: "✈️" },
          { name: "Jet Lag Nutrition", equipment: "Timing strategy", thumbnail: "🌍" },
          { name: "Light Training Support", equipment: "Moderate intake", thumbnail: "🏃" },
          { name: "Next Race Prep Begins", equipment: "Cycle planning", thumbnail: "📅" }
        ]
      }
    ]
  },
  "nutrition-2": {
    title: "Weight Management Protocol",
    description: "A 4-week program for managing the delicate balance between muscle mass, hydration, and the minimum weight requirements in F1. Every kilogram matters in racing performance, and this protocol helps optimize body composition while maintaining strength and endurance.",
    category: "Nutrition Program",
    stats: {
      duration: "Daily monitoring",
      exercises: "5–6 strategies",
      length: "4 weeks"
    },
    equipment: ["Body composition scale", "Food scale", "Tracking app", "Hydration monitor", "Meal prep system"],
    targetAreas: ["Lean muscle retention", "Fat optimization", "Hydration balance", "Energy maintenance"],
    weeks: [
      {
        number: 1,
        title: "Baseline Assessment",
        focus: "Understanding current composition and targets",
        exercises: [
          { name: "Body Composition Analysis", equipment: "DEXA scan", thumbnail: "📊" },
          { name: "Current Diet Audit", equipment: "Food diary", thumbnail: "📝" },
          { name: "Caloric Needs Calculation", equipment: "Tracking app", thumbnail: "🔢" },
          { name: "Protein Requirement Setting", equipment: "Goal planning", thumbnail: "🎯" },
          { name: "Weigh-In Protocol Setup", equipment: "Scale routine", thumbnail: "⚖️" }
        ]
      },
      {
        number: 2,
        title: "Macro Optimization",
        focus: "Fine-tuning macronutrient ratios",
        exercises: [
          { name: "Protein Timing Strategy", equipment: "Meal scheduling", thumbnail: "🥩" },
          { name: "Carb Cycling Introduction", equipment: "Training calendar", thumbnail: "🔄" },
          { name: "Strategic Fat Intake", equipment: "Healthy sources", thumbnail: "🥑" },
          { name: "Pre-Training Nutrition", equipment: "Energy foods", thumbnail: "⚡" },
          { name: "Post-Training Recovery", equipment: "Recovery meals", thumbnail: "💪" }
        ]
      },
      {
        number: 3,
        title: "Race Weight Targeting",
        focus: "Achieving optimal race weight without compromising performance",
        exercises: [
          { name: "Strategic Water Loading", equipment: "Hydration plan", thumbnail: "💧" },
          { name: "Low-Residue Race Prep", equipment: "Fiber timing", thumbnail: "🍽️" },
          { name: "Weight Cut Protocol", equipment: "Safe methods", thumbnail: "⚖️" },
          { name: "Energy Preservation", equipment: "Calorie balance", thumbnail: "🔋" },
          { name: "Performance Monitoring", equipment: "Testing protocol", thumbnail: "📈" }
        ]
      },
      {
        number: 4,
        title: "Maintenance & Sustainability",
        focus: "Long-term weight management across the season",
        exercises: [
          { name: "Seasonal Planning", equipment: "Calendar approach", thumbnail: "📅" },
          { name: "Travel Weight Management", equipment: "Portable solutions", thumbnail: "✈️" },
          { name: "Off-Season Strategy", equipment: "Flexibility balance", thumbnail: "🏖️" },
          { name: "Mental Relationship with Food", equipment: "Mindful eating", thumbnail: "🧠" },
          { name: "Regular Reassessment", equipment: "Monthly reviews", thumbnail: "🔄" }
        ]
      }
    ]
  },
  "nutrition-3": {
    title: "Travel & Jet Lag Recovery",
    description: "A 4-week program for managing nutrition across 24 races and constant timezone changes throughout the F1 season. Learn how I minimize jet lag effects, maintain consistent energy, and fuel properly while living out of suitcases across five continents.",
    category: "Nutrition Program",
    stats: {
      duration: "Ongoing throughout season",
      exercises: "4–5 strategies",
      length: "4 weeks"
    },
    equipment: ["Portable supplements", "Travel snacks", "Hydration bottles", "Melatonin (as advised)", "Meal planning app"],
    targetAreas: ["Circadian rhythm support", "Gut health on travel", "Energy consistency", "Immune support"],
    weeks: [
      {
        number: 1,
        title: "Pre-Travel Preparation",
        focus: "Preparing the body for timezone shifts",
        exercises: [
          { name: "Sleep Schedule Shifting", equipment: "Light exposure", thumbnail: "🌅" },
          { name: "Gut Preparation", equipment: "Probiotics", thumbnail: "🦠" },
          { name: "Meal Timing Adjustment", equipment: "Gradual shifts", thumbnail: "⏰" },
          { name: "Hydration Pre-Loading", equipment: "Water intake boost", thumbnail: "💧" },
          { name: "Supplement Packing", equipment: "Travel kit", thumbnail: "💊" }
        ]
      },
      {
        number: 2,
        title: "In-Flight Nutrition",
        focus: "Eating and drinking during long-haul flights",
        exercises: [
          { name: "Flight Meal Strategy", equipment: "Packed alternatives", thumbnail: "✈️" },
          { name: "Hydration Protocol", equipment: "Electrolytes", thumbnail: "💧" },
          { name: "Alcohol/Caffeine Management", equipment: "Timing control", thumbnail: "☕" },
          { name: "Bloating Prevention", equipment: "Light foods", thumbnail: "🎈" },
          { name: "Arrival Meal Planning", equipment: "Destination prep", thumbnail: "🍽️" }
        ]
      },
      {
        number: 3,
        title: "Destination Adaptation",
        focus: "Quick adaptation to new timezones",
        exercises: [
          { name: "First Day Meal Timing", equipment: "Local schedule", thumbnail: "🌍" },
          { name: "Caffeine Strategic Use", equipment: "Timing protocol", thumbnail: "☕" },
          { name: "Light Exposure Eating", equipment: "Outdoor meals", thumbnail: "☀️" },
          { name: "Sleep Support Foods", equipment: "Tryptophan sources", thumbnail: "😴" },
          { name: "Gut Resync Protocol", equipment: "Fiber timing", thumbnail: "🔄" }
        ]
      },
      {
        number: 4,
        title: "Ongoing Season Management",
        focus: "Maintaining nutrition quality across back-to-back races",
        exercises: [
          { name: "Hotel Room Prep", equipment: "Portable supplies", thumbnail: "🏨" },
          { name: "Restaurant Navigation", equipment: "Menu selection", thumbnail: "📋" },
          { name: "Immune Support Focus", equipment: "Vitamin strategy", thumbnail: "🛡️" },
          { name: "Consistency Anchors", equipment: "Familiar foods", thumbnail: "⚓" },
          { name: "Energy Maintenance", equipment: "Snack strategy", thumbnail: "⚡" }
        ]
      }
    ]
  },
  "nutrition-4": {
    title: "Hydration Strategy",
    description: "A 4-week program focused on the critical importance of hydration for F1 drivers. During a race, I can lose 2-3kg of body fluid in cockpit temperatures exceeding 50°C. This program covers pre-race hydration, in-car drink strategies, and rapid post-race rehydration.",
    category: "Nutrition Program",
    stats: {
      duration: "Daily practice",
      exercises: "4–5 protocols",
      length: "4 weeks"
    },
    equipment: ["Hydration monitor", "Electrolyte supplements", "In-car drink system", "Urine color chart", "Sweat testing kit"],
    targetAreas: ["Pre-race hydration", "In-race fluid management", "Post-race recovery", "Heat adaptation"],
    weeks: [
      {
        number: 1,
        title: "Hydration Fundamentals",
        focus: "Understanding individual hydration needs",
        exercises: [
          { name: "Sweat Rate Testing", equipment: "Scale + training", thumbnail: "💧" },
          { name: "Electrolyte Profile", equipment: "Sweat patch", thumbnail: "🧪" },
          { name: "Daily Intake Baseline", equipment: "Tracking app", thumbnail: "📊" },
          { name: "Urine Monitoring", equipment: "Color chart", thumbnail: "🎨" },
          { name: "Hydration Timing", equipment: "Schedule", thumbnail: "⏰" }
        ]
      },
      {
        number: 2,
        title: "Pre-Race Loading",
        focus: "Optimal hydration in the 24-48 hours before racing",
        exercises: [
          { name: "48-Hour Protocol", equipment: "Electrolyte drinks", thumbnail: "📅" },
          { name: "Morning-Of Strategy", equipment: "Fluid timing", thumbnail: "🌅" },
          { name: "Electrolyte Balance", equipment: "Sodium focus", thumbnail: "🧂" },
          { name: "Avoiding Over-Hydration", equipment: "Volume control", thumbnail: "⚖️" },
          { name: "Final Pre-Race Drink", equipment: "Timing protocol", thumbnail: "⏱️" }
        ]
      },
      {
        number: 3,
        title: "In-Race Management",
        focus: "Staying hydrated during 2-hour races in extreme heat",
        exercises: [
          { name: "Drink System Setup", equipment: "Car preparation", thumbnail: "🏎️" },
          { name: "Drinking Technique", equipment: "Practice drills", thumbnail: "💪" },
          { name: "Concentration Mixing", equipment: "Custom formula", thumbnail: "🔬" },
          { name: "Strategic Sipping", equipment: "Lap timing", thumbnail: "📍" },
          { name: "Hot Race Adaptations", equipment: "Ice integration", thumbnail: "🧊" }
        ]
      },
      {
        number: 4,
        title: "Recovery Rehydration",
        focus: "Rapid and complete post-race fluid restoration",
        exercises: [
          { name: "Immediate Post-Race", equipment: "Recovery drinks", thumbnail: "🥤" },
          { name: "Weight Loss Replacement", equipment: "1.5x protocol", thumbnail: "⚖️" },
          { name: "Electrolyte Replacement", equipment: "Sodium focus", thumbnail: "🧂" },
          { name: "Evening Rehydration", equipment: "Steady intake", thumbnail: "🌙" },
          { name: "Next Day Monitoring", equipment: "Verification", thumbnail: "✅" }
        ]
      }
    ]
  }
};

// Default program for any program ID not found
const defaultProgram: ProgramData = programsData["fitness-1"];

export default function PierreTrainingProgramPage() {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { isSubscribed } = useSubscription();
  const [openWeeks, setOpenWeeks] = useState<number[]>([1]);
  const [programStarted, setProgramStarted] = useState(false);

  const isPremiumSubscribed = isSubscribed("pierre-gasly");
  const programData = programId ? programsData[programId] || defaultProgram : defaultProgram;
  const bannerImage = programId ? programImages[programId] || pierreFitness1 : pierreFitness1;

  // Redirect non-premium users
  useEffect(() => {
    if (!isPremiumSubscribed) {
      navigate(`/athlete/pierre-gasly`);
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
          <Button onClick={() => navigate(`/subscribe/pierre-gasly`)}>
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
      <div className="relative h-[400px] w-full overflow-hidden mt-16">
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
          className="absolute top-4 left-4 z-10 bg-background/50 backdrop-blur-sm hover:bg-background/70"
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
            <p className="text-sm text-muted-foreground">Length</p>
            <p className="font-semibold">{programData.stats.length}</p>
          </Card>
        </div>

        {/* Equipment & Target Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-5 bg-muted/20 border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Equipment Needed</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.equipment.map((item, i) => (
                <Badge key={i} variant="outline" className="bg-background/50">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
          <Card className="p-5 bg-muted/20 border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Target Areas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.targetAreas.map((area, i) => (
                <Badge key={i} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Weekly Breakdown */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Weekly Breakdown</h2>
          
          {programData.weeks.map((week) => (
            <Collapsible
              key={week.number}
              open={openWeeks.includes(week.number)}
              onOpenChange={() => toggleWeek(week.number)}
            >
              <Card className="overflow-hidden border-border/50">
                <CollapsibleTrigger asChild>
                  <button className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-bold text-primary">{week.number}</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">{week.title}</h3>
                        <p className="text-sm text-muted-foreground">{week.focus}</p>
                      </div>
                    </div>
                    {openWeeks.includes(week.number) ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-3">
                    {week.exercises.map((exercise, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center text-2xl">
                          {exercise.thumbnail}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-sm text-muted-foreground">{exercise.equipment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Sticky Start Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border/50">
        <Button 
          className="w-full h-12 text-lg font-semibold"
          onClick={handleStartProgram}
        >
          {programStarted ? "Continue Program" : "Start Program"}
        </Button>
      </div>
    </div>
  );
}