// ========================
// TYPES
// ========================

export interface Exercise {
  id: string; // Unique ID
  name: string; // Exercise name
  muscleGroup: string; // e.g., "Chest", "Back", "Legs"
  sets?: number; // Optional sets
  reps?: number; // Optional reps
}

export interface WorkoutDay {
  day: string; // "Monday", "Tuesday", etc.
  exercises: Exercise[];
}

export interface Split {
  id: string; // Unique ID for the split
  name: string; // Split name
  days: WorkoutDay[]; // List of days (Mon–Sun)
}

// ========================
// CONSTANTS
// ========================

export const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ========================
// HELPER FUNCTIONS
// ========================

/**
 * Create an empty split template with days Monday–Sunday.
 */
export const createEmptySplit = (id: string, name: string): Split => {
  return {
    id,
    name,
    days: dayNames.map((day) => ({ day, exercises: [] })),
  };
};
