import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug, getRecipesByCategory } from "@/lib/data";
import CategoryContent from "./CategoryContent";

export const revalidate = 60;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const config = getCategoryBySlug(categories, slug);
  if (!config) notFound();

  const recipes = await getRecipesByCategory(slug);

  return (
    <CategoryContent
      slug={slug}
      label={config.label}
      recipes={recipes}
    />
  );
}
