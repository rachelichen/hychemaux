'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {Zap, Filter, Leaf, Shield} from 'lucide-react';
import Link from 'next/link';
import {useLocale} from 'next-intl';

export default function Products() {
  const t = useTranslations('products');
  const locale = useLocale();

  const productCategories = [
    {
      id: '有机硅消泡剂',
      title: t('categories.有机硅消泡剂.title'),
      subtitle: t('categories.有机硅消泡剂.subtitle'),
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      products: [
        {
          name: 'HY-611有机硅型消泡剂',
          description: '高效有机硅消泡剂，适用于水处理、石油开采和工业清洗等应用',
          link: `/${locale}/products/hy-611`
        },
        {
          name: 'HY-603有机硅型消泡剂',
          description: '高含量有机硅消泡剂，提供持久的消泡性能',
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
      products: [
        {
          name: 'HY8308农用有机硅展渗剂',
          description: '农用有机硅展渗剂，提高农药和肥料的施用效果',
          link: `/${locale}/products/hy8308`
        },
        {
          name: 'HY8328农用有机硅润湿剂',
          description: '农用有机硅润湿剂，增强药液在植物表面的润湿渗透能力',
          link: `/${locale}/products/hy8328`
        }
      ]
    },
    {
      id: '脱模剂',
      title: t('categories.脱模剂.title'),
      subtitle: t('categories.脱模剂.subtitle'),
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      products: [
        {
          name: 'HY-9072脱模剂',
          description: '水性脱模剂，适用于金属机械加工、汽车制造等应用',
          link: `/${locale}/products/hy-9072`
        },
        {
          name: 'HY-09N脱模剂',
          description: '高效脱模剂，具有润滑性、耐磨耗性、消泡性等特点',
          link: `/${locale}/products/hy-09n`
        },
        {
          name: 'HY-19N脱模剂',
          description: '环保水性脱模剂，具有高的润滑性和抗冲击性',
          link: `/${locale}/products/hy-19n`
        },
        {
          name: 'HY-59N脱模剂',
          description: '多元改性脱模剂，使用简单、功能强大',
          link: `/${locale}/products/hy-59n`
        }
      ]
    },
    {
      id: '玻璃纤维浸润剂',
      title: t('categories.玻璃纤维浸润剂.title'),
      subtitle: t('categories.玻璃纤维浸润剂.subtitle'),
      icon: Filter,
      color: 'from-orange-500 to-orange-600',
      products: [
        {
          name: 'HY-501玻纤浸润剂',
          description: '玻璃纤维浸润剂，增强纤维间的附着力及集束硬度',
          link: `/${locale}/products/hy-501`
        }
      ]
    },
    {
      id: '碳纤维浸润剂',
      title: t('categories.碳纤维浸润剂.title'),
      subtitle: t('categories.碳纤维浸润剂.subtitle'),
      icon: Filter,
      color: 'from-indigo-500 to-indigo-600',
      products: [
        {
          name: 'HY-503碳纤浸润剂',
          description: '碳纤维浸润剂，改善碳纤维与树脂间的附着力',
          link: `/${locale}/products/hy-503`
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
          {productCategories.map((category, categoryIndex) => (
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
                  <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                    <category.icon className="w-8 h-8" />
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

        {/* 底部CTA */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.4}}
          viewport={{once: true}}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            {t('cta.description')}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('cta.button')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
