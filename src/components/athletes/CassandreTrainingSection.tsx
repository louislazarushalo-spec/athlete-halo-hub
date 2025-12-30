import { AthleteTrainingSection } from "./templates/AthleteTrainingSection";
import { cassandreTrainingData } from "@/data/athleteContent";

export const CassandreTrainingSection = () => {
  return <AthleteTrainingSection data={cassandreTrainingData} />;
};
