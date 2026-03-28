import { notFound } from "next/navigation";
import { getRecipeById, getCategories, getCategoryBySlug } from "@/lib/data";
import RecipeDetail from "./RecipeDetail";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ category: string; id: string }>;
}

export default async function RecipePage({ params }: PageProps) {
  const { category, id } = await params;
  const categories = await getCategories();
  const config = getCategoryBySlug(categories, category);
  if (!config) notFound();

  const recipe = await getRecipeById(id);
  if (!recipe) notFound();

  return <RecipeDetail recipe={recipe} categoryLabel={config.label} />;
}
