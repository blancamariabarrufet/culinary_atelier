import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>Culinary Atelier</span>
          <p className={styles.tagline}>
            Un espacio dedicado a la excelencia gastronómica y la preservación
            de las técnicas clásicas con un enfoque contemporáneo.
          </p>
        </div>

        <div className={styles.navSection}>
          <h4 className={styles.heading}>Navegación</h4>
          <ul className={styles.navList}>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/categoria/postres">Postres</Link></li>
            <li><Link href="/categoria/comidas-principales">Comidas</Link></li>
            <li><Link href="/categoria/sopas">Sopas</Link></li>
          </ul>
        </div>

        <div className={styles.newsletter}>
          <h4 className={styles.heading}>Inspiración Semanal</h4>
          <div className={styles.inputRow}>
            <input
              type="email"
              placeholder="Correo electrónico"
              className={styles.emailInput}
              aria-label="Correo electrónico"
            />
            <button className={styles.subscribeBtn}>Unirse</button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; {new Date().getFullYear()} Culinary Atelier. Modern Classic Heritage.</span>
      </div>
    </footer>
  );
}
