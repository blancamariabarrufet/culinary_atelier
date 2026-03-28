"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { CATEGORIES } from "@/lib/data";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Culinary Atelier</span>
        </Link>

        <ul className={`${styles.links} ${mobileOpen ? styles.linksOpen : ""}`}>
          {CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/categoria/${cat.slug}`}
                className={styles.navLink}
                onClick={() => setMobileOpen(false)}
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={styles.menuBtn}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menú"
        >
          <span className={`${styles.menuIcon} ${mobileOpen ? styles.menuIconOpen : ""}`} />
        </button>
      </div>
    </nav>
  );
}
