import { supabase } from "./supabase";
import {
  Receta,
  CategoryConfig,
  TipoComida,
  RecetaRow,
  IngredienteRow,
  PasoRow,
} from "@/types";

/* ─── Categories ─── */

let categoriesCache: CategoryConfig[] | null = null;

export async function getCategories(): Promise<CategoryConfig[]> {
  if (categoriesCache) return categoriesCache;

  const { data, error } = await supabase
    .from("tipos_comida")
    .select("*")
    .order("id");

  if (error) throw error;

  categoriesCache = (data as TipoComida[]).map((t) => ({
    slug: t.slug,
    label: t.nombre,
    id: t.id,
  }));

  return categoriesCache;
}

export function getCategoryBySlug(
  categories: CategoryConfig[],
  slug: string
): CategoryConfig | undefined {
  return categories.find((c) => c.slug === slug);
}

/* ─── Recipes ─── */

function assembleReceta(
  row: RecetaRow,
  ingredientes: IngredienteRow[],
  pasos: PasoRow[],
  categorySlug: string
): Receta {
  return {
    id: row.id,
    nombre_receta: row.nombre,
    numero_comensales: row.numero_comensales,
    dificultad: row.dificultad,
    numero_ingredientes: ingredientes.length,
    numero_pasos: pasos.length,
    ingredientes: ingredientes.map((i) => ({
      id: i.id,
      nombre: i.nombre,
      cantidad: i.cantidad ?? "",
      unidad: i.unidad ?? "",
    })),
    pasos: pasos
      .sort((a, b) => a.numero - b.numero)
      .map((p) => ({
        id: p.id,
        numero: p.numero,
        descripcion: p.descripcion,
      })),
    tiene_recomendaciones: row.tiene_recomendaciones,
    recomendaciones: row.recomendaciones ?? "",
    categorySlug,
  };
}

export async function getRecipesByCategory(
  categorySlug: string
): Promise<Receta[]> {
  const categories = await getCategories();
  const cat = getCategoryBySlug(categories, categorySlug);
  if (!cat) return [];

  const { data: recetaRows, error: rErr } = await supabase
    .from("recetas")
    .select("*")
    .eq("tipo_id", cat.id)
    .order("id");

  if (rErr) throw rErr;
  if (!recetaRows || recetaRows.length === 0) return [];

  const recetaIds = (recetaRows as RecetaRow[]).map((r) => r.id);

  const [{ data: allIng, error: iErr }, { data: allPasos, error: pErr }] =
    await Promise.all([
      supabase
        .from("ingredientes")
        .select("*")
        .in("receta_id", recetaIds),
      supabase
        .from("pasos")
        .select("*")
        .in("receta_id", recetaIds)
        .order("numero"),
    ]);

  if (iErr) throw iErr;
  if (pErr) throw pErr;

  return (recetaRows as RecetaRow[]).map((row) =>
    assembleReceta(
      row,
      (allIng as IngredienteRow[]).filter((i) => i.receta_id === row.id),
      (allPasos as PasoRow[]).filter((p) => p.receta_id === row.id),
      categorySlug
    )
  );
}

export async function getRecipeById(
  recipeId: string
): Promise<Receta | null> {
  const id = parseInt(recipeId, 10);
  if (isNaN(id)) return null;

  const { data: row, error: rErr } = await supabase
    .from("recetas")
    .select("*")
    .eq("id", id)
    .single();

  if (rErr || !row) return null;

  const categories = await getCategories();
  const cat = categories.find((c) => c.id === (row as RecetaRow).tipo_id);
  if (!cat) return null;

  const [{ data: ingredientes, error: iErr }, { data: pasos, error: pErr }] =
    await Promise.all([
      supabase.from("ingredientes").select("*").eq("receta_id", id),
      supabase.from("pasos").select("*").eq("receta_id", id).order("numero"),
    ]);

  if (iErr) throw iErr;
  if (pErr) throw pErr;

  return assembleReceta(
    row as RecetaRow,
    (ingredientes as IngredienteRow[]) ?? [],
    (pasos as PasoRow[]) ?? [],
    cat.slug
  );
}

export async function getAllRecipes(): Promise<Receta[]> {
  const categories = await getCategories();

  const { data: recetaRows, error: rErr } = await supabase
    .from("recetas")
    .select("*")
    .order("id");

  if (rErr) throw rErr;
  if (!recetaRows || recetaRows.length === 0) return [];

  const recetaIds = (recetaRows as RecetaRow[]).map((r) => r.id);

  const [{ data: allIng, error: iErr }, { data: allPasos, error: pErr }] =
    await Promise.all([
      supabase.from("ingredientes").select("*").in("receta_id", recetaIds),
      supabase
        .from("pasos")
        .select("*")
        .in("receta_id", recetaIds)
        .order("numero"),
    ]);

  if (iErr) throw iErr;
  if (pErr) throw pErr;

  return (recetaRows as RecetaRow[]).map((row) => {
    const cat = categories.find((c) => c.id === (row as RecetaRow).tipo_id);
    return assembleReceta(
      row as RecetaRow,
      (allIng as IngredienteRow[]).filter((i) => i.receta_id === (row as RecetaRow).id),
      (allPasos as PasoRow[]).filter((p) => p.receta_id === (row as RecetaRow).id),
      cat?.slug ?? ""
    );
  });
}

/* ─── Backward-compat: keep CATEGORIES as a static list for nav ─── */
export const CATEGORIES: CategoryConfig[] = [
  { slug: "desayunos", label: "Desayunos", id: 1 },
  { slug: "comidas-principales", label: "Comidas principales", id: 2 },
  { slug: "postres", label: "Postres", id: 3 },
  { slug: "sopas", label: "Sopas", id: 4 },
  { slug: "ensaladas", label: "Ensaladas", id: 5 },
];
