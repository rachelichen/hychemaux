'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import productsData from '@/data/products.json';
import productsDataEn from '@/data/products_en.json';
import {isVisibleProductCategory, sortProductCategoryIds} from '@/lib/product-categories';

interface Product {
  id: string;
  name: string;
  code: string;
  description?: string;
  category: string;
  series?: string;
  subseries?: string;
}

interface ProductSource {
  product_name: string;
  product_code?: string;
  product_introduction?: string;
  category: string;
  series?: string;
  subseries?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  products: Product[];
}

interface HierarchyGroup {
  id: string;
  children: string[];
}

interface CatalogPlacement {
  category: string;
  series?: string;
  subseries?: string;
}

const productHierarchy: Record<string, HierarchyGroup[]> = {
  脱模剂: [
    {
      id: '金属脱模',
      children: []
    },
    {
      id: '橡胶脱模',
      children: []
    }
  ],
  改性硅油: [
    {
      id: '改性硅氧烷系列',
      children: ['常规聚硅氧烷', '单端封端聚硅氧烷']
    },
    {
      id: '长链烷基苯基改性硅油',
      children: []
    }
  ],
  纺织助剂: [
    {
      id: '化纤丝柔顺剂',
      children: []
    },
    {
      id: '抗菌防霉剂',
      children: []
    },
    {
      id: '面料助剂',
      children: []
    }
  ]
};

const additionalCatalogPlacements: Record<string, CatalogPlacement[]> = {
  'hy-09n': [
    {
      category: '脱模剂',
      series: '金属脱模'
    }
  ],
  'hy-19n': [
    {
      category: '脱模剂',
      series: '金属脱模'
    }
  ],
  'hy-59n': [
    {
      category: '脱模剂',
      series: '金属脱模'
    }
  ]
};

const hierarchyLabels: Record<string, { zh: string; en: string }> = {
  改性硅氧烷系列: {
    zh: '改性硅氧烷系列',
    en: 'Modified Siloxane Series'
  },
  长链烷基苯基改性硅油: {
    zh: '长链烷基苯基改性硅油',
    en: 'Long-Chain Alkyl Phenyl Modified Silicone Oil'
  },
  常规聚硅氧烷: {
    zh: '常规聚硅氧烷',
    en: 'Conventional Polysiloxane'
  },
  单端封端聚硅氧烷: {
    zh: '单端封端聚硅氧烷',
    en: 'Mono-End-Capped Polysiloxane'
  },
  金属脱模: {
    zh: '金属脱模',
    en: 'Metal Release'
  },
  橡胶脱模: {
    zh: '橡胶脱模',
    en: 'Rubber Release'
  },
  化纤丝柔顺剂: {
    zh: '化纤丝柔顺剂',
    en: 'Chemical Fiber Softener'
  },
  抗菌防霉剂: {
    zh: '抗菌防霉剂',
    en: 'Antibacterial and Antimildew Agents'
  },
  面料助剂: {
    zh: '面料助剂',
    en: 'Fabric Auxiliaries'
  }
};

const getProductCode = (productId: string, productName: string, productCode?: string) => {
  if (productCode) return productCode;
  const codeMatch = productName.match(/HY[-\s]?[A-Z0-9]+/i);
  return codeMatch ? codeMatch[0].replace(/\s+/g, '') : productId.toUpperCase();
};

const getHierarchyLabel = (id: string, locale: string) => {
  const label = hierarchyLabels[id];
  if (!label) return id;
  return locale === 'en' ? label.en : label.zh;
};

const getProductDisplayName = (product: Product) => product.name;

