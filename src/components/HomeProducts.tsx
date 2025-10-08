'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {Zap, Leaf} from 'lucide-react';
import Link from 'next/link';
import {useLocale} from 'next-intl';
import Image from 'next/image';

export default function HomeProducts() {
  const t = useTranslations('products');
  const tDetail = useTranslations('productDetail');
  const locale = useLocale();

  // 只显示前两个分类，每个分类只显示前两个产品
  const featuredCategories = [
    {
      id: '消泡剂',
      title: t('categories.消泡剂.title'),
      subtitle: t('categories.消泡剂.subtitle'),
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      image: '/products/有机硅型消泡剂HY611.png',
      products: [
        {
          name: tDetail('productNames.hy-611'),
          description: tDetail('productDescriptions.hy-611'),
          link: `/${locale}/products/hy-611`
        },
        {
          name: tDetail('productNames.hy-603'),
          description: tDetail('productDescriptions.hy-603'),
          link: `/${locale}/products/hy-603`
        }
      ]
    },
    {
      id: '农药助剂',
      title: t('categories.农药助剂.title'),
      subtitle: t('categories.农药助剂.subtitle'),
      icon: Leaf,
      color: 'from-green-500 to-green-600',
      image: '/products/农用有机硅展渗剂.png',
      products: [
        {
          name: tDetail('productNames.hy8308'),
          description: tDetail('productDescriptions.hy8308'),
          link: `/${locale}/products/hy8308`
        },
        {
          name: tDetail('productNames.hy8328'),
          description: tDetail('productDescriptions.hy8328'),
          link: `/${locale}/products/hy8328`
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            viewport={{once: true}}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* 产品分类网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: categoryIndex * 0.1}}
              viewport={{once: true}}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* 分类头部 */}
              <div className={`bg-gradient-to-r ${category.color} text-white p-6`}>
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 bg-white bg-opacity-20 rounded-lg overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                    <p className="text-blue-100 mt-1">{category.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* 产品列表 */}
              <div className="p-6">
                <div className="space-y-4">
                  {category.products.map((product, productIndex) => (
                    <motion.div
                      key={product.name}
                      initial={{opacity: 0, x: -20}}
                      whileInView={{opacity: 1, x: 0}}
                      transition={{duration: 0.6, delay: productIndex * 0.1}}
                      viewport={{once: true}}
                      className="border-l-4 border-blue-500 pl-4 hover:border-blue-600 transition-colors"
                    >
                      <Link href={product.link} className="block group">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {product.description}
                        </p>
                        <div className="mt-2 text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                          {t('viewDetails')} →
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 更多按钮 */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.4}}
          viewport={{once: true}}
          className="text-center mt-16"
        >
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('cta.button')} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
