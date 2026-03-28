"use client";

import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrap}>
        <svg
          className={styles.icon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca una receta, ingrediente o tipo de cocina..."
          className={styles.input}
          aria-label="Buscar recetas"
        />
      </div>
    </div>
  );
}
