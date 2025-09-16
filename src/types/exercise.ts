export type Exercise = {
  name: string;
  force?: string;
  level?: string;
  mechanic?: string;
  equipment?: string;
  primaryMuscles: string[];
  secondaryMuscles?: string[];
  instructions?: string;
  category: string;
  images?: string[];
  id: string;
};
