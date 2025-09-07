'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import productsData from '@/data/products.json';

interface Product {
  id: string;
  name: string;
  code: string;
  description?: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  products: Product[];
}

export default function ProductPage() {
  const t = useTranslations('products');
  const locale = useLocale();

  // 从products.json动态生成分类和产品数据
  const categories: Category[] = useMemo(() => {
    const categoryMap = new Map<string, Product[]>();
    
    // 遍历products.json数据，按category分组
    Object.entries(productsData).forEach(([productId, productData]) => {
      const category = productData.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      
      categoryMap.get(category)!.push({
        id: productId,
        name: productData.product_name,
        code: productId.toUpperCase(),
        description: productData.product_introduction,
        category: category
      });
    });

    // 转换为Category数组格式
    return Array.from(categoryMap.entries()).map(([categoryName, products]) => ({
      id: categoryName,
      name: t(`categories.${categoryName}.title`),
      icon: t(`categories.${categoryName}.icon`),
      products: products
    }));
  }, [t]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '');

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:w-1/4">
            <div className="bg-blue-600 text-white px-4 py-3 font-semibold">
              {t('categoriesTitle')}
            </div>
            <div className="border border-gray-200 border-t-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    selectedCategory === category.id 
                      ? 'text-blue-600 font-medium bg-blue-50' 
                      : 'text-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Products */}
          <div className="lg:w-3/4">
            {currentCategory && (
              <>
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">{currentCategory.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentCategory.name}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentCategory.products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/${locale}/products/${product.id}`}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group block"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-blue-600">
                            {product.code}
                          </h3>
                        </div>
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors ml-2">
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
