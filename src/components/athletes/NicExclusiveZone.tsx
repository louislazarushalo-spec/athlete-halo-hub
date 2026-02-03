import { AthleteExclusiveZone } from "./templates/AthleteExclusiveZone";
import { nicExclusiveZoneData } from "@/data/athleteContent";

export const NicExclusiveZone = () => {
  return <AthleteExclusiveZone data={nicExclusiveZoneData} />;
};