export default function ProductPage() {
  const t = useTranslations('products');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get('category');

  // 从products.json动态生成分类和产品数据
  const categories: Category[] = useMemo(() => {
    const categoryMap = new Map<string, Product[]>();

    // 遍历products.json数据，按category分组
    Object.entries(productsData).forEach(([productId, productData]) => {
      const data = productData as ProductSource;
      const localizedData = locale === 'en'
        ? productsDataEn[productId as keyof typeof productsDataEn] as ProductSource | undefined
        : undefined;
      const displayData = localizedData || data;
      const addProductToCategory = (placement: CatalogPlacement) => {
        const category = placement.category;
        if (!isVisibleProductCategory(category)) return;
        if (!categoryMap.has(category)) {
          categoryMap.set(category, []);
        }

        categoryMap.get(category)!.push({
          id: productId,
          name: displayData.product_name,
          code: getProductCode(productId, displayData.product_name, displayData.product_code),
          description: displayData.product_introduction,
          category: category,
          series: placement.series,
          subseries: placement.subseries
        });
      };

      addProductToCategory({
        category: data.category,
        series: data.series,
        subseries: data.subseries
      });

      additionalCatalogPlacements[productId]?.forEach(addProductToCategory);
    });

    // 转换为Category数组格式
    return sortProductCategoryIds(Array.from(categoryMap.keys())).map((categoryName) => {
      const products = categoryMap.get(categoryName) || [];

      return {
        id: categoryName,
        name: t(`categories.${categoryName}.title`),
        icon: t(`categories.${categoryName}.icon`),
        products: products
      };
    });
  }, [locale, t]);

  const initialCategory = categories.find(category => category.id === categoryFromQuery)?.id || categories[0]?.id || '';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedSubseries, setSelectedSubseries] = useState<string | null>(null);

  useEffect(() => {
    const nextCategory = categories.find(category => category.id === categoryFromQuery)?.id || categories[0]?.id || '';
    if (!nextCategory) return;

    setSelectedCategory(nextCategory);
    setSelectedSeries(null);
    setSelectedSubseries(null);
  }, [categories, categoryFromQuery]);

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const currentHierarchy = currentCategory ? productHierarchy[currentCategory.id] : undefined;
  const selectedSeriesConfig = currentHierarchy?.find(group => group.id === selectedSeries);
  const emptyText = locale === 'en' ? 'No products in this directory yet.' : '该目录暂无产品';

  const visibleProducts = currentCategory?.products.filter(product => {
    if (!currentHierarchy) return true;
    if (!selectedSeries) return false;
    if (product.series !== selectedSeries) return false;
    if (!selectedSeriesConfig?.children.length) return true;
    if (!selectedSubseries) return false;
    return product.subseries === selectedSubseries;
  }) || [];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSeries(null);
    setSelectedSubseries(null);

    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryId);
    router.replace(`${pathname}?${params.toString()}`, {scroll: false});
  };

  const renderProductGrid = (products: Product[]) => {
    if (products.length === 0) {
      return (
        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
          {emptyText}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/${locale}/products/${product.id}`}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group block"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-blue-600 break-words">
                  {getProductDisplayName(product)}
                </h3>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  const renderSidebarHierarchy = (category: Category) => {
    const hierarchy = productHierarchy[category.id];
    if (!hierarchy || selectedCategory !== category.id) return null;

    return (
      <div className="border-b border-gray-100 bg-blue-50/40 py-2">
        {hierarchy.map((group) => {
          const isSelectedSeries = selectedSeries === group.id;
          const hasChildren = group.children.length > 0;

          return (
            <div key={group.id}>
              <button
                type="button"
                onClick={() => {
                  setSelectedSeries(group.id);
                  setSelectedSubseries(null);
                }}
                className={`w-full flex items-center justify-between gap-2 py-2 pl-8 pr-4 text-left text-sm transition-colors ${
                  isSelectedSeries
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <span className="break-words">{getHierarchyLabel(group.id, locale)}</span>
                {hasChildren && (
                  <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isSelectedSeries ? 'rotate-90' : ''}`} />
                )}
              </button>

              {isSelectedSeries && hasChildren && (
                <div className="pb-1">
                  {group.children.map((child) => (
                    <button
                      key={child}
                      type="button"
                      onClick={() => setSelectedSubseries(child)}
                      className={`w-full py-2 pl-12 pr-4 text-left text-sm transition-colors ${
                        selectedSubseries === child
                          ? 'text-blue-600 font-medium bg-white/70'
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {getHierarchyLabel(child, locale)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:w-1/4" data-testid="product-category-sidebar">
            <div className="bg-blue-600 text-white px-4 py-3 font-semibold">
              {t('categoriesTitle')}
            </div>
            <div className="border border-gray-200 border-t-0">
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      selectedCategory === category.id
                        ? 'text-blue-600 font-medium bg-blue-50'
                        : 'text-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                  {renderSidebarHierarchy(category)}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Products */}
          <div className="lg:w-3/4" data-testid="product-content">
            {currentCategory && (
              <>
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">{currentCategory.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentCategory.name}
                  </h2>
                </div>

                {currentHierarchy ? (
                  <>
                    <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSeries(null);
                          setSelectedSubseries(null);
                        }}
                        className={`hover:text-blue-600 ${
                          !selectedSeries ? 'text-blue-600 font-medium' : 'text-gray-600'
                        }`}
                      >
                        {currentCategory.name}
                      </button>
                      {selectedSeries && (
                        <>
                          <span className="text-gray-400">/</span>
                          <button
                            type="button"
                            onClick={() => setSelectedSubseries(null)}
                            className={`hover:text-blue-600 ${
                              !selectedSubseries ? 'text-blue-600 font-medium' : 'text-gray-600'
                            }`}
                          >
                            {getHierarchyLabel(selectedSeries, locale)}
                          </button>
                        </>
                      )}
                      {selectedSubseries && (
                        <>
                          <span className="text-gray-400">/</span>
                          <span className="text-blue-600 font-medium">
                            {getHierarchyLabel(selectedSubseries, locale)}
                          </span>
                        </>
                      )}
                    </div>

                    {selectedSeries && (selectedSeriesConfig?.children.length === 0 || selectedSubseries) && renderProductGrid(visibleProducts)}
                  </>
                ) : (
                  renderProductGrid(currentCategory.products)
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
