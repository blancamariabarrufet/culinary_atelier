"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Receta } from "@/types";
import { getDifficultyLabel } from "@/lib/utils";
import styles from "./CategoryContent.module.css";

type SortKey = "dificultad" | "numero_ingredientes" | "numero_pasos";
type SortDir = "asc" | "desc";

interface CategoryContentProps {
  slug: string;
  label: string;
  recipes: Receta[];
}

export default function CategoryContent({
  slug,
  label,
  recipes,
}: CategoryContentProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("dificultad");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [filterDificultad, setFilterDificultad] = useState<number | "">("");

  const filteredAndSorted = useMemo(() => {
    let result = [...recipes];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((r) =>
        r.nombre_receta.toLowerCase().includes(q)
      );
    }

    if (filterDificultad !== "") {
      result = result.filter((r) => r.dificultad === filterDificultad);
    }

    result.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [recipes, search, sortKey, sortDir, filterDificultad]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.tag}>Colección</span>
        <h1 className={styles.title}>{label}</h1>
        <div className={styles.accent} />
      </div>

      <div className={styles.toolbar}>
        <input
          type="search"
          placeholder="Buscar recetas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
          aria-label="Buscar recetas"
        />
        <div className={styles.controls}>
          <label className={styles.controlLabel}>
            Ordenar:
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className={styles.select}
            >
              <option value="dificultad">Dificultad</option>
              <option value="numero_ingredientes">Ingredientes</option>
              <option value="numero_pasos">Pasos</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            className={styles.sortBtn}
            aria-label={sortDir === "asc" ? "Orden ascendente" : "Orden descendente"}
          >
            {sortDir === "asc" ? "↑" : "↓"}
          </button>
          <label className={styles.controlLabel}>
            Dificultad:
            <select
              value={filterDificultad}
              onChange={(e) =>
                setFilterDificultad(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className={styles.select}
            >
              <option value="">Todas</option>
              <option value="1">Muy fácil</option>
              <option value="2">Fácil</option>
              <option value="3">Media</option>
            </select>
          </label>
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <p className={styles.empty}>No se encontraron recetas.</p>
      ) : (
        <div className={styles.grid}>
          {filteredAndSorted.map((receta) => (
              <Link
                key={receta.id}
                href={`/receta/${slug}/${receta.id}`}
                className={styles.card}
              >
                <div className={styles.cardImageWrap}>
                  <Image
                    src="/files/sample.png"
                    alt={receta.nombre_receta}
                    width={300}
                    height={220}
                    className={styles.cardImg}
                  />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardTag}>
                    {getDifficultyLabel(receta.dificultad)}
                  </span>
                  <h2 className={styles.cardTitle}>{receta.nombre_receta}</h2>
                  <p className={styles.cardMeta}>
                    {receta.numero_ingredientes} ingredientes · {receta.numero_pasos} pasos
                  </p>
                </div>
              </Link>
          ))}
        </div>
      )}
    </div>
  );
}
