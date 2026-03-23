import { CategoryGuideList } from "@/components/CategoryGuideList";
import { CATEGORY_TAGS, isCategoryTag } from "@/data/categories";
import { getGuidesByTag } from "@/data/guides";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return CATEGORY_TAGS.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  if (!isCategoryTag(tag)) {
    return { title: "Category — Kari's Guides" };
  }
  const title = `${tag} — Kari's Guides`;
  return {
    title,
    description: `Guides tagged with ${tag}.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { tag } = await params;
  if (!isCategoryTag(tag)) {
    notFound();
  }
  const guides = getGuidesByTag(tag);
  return <CategoryGuideList tag={tag} guides={guides} />;
}
