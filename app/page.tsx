import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { getAllRecipes } from "@/lib/data";
import { getDifficultyLabel } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";

export const revalidate = 60;

export default async function HomePage() {
  const allRecipes = await getAllRecipes();

  return (
    <div className={styles.page}>
      {/* ───── Hero: Search ───── */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Describe lo que te apetece cocinar
        </h1>
        <p className={styles.heroSubtitle}>
          Busca entre nuestra colección de recetas curadas con tradición y técnica
        </p>
        <SearchBar />
      </section>

      {/* ───── Popular Recipes ───── */}
      {allRecipes.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>Lo Más Buscado</span>
              <h2 className={styles.sectionTitle}>Recetas Populares</h2>
            </div>
          </div>
          <div className={styles.recipeGrid}>
            {allRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/receta/${recipe.categorySlug}/${recipe.id}`}
                className={styles.card}
              >
                <div className={styles.cardImage}>
                  <Image
                    src="/files/sample.png"
                    alt={recipe.nombre_receta}
                    width={300}
                    height={220}
                    className={styles.cardImg}
                  />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardTag}>
                    {getDifficultyLabel(recipe.dificultad)}
                  </span>
                  <h3 className={styles.cardTitle}>{recipe.nombre_receta}</h3>
                  <p className={styles.cardDesc}>
                    {recipe.numero_ingredientes} ingredientes · {recipe.numero_pasos} pasos
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
