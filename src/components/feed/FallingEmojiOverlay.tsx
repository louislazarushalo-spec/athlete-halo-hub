import { useEffect, useState, useCallback } from "react";

interface Particle {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

let particleCounter = 0;

export const FallingEmojiOverlay = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const spawn = useCallback((emoji: string) => {
    const count = 4 + Math.floor(Math.random() * 3); // 4-6
    const newParticles: Particle[] = Array.from({ length: count }, () => ({
      id: ++particleCounter,
      emoji,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 0.3,
      duration: 1.2 + Math.random() * 0.8,
      size: 20 + Math.random() * 20,
      rotation: -30 + Math.random() * 60,
    }));
    setParticles((p) => [...p, ...newParticles]);
    setTimeout(() => {
      setParticles((p) => p.filter((pp) => !newParticles.some((np) => np.id === pp.id)));
    }, 2500);
  }, []);

  useEffect(() => {
    const handler = (e: CustomEvent<{ emoji: string }>) => spawn(e.detail.emoji);
    window.addEventListener("halo-reaction" as any, handler);
    return () => window.removeEventListener("halo-reaction" as any, handler);
  }, [spawn]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-emoji-fall"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};

export const triggerEmojiAnimation = (emoji: string) => {
  window.dispatchEvent(new CustomEvent("halo-reaction", { detail: { emoji } }));
};
