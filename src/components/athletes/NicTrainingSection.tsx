import { AthleteTrainingSection } from "./templates/AthleteTrainingSection";
import { nicTrainingData } from "@/data/athleteContent";

export const NicTrainingSection = () => {
  return <AthleteTrainingSection data={nicTrainingData} />;
};
