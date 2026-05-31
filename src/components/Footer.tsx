'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {MapPin, Mail, MessageCircle, User} from 'lucide-react';
import Image from 'next/image';
import {useLocale} from 'next-intl';
import {useMemo} from 'react';
import Link from 'next/link';
import productsData from '@/data/products.json';
import {getVisibleProductCategoryIds} from '@/lib/product-categories';

export default function Footer() {
  const t = useTranslations('footer');
  const tProducts = useTranslations('products');
  const currentLocale = useLocale();

  // 从products.json动态生成产品分类
  const productCategories = useMemo(() => {
    return getVisibleProductCategoryIds(Object.values(productsData)).map((categoryId) => ({
      id: categoryId,
      title: tProducts(`categories.${categoryId}.title`)
    }));
  }, [tProducts]);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-300">
              {productCategories.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/${currentLocale}/products?category=${encodeURIComponent(category.id)}`}
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
              {currentLocale === 'en' && (
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2 text-green-400" />
                  <div>
                    <div className="text-sm text-gray-400">{t('contact.whatsapp')}</div>
                    <a href="https://wa.me/85277921151" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                      {t('contact.whatsappPhone')}
                    </a>
                  </div>
                </div>
              )}
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
