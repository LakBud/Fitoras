import type { Exercises } from "@/types/exercise";

export function parseInstructions(exercise?: Exercises): string[] {
  if (!exercise?.instructions) return [];

  const raw = exercise.instructions;

  const lines = typeof raw === "string" ? raw.split("\n") : Object.values(raw);

  return lines
    .map((step) =>
      String(step)
        .trim()
        .replace(/\.(\S)/g, ". $1")
    )
    .filter(Boolean);
}
