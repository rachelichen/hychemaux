'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {MapPin, Mail, User, Wrench} from 'lucide-react';
import Image from 'next/image';
import {useLocale} from 'next-intl';
import {useMemo} from 'react';
import Link from 'next/link';
import productsData from '@/data/products.json';

export default function Footer() {
  const t = useTranslations('footer');
  const tProducts = useTranslations('products');
  const currentLocale = useLocale();

  // 从products.json动态生成产品分类
  const productCategories = useMemo(() => {
    const categoryMap = new Map<string, string[]>();
    
    // 遍历products.json数据，按category分组
    Object.entries(productsData).forEach(([, productData]) => {
      const category = productData.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(productData.product_name);
    });

    // 转换为分类数组格式，只取前4个分类
    return Array.from(categoryMap.entries()).slice(0, 4).map(([categoryName, products]) => ({
      name: categoryName,
      title: tProducts(`categories.${categoryName}.title`),
      products: products.slice(0, 2) // 每个分类最多显示2个产品
    }));
  }, [tProducts]);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
          >
             <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Image
                  src={currentLocale === 'zh' ? '/icon_zh.png' : '/icon_en.png'}
                  alt={currentLocale === 'zh' ? '珩钰科技' : 'Hengyu Technology'}
                  width={150}
                  height={150}
                />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.1}}
            viewport={{once: true}}
          >
            <h3 className="text-lg font-semibold mb-4">{t('products.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              {productCategories.map((category) => (
                <li key={category.name}>
                  <Link 
                    href={`/${currentLocale}/products`} 
                    className="hover:text-blue-400 transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            viewport={{once: true}}
          >
            <h3 className="text-lg font-semibold mb-4">{t('services.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('services.consultation')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('services.installation')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('services.maintenance')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('services.training')}</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.3}}
            viewport={{once: true}}
          >
            <h3 className="text-lg font-semibold mb-4">{t('contact.title')}</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-400" />
                <div>
                  <div className="text-sm text-gray-400">{t('contact.salesManager')}</div>
                  <a href={`tel:${t('contact.salesManagerPhone')}`} className="hover:text-blue-400 transition-colors">
                    {t('contact.salesManagerPhone')}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Wrench className="w-4 h-4 mr-2 text-green-400" />
                <div>
                  <div className="text-sm text-gray-400">{t('contact.technicalManager')}</div>
                  <a href={`tel:${t('contact.technicalManagerPhone')}`} className="hover:text-blue-400 transition-colors">
                    {t('contact.technicalManagerPhone')}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-red-400" />
                <a href={`mailto:${t('contact.email')}`} className="hover:text-blue-400 transition-colors">
                  {t('contact.email')}
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                <span>{t('contact.address')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition={{duration: 0.8, delay: 0.4}}
          viewport={{once: true}}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>
            {t('copyright')} · {t('rights')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
