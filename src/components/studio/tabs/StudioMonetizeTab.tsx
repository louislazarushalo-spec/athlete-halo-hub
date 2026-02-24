import { StudioCard } from "../StudioCard";

const MONETIZE_CARDS = [
  { title: "Membership", subtitle: "Create tiered access for your most dedicated fans.", cta: "Set up membership" },
  { title: "Drops", subtitle: "Attach purchasable items to any content — kit-room style.", cta: "Create a drop" },
  { title: "Tips", subtitle: "Let fans show appreciation with direct tips.", cta: "Enable tips" },
  { title: "Shoutouts", subtitle: "Offer personalized video messages to fans.", cta: "Set up shoutouts" },
  { title: "Paid live", subtitle: "Host exclusive paid live sessions with your community.", cta: "Set up paid live" },
];

export const StudioMonetizeTab = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Monetize</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MONETIZE_CARDS.map((card) => (
          <StudioCard
            key={card.title}
            title={card.title}
            subtitle={card.subtitle}
            ctaLabel={card.cta}
            onCtaClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};
