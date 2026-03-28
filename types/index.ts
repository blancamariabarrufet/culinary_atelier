/* ─── Database row types ─── */

export interface TipoComida {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
}

export interface RecetaRow {
  id: number;
  tipo_id: number;
  nombre: string;
  numero_comensales: number;
  dificultad: number;
  tiene_recomendaciones: boolean;
  recomendaciones: string | null;
  created_at: string;
}

export interface IngredienteRow {
  id: number;
  receta_id: number;
  nombre: string;
  cantidad: string | null;
  unidad: string | null;
}

export interface PasoRow {
  id: number;
  receta_id: number;
  numero: number;
  descripcion: string;
}

/* ─── App-level types (assembled from DB rows) ─── */

export interface Ingrediente {
  id: number;
  nombre: string;
  cantidad: string;
  unidad: string;
}

export interface Paso {
  id: number;
  numero: number;
  descripcion: string;
}

export interface Receta {
  id: number;
  nombre_receta: string;
  numero_comensales: number;
  dificultad: number;
  numero_ingredientes: number;
  numero_pasos: number;
  ingredientes: Ingrediente[];
  pasos: Paso[];
  tiene_recomendaciones: boolean;
  recomendaciones: string;
  categorySlug: string;
}

export interface CategoryConfig {
  slug: string;
  label: string;
  id: number;
}

export type CategorySlug =
  | "desayunos"
  | "comidas-principales"
  | "postres"
  | "sopas"
  | "ensaladas";
