'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {Facebook, Linkedin, Mail, MapPin, MessageCircle, Music2, User, Youtube} from 'lucide-react';
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
  const socialLinks = [
    {
      label: 'Facebook',
      icon: Facebook,
      href: 'https://www.facebook.com/share/19L6Tt6TaR/?mibextid=wwXIfr'
    },
    {
      label: 'LinkedIn',
      icon: Linkedin
    },
    {
      label: 'YouTube',
      icon: Youtube
    },
    {
      label: 'TikTok',
      icon: Music2
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[auto_auto_minmax(2rem,1fr)_auto_minmax(2rem,1fr)_auto] lg:items-start lg:gap-x-8">
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
            className="min-w-0 lg:col-start-1"
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
            className="min-w-0 lg:col-start-2"
          >
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            viewport={{once: true}}
            className="min-w-0 lg:col-start-4 lg:w-[420px] xl:w-[460px]"
          >
            <h3 className="text-lg font-semibold mb-4">{t('products.title')}</h3>
            <ul className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-2 text-gray-300 lg:grid-cols-2">
              {productCategories.map((category) => (
                <li key={category.id} className="min-w-0">
                  <Link 
                    href={`/${currentLocale}/products?category=${encodeURIComponent(category.id)}`}
                    className="block break-words hover:text-blue-400 transition-colors"
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
            className="min-w-0 lg:col-start-6 lg:w-[380px] xl:w-[420px]"
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
                <span className="break-words">{t('contact.address')}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {socialLinks.map((social) => (
                social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ) : (
                  <span
                    key={social.label}
                    aria-label={`${social.label} coming soon`}
                    title={social.label}
                    className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-blue-600 text-white"
                  >
                    <social.icon className="h-6 w-6" />
                  </span>
                )
              ))}
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
