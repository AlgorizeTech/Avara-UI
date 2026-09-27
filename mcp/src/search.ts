import type { RegistryIndexItem } from "./registry/types.js";

/**
 * Search priority (mcp-guide.md section 17): exact name, partial name,
 * category, title/description, docs text. No embeddings, no fake scores —
 * just a rank derived from which field matched.
 */

export interface SearchResult {
  name: string;
  title?: string;
  description?: string;
  categories: string[];
  type: string;
  tier: "free" | "premium";
  locked: boolean;
  registryUrl: string;
}

const RANK = {
  exactName: 0,
  partialName: 1,
  category: 2,
  titleOrDescription: 3,
  docs: 4,
} as const;

function matchRank(item: RegistryIndexItem, query: string, category?: string): number | null {
  const q = query.trim().toLowerCase();
  if (category && !item.categories.some((c) => c.toLowerCase() === category.toLowerCase())) {
    return null;
  }
  if (!q) return category ? RANK.category : RANK.titleOrDescription;

  const name = item.name.toLowerCase();
  if (name === q) return RANK.exactName;
  if (name.includes(q)) return RANK.partialName;
  if (item.categories.some((c) => c.toLowerCase().includes(q))) return RANK.category;
  const title = (item.title || "").toLowerCase();
  const description = (item.description || "").toLowerCase();
  if (title.includes(q) || description.includes(q)) return RANK.titleOrDescription;
  const docs = (item.docs || "").toLowerCase();
  if (docs.includes(q)) return RANK.docs;
  return null;
}

export function searchItems(
  items: RegistryIndexItem[],
  itemUrl: (name: string) => string,
  query: string,
  category?: string,
  limit = 20,
): SearchResult[] {
  const ranked = items
    .map((item) => ({ item, rank: matchRank(item, query, category) }))
    .filter((r): r is { item: RegistryIndexItem; rank: number } => r.rank !== null)
    .sort((a, b) => a.rank - b.rank || a.item.name.localeCompare(b.item.name))
    .slice(0, limit);

  return ranked.map(({ item }) => toSearchResult(item, itemUrl));
}

export function toSearchResult(item: RegistryIndexItem, itemUrl: (name: string) => string): SearchResult {
  return {
    name: item.name,
    title: item.title,
    description: item.description,
    categories: item.categories,
    type: item.type,
    tier: item.tier,
    locked: item.tier === "premium",
    registryUrl: itemUrl(item.name),
  };
}
