"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { Receta, Ingrediente } from "@/types";
import {
  parseCantidad,
  formatScaledQuantity,
  canUseAsAnchor,
  getDifficultyLabel,
} from "@/lib/utils";
import styles from "./RecipeDetail.module.css";

interface RecipeDetailProps {
  recipe: Receta;
  categoryLabel: string;
}

type ScaleMode = "none" | "comensales" | "ingredient";

export default function RecipeDetail({ recipe, categoryLabel }: RecipeDetailProps) {
  const baseComensales = Math.max(recipe.numero_comensales, 1);
  const [comensales, setComensales] = useState(baseComensales);
  const [scaleMode, setScaleMode] = useState<ScaleMode>("none");
  const [anchorId, setAnchorId] = useState<number | null>(null);
  const [anchorNewQty, setAnchorNewQty] = useState("");

  const anchorableIngredients = useMemo(
    () => recipe.ingredientes.filter(canUseAsAnchor),
    [recipe.ingredientes]
  );

  const scaledIngredients = useMemo(() => {
    let ratio = 1;
    if (scaleMode === "comensales") {
      ratio = comensales / baseComensales;
    } else if (scaleMode === "ingredient" && anchorId !== null) {
      const ing = recipe.ingredientes.find((i) => i.id === anchorId);
      if (ing) {
        const baseQty = parseCantidad(ing.cantidad);
        const newQty = parseFloat(anchorNewQty.replace(",", "."));
        if (baseQty !== null && !isNaN(newQty) && baseQty !== 0) {
          ratio = newQty / baseQty;
        }
      }
    }

    return recipe.ingredientes.map((ing) => {
      const num = parseCantidad(ing.cantidad);
      if (num === null) return { ...ing, displayCantidad: ing.cantidad };
      const scaled = num * ratio;
      return { ...ing, displayCantidad: formatScaledQuantity(scaled) };
    });
  }, [recipe.ingredientes, scaleMode, comensales, baseComensales, anchorId, anchorNewQty]);

  const handleComensalesChange = useCallback(
    (delta: number) => {
      setComensales((prev) => Math.max(1, prev + delta));
      setScaleMode("comensales");
    },
    []
  );

  const handleComensalesInput = useCallback((v: string) => {
    const n = parseInt(v, 10);
    if (!isNaN(n) && n >= 1) {
      setComensales(n);
      setScaleMode("comensales");
    }
  }, []);

  const handleAnchorScale = useCallback((ingId: number, newQty: string) => {
    setAnchorId(ingId);
    setAnchorNewQty(newQty);
    setScaleMode("ingredient");
  }, []);

  const resetQuantities = useCallback(() => {
    setComensales(baseComensales);
    setScaleMode("none");
    setAnchorId(null);
    setAnchorNewQty("");
  }, [baseComensales]);

  return (
    <div className={styles.page}>
      {/* ───── Title ───── */}
      <header className={styles.header}>
        <span className={styles.categoryTag}>{categoryLabel}</span>
        <h1 className={styles.title}>{recipe.nombre_receta}</h1>
        <div className={styles.titleAccent} />
      </header>

      {/* ───── Top row: Left column (details + ingredients) | Right column (image) ───── */}
      <div className={styles.topRow}>
        <div className={styles.leftCol}>
          {/* Details card */}
          <div className={styles.detailsCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Recipe Details</span>
              <span className={styles.cardSub}>The Curated Atelier</span>
            </div>
            <div className={styles.cardItems}>
              <div className={styles.cardItem}>
                <span className={styles.cardItemIcon}>&#9201;</span>
                <div>
                  <span className={styles.cardItemLabel}>Pasos</span>
                  <span className={styles.cardItemValue}>{recipe.numero_pasos} pasos</span>
                </div>
              </div>
              <div className={styles.cardItem}>
                <span className={styles.cardItemIcon}>&#x1F465;</span>
                <div>
                  <span className={styles.cardItemLabel}>Raciones</span>
                  <span className={styles.cardItemValue}>
                    {recipe.numero_comensales || "—"} raciones
                  </span>
                </div>
              </div>
              <div className={styles.cardItem}>
                <span className={styles.cardItemIcon}>&#x1F4CB;</span>
                <div>
                  <span className={styles.cardItemLabel}>Dificultad</span>
                  <span className={styles.cardItemValue}>{getDifficultyLabel(recipe.dificultad)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scaling controls */}
          <div className={styles.scaling}>
            <div className={styles.comensalesControl}>
              <label className={styles.scalingLabel}>
                Raciones:
                <div className={styles.stepper}>
                  <button type="button" onClick={() => handleComensalesChange(-1)}>−</button>
                  <input
                    type="number"
                    min={1}
                    value={comensales}
                    onChange={(e) => handleComensalesInput(e.target.value)}
                  />
                  <button type="button" onClick={() => handleComensalesChange(1)}>+</button>
                </div>
              </label>
            </div>
            <AnchorIngredientControl
              ingredients={anchorableIngredients}
              onApply={handleAnchorScale}
            />
            {scaleMode !== "none" && (
              <button type="button" onClick={resetQuantities} className={styles.resetBtn}>
                Restablecer
              </button>
            )}
          </div>

          {/* Ingredients */}
          <section>
            <h2 className={styles.sectionTitle}>Ingredientes</h2>
            <ul className={styles.ingredientsList}>
              {scaledIngredients.map((ing) => (
                <li key={ing.id} className={styles.ingredientRow}>
                  <span className={styles.ingName}>{ing.nombre}</span>
                  <span className={styles.ingDots} />
                  <span className={styles.ingQty}>
                    {formatIngQty(ing.displayCantidad, ing.unidad)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right column: Image + Steps */}
        <div className={styles.rightCol}>
          <div className={styles.imageWrap}>
            <Image
              src="/files/sample.png"
              alt={recipe.nombre_receta}
              width={480}
              height={360}
              className={styles.image}
              priority
            />
          </div>

          <section className={styles.stepsSection}>
            <h2 className={styles.sectionTitle}>Pasos de la Receta</h2>
            <div className={styles.stepsDivider} />
            <div className={styles.stepsList}>
              {recipe.pasos.map((paso, i) => (
                <div key={paso.id} className={styles.stepCard}>
                  <span className={styles.stepNumber}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>Paso {i + 1}</h3>
                    <p className={styles.stepDesc}>{paso.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ───── Recommendations ───── */}
      {recipe.tiene_recomendaciones && recipe.recomendaciones && recipe.recomendaciones !== "TODO" && (
        <section className={styles.recommendations}>
          <h2 className={styles.sectionTitle}>Recomendaciones</h2>
          <p className={styles.recoText}>{recipe.recomendaciones}</p>
        </section>
      )}
    </div>
  );
}

const COMPACT_UNITS = new Set(["g", "kg", "mg", "ml", "l", "cl", "dl", "cda", "cdita"]);

function formatIngQty(cantidad: string, unidad: string): string {
  if (!cantidad || cantidad === "TODO") return "";
  if (!unidad || unidad === "TODO") return cantidad;
  const sep = COMPACT_UNITS.has(unidad.toLowerCase()) ? "" : " ";
  return `${cantidad}${sep}${unidad}`;
}

function AnchorIngredientControl({
  ingredients,
  onApply,
}: {
  ingredients: Ingrediente[];
  onApply: (id: number, newQty: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [newQty, setNewQty] = useState("");

  const selected = ingredients.find((i) => i.id === selectedId);

  const handleApply = () => {
    if (selectedId !== null && newQty.trim()) {
      onApply(selectedId, newQty.trim());
      setOpen(false);
      setNewQty("");
      setSelectedId(null);
    }
  };

  if (ingredients.length === 0) return null;

  return (
    <div className={styles.anchorControl}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={styles.anchorBtn}
      >
        Escalar por ingrediente
      </button>
      {open && (
        <div className={styles.anchorPanel}>
          <p className={styles.anchorNote}>
            Selecciona un ingrediente y su nueva cantidad. El resto se escalará proporcionalmente.
          </p>
          <label className={styles.anchorLabel}>
            Ingrediente:
            <select
              value={selectedId ?? ""}
              onChange={(e) =>
                setSelectedId(e.target.value === "" ? null : Number(e.target.value))
              }
              className={styles.anchorSelect}
            >
              <option value="">Seleccionar</option>
              {ingredients.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.nombre} ({i.cantidad} {i.unidad})
                </option>
              ))}
            </select>
          </label>
          {selected && (
            <label className={styles.anchorLabel}>
              Nueva cantidad:
              <input
                type="text"
                value={newQty}
                onChange={(e) => setNewQty(e.target.value)}
                placeholder={selected.cantidad}
                className={styles.anchorInput}
              />
            </label>
          )}
          <button
            type="button"
            onClick={handleApply}
            disabled={!selectedId || !newQty.trim()}
            className={styles.anchorApply}
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
}
