export const hiddenProductCategories = new Set(['农药助剂', '复合材料浸润剂', '改性剂']);

export const productCategoryOrder = [
  '消泡剂',
  '上浆剂',
  '改性硅油',
  '润湿剂',
  '纺织助剂',
  '脱模剂',
  '树脂乳液',
  '分散剂'
] as const;

interface ProductCategorySource {
  category?: string;
}

const productCategoryRank = new Map<string, number>(
  productCategoryOrder.map((category, index) => [category, index])
);

export const isVisibleProductCategory = (category?: string) => {
  return Boolean(category && !hiddenProductCategories.has(category));
};

export const sortProductCategoryIds = <T extends string>(categoryIds: T[]) => {
  return categoryIds
    .map((id, index) => ({id, index}))
    .sort((left, right) => {
      const leftRank = productCategoryRank.get(left.id) ?? Number.MAX_SAFE_INTEGER;
      const rightRank = productCategoryRank.get(right.id) ?? Number.MAX_SAFE_INTEGER;

      if (leftRank !== rightRank) {
        return leftRank - rightRank;
      }

      return left.index - right.index;
    })
    .map(({id}) => id);
};

export const getVisibleProductCategoryIds = (products: Iterable<ProductCategorySource>) => {
  const categoryIds: string[] = [];

  for (const product of products) {
    const category = product.category;
    if (!isVisibleProductCategory(category) || categoryIds.includes(category!)) continue;
    categoryIds.push(category!);
  }

  return sortProductCategoryIds(categoryIds);
};
