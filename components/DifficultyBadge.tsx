import { getDifficultyLabel } from "@/lib/utils";
import styles from "./DifficultyBadge.module.css";

interface DifficultyBadgeProps {
  dificultad: number;
  showLabel?: boolean;
}

export default function DifficultyBadge({
  dificultad,
  showLabel = true,
}: DifficultyBadgeProps) {
  const label = getDifficultyLabel(dificultad);
  const maxDots = 3;
  const dots = Array.from({ length: maxDots }, (_, i) => i + 1);

  return (
    <span className={styles.badge} title={label}>
      <span className={styles.dots} aria-hidden>
        {dots.map((d) => (
          <span
            key={d}
            className={`${styles.dot} ${d <= dificultad ? styles.filled : ""}`}
          />
        ))}
      </span>
      {showLabel && <span className={styles.label}>{label}</span>}
    </span>
  );
}
