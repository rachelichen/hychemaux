'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navigation from './Navigation';

interface PageHeaderProps {
  title: string;
  backgroundImage?: string;
  backgroundColor?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

export default function PageHeader({ title, backgroundImage, backgroundColor, breadcrumbs = [] }: PageHeaderProps) {
  // 使用传入的面包屑，如果没有则使用空数组
  const displayBreadcrumbs = breadcrumbs;

  return (
    <div className="relative min-h-[450px] overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <>
            <Image
              src={backgroundImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          </>
        ) : (
          <div className={`absolute inset-0 ${backgroundColor || 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900'}`}></div>
        )}
      </div>

      {/* 导航栏 */}
      <div className="relative z-20">
        <Navigation transparent={false} />
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 flex flex-col justify-center pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* 面包屑导航 */}
            {displayBreadcrumbs.length > 0 && (
              <nav className="mb-6">
                <div className="flex items-center space-x-2 text-white/80">
                  {displayBreadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center">
                      {crumb.href ? (
                        <Link 
                          href={crumb.href} 
                          className="hover:text-white transition-colors duration-200"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-white">{crumb.label}</span>
                      )}
                      {index < displayBreadcrumbs.length - 1 && (
                        <span className="mx-2 text-white/60">&gt;</span>
                      )}
                    </div>
                  ))}
                </div>
              </nav>
            )}

            {/* 页面标题 */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* 装饰性元素 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-green-500/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}
