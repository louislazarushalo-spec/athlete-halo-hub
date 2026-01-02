import { AthleteTrainingSection } from "./templates/AthleteTrainingSection";
import { tommyTrainingData } from "@/data/athleteContent";

export const TommyTrainingSection = () => {
  return <AthleteTrainingSection data={tommyTrainingData} />;
};
