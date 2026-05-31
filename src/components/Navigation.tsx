'use client';

import {useMemo, useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';
import {ChevronDown, Globe, Menu, X} from 'lucide-react';
import {usePathname} from 'next/navigation';
import productsData from '@/data/products.json';
import {getVisibleProductCategoryIds} from '@/lib/product-categories';

interface NavigationProps {
  transparent?: boolean;
}

export default function Navigation({ transparent = false }: NavigationProps) {
  const t = useTranslations('nav');
  const tProducts = useTranslations('products');
  const currentLocale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const productCategories = useMemo(() => {
    return getVisibleProductCategoryIds(Object.values(productsData)).map((categoryId) => ({
      id: categoryId,
      title: tProducts(`categories.${categoryId}.title`)
    }));
  }, [tProducts]);

  const toggleLocale = () => {
    const newLocale = currentLocale === 'zh' ? 'en' : 'zh';
    window.location.href = `/${newLocale}`;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // 检查当前路径是否匹配导航项
  const isActive = (path: string) => {
    if (path === `/${currentLocale}`) {
      return pathname === `/${currentLocale}`;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className={`${transparent ? 'bg-transparent' : 'bg-white shadow-lg'} ${transparent ? 'relative' : 'fixed'} w-full ${transparent ? '' : 'top-0'} z-50 pt-4`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={`/${currentLocale}`} className="flex items-center -mt-6">
              <img
                src={currentLocale === 'zh' ? '/icon_zh.png' : '/icon_en.png'}
                alt={currentLocale === 'zh' ? '珩钰科技' : 'Hengyu Technology'}
                className="h-[60px] w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href={`/${currentLocale}`}
                className={`${
                  isActive(`/${currentLocale}`) 
                    ? (transparent ? 'text-blue-300 bg-blue-500/20' : 'text-blue-600 bg-blue-50')
                    : (transparent ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600')
                } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                {t('home')}
              </Link>
              <div className="relative group">
                <Link
                  href={`/${currentLocale}/products`}
                  className={`${
                    isActive(`/${currentLocale}/products`)
                      ? (transparent ? 'text-blue-300 bg-blue-500/20' : 'text-blue-600 bg-blue-50')
                      : (transparent ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600')
                  } px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1`}
                >
                  {t('products')}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 absolute left-0 top-full pt-2 transition-all duration-150">
                  <div className="w-64 rounded-md border border-gray-100 bg-white py-2 shadow-xl">
                    {productCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/${currentLocale}/products?category=${encodeURIComponent(category.id)}`}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                href={`/${currentLocale}/about`}
                className={`${
                  isActive(`/${currentLocale}/about`)
                    ? (transparent ? 'text-blue-300 bg-blue-500/20' : 'text-blue-600 bg-blue-50')
                    : (transparent ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600')
                } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                {t('about')}
              </Link>
              <Link
                href={`/${currentLocale}/contact`}
                className={`${
                  isActive(`/${currentLocale}/contact`) 
                    ? (transparent ? 'text-blue-300 bg-blue-500/20' : 'text-blue-600 bg-blue-50')
                    : (transparent ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600')
                } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                {t('contact')}
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button
                onClick={toggleLocale}
                className={`flex items-center ${transparent ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'}`}
              >
                <Globe className="h-5 w-5 mr-1" />
              </button>
              <div className="absolute right-0 mt-2 w-20 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href="/en"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  EN
                </Link>
                <Link
                  href="/zh"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  中文
                </Link>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              aria-label={currentLocale === 'zh' ? '打开移动端导航' : 'Open mobile navigation'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              className={`${transparent ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600'} -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-gray-100 bg-white px-4 pb-5 pt-3 shadow-lg"
        >
          <div className="space-y-1">
            <Link
              href={`/${currentLocale}`}
              onClick={closeMobileMenu}
              className={`block rounded-md px-3 py-3 text-base font-medium ${
                isActive(`/${currentLocale}`) ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              href={`/${currentLocale}/products`}
              onClick={closeMobileMenu}
              className={`block rounded-md px-3 py-3 text-base font-medium ${
                isActive(`/${currentLocale}/products`) ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              {t('products')}
            </Link>
            <div className="space-y-1 border-l border-gray-200 pl-3">
              {productCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${currentLocale}/products?category=${encodeURIComponent(category.id)}`}
                  onClick={closeMobileMenu}
                  className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  {category.title}
                </Link>
              ))}
            </div>
            <Link
              href={`/${currentLocale}/about`}
              onClick={closeMobileMenu}
              className={`block rounded-md px-3 py-3 text-base font-medium ${
                isActive(`/${currentLocale}/about`) ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              {t('about')}
            </Link>
            <Link
              href={`/${currentLocale}/contact`}
              onClick={closeMobileMenu}
              className={`block rounded-md px-3 py-3 text-base font-medium ${
                isActive(`/${currentLocale}/contact`) ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              {t('contact')}
            </Link>
          </div>
          <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
            <Link
              href="/en"
              onClick={closeMobileMenu}
              className={`flex-1 rounded-md px-3 py-2 text-center text-sm font-medium ${
                currentLocale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              EN
            </Link>
            <Link
              href="/zh"
              onClick={closeMobileMenu}
              className={`flex-1 rounded-md px-3 py-2 text-center text-sm font-medium ${
                currentLocale === 'zh' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              中文
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
