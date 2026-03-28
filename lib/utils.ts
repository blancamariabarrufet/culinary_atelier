import { Ingrediente } from "@/types";

export const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Muy fácil",
  2: "Fácil",
  3: "Media",
  4: "Difícil",
  5: "Muy difícil",
};

export function getDifficultyLabel(dificultad: number): string {
  return DIFFICULTY_LABELS[dificultad] ?? "Media";
}

/**
 * Rounds scaled quantity: if ~integer (±0.01) show int, else max 2 decimals, trim trailing zeros
 */
export function formatScaledQuantity(value: number): string {
  if (Math.abs(value - Math.round(value)) < 0.01) {
    return String(Math.round(value));
  }
  const s = value.toFixed(2);
  return s.replace(/\.?0+$/, "");
}

/**
 * Parses cantidad string to number. Returns null if not numeric (e.g. "al gusto", "TODO", empty)
 */
export function parseCantidad(cantidad: string): number | null {
  if (!cantidad || typeof cantidad !== "string") return null;
  const trimmed = cantidad.trim().toLowerCase();
  if (
    trimmed === "" ||
    trimmed === "al gusto" ||
    trimmed === "todo" ||
    trimmed === "al gusto"
  )
    return null;
  const num = parseFloat(cantidad.replace(",", "."));
  return isNaN(num) ? null : num;
}

/**
 * Check if ingredient can be used as anchor for scaling (has numeric cantidad)
 */
export function canUseAsAnchor(ingrediente: Ingrediente): boolean {
  return parseCantidad(ingrediente.cantidad) !== null;
}
