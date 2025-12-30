import { AthleteExclusiveZone } from "./templates/AthleteExclusiveZone";
import { cassandreExclusiveZoneData } from "@/data/athleteContent";

export const CassandreExclusiveZone = () => {
  return <AthleteExclusiveZone data={cassandreExclusiveZoneData} />;
};
