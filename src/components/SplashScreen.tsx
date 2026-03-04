import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export const SplashScreen = ({ onComplete, duration = 1000 }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"visible" | "exiting" | "done">("visible");

  // Check prefers-reduced-motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) {
      onComplete();
      return;
    }

    const showTimer = setTimeout(() => setPhase("exiting"), duration);
    const exitTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, duration + 350);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(exitTimer);
    };
  }, [duration, onComplete, prefersReduced]);

  if (phase === "done" || prefersReduced) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-[350ms] ease-out ${
        phase === "exiting"
          ? "opacity-0 scale-95 blur-sm"
          : "opacity-100 scale-100 blur-0"
      }`}
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 45%, hsl(217 91% 20% / 0.6), hsl(0 0% 2%) 70%)",
      }}
    >
      {/* Subtle blue glow orb */}
      <div
        className="absolute w-[320px] h-[320px] rounded-full opacity-30 blur-[100px]"
        style={{ background: "hsl(217, 91%, 55%)" }}
      />

      {/* Logo / Wordmark */}
      <div className="relative z-10 flex flex-col items-center gap-3 animate-splash-enter">
        <h1
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Halo
        </h1>
        <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/40 font-medium">
          Collective
        </span>
      </div>
    </div>
  );
};
