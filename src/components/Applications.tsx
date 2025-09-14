'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Applications() {
  const currentLocale = useLocale();
  const t = useTranslations('applications');

  // 从国际化配置中获取应用分类数据
  const applicationCategories = [
    {
      id: 'defoaming',
      title: t('categories.defoaming.title'),
      description: t('categories.defoaming.description'),
      image: '/application/消泡%20水处理.jpeg',
      applications: t.raw('categories.defoaming.applications').map((app: {name: string, product: string}) => {
        // 根据应用名称分配对应图片
        const getDefoamingImage = (appName: string) => {
          if (appName.includes('水处理')) return '/application/消泡%20水处理.jpeg';
          if (appName.includes('工业清洗')) return '/application/机械喷涂.png';
          if (appName.includes('电路板')) return '/application/线路板.png';
          if (appName.includes('油田')) return '/application/油田消泡.png';
          if (appName.includes('涂料') || appName.includes('油墨')) return '/application/消泡剂%20油漆涂料.jpeg';
          if (appName.includes('造纸')) return '/application/造纸.png';
          if (appName.includes('农药')) return '/application/食品%20消泡.png';
          if (appName.includes('化工')) return '/application/管道.png';
          if (appName.includes('纺织')) return '/application/纺织.png';
          if (appName.includes('洗涤剂')) return '/application/机械喷涂.png';
          return '/application/消泡%20水处理.jpeg'; // 默认图片
        };
        
        // 根据产品名称分配对应的productId
        const getProductId = (productName: string) => {
          if (productName.includes('HY-603')) return 'hy-603';
          if (productName.includes('HY-611')) return 'hy-611';
          if (productName.includes('HY-Z25')) return 'hy-z25';
          if (productName.includes('HY-WS30')) return 'hy-ws30';
          if (productName.includes('HY-K2')) return 'hy-k2';
          return 'hy-603'; // 默认
        };
        
        return {
          name: app.name,
          product: app.product,
          productId: getProductId(app.product),
          image: getDefoamingImage(app.name)
        };
      })
    },
    {
      id: 'agricultural',
      title: t('categories.agricultural.title'),
      description: t('categories.agricultural.description'),
      image: '/application/食品%20消泡.png',
      applications: t.raw('categories.agricultural.applications').map((app: {name: string, product: string}, index: number) => {
        // 根据应用名称分配对应图片
        const getAgriculturalImage = (appName: string) => {
          if (appName.includes('展渗剂')) return '/application/食品%20消泡.png';
          if (appName.includes('润湿剂')) return '/application/食品%20消泡.png';
          return '/application/食品%20消泡.png'; // 默认图片
        };
        
        return {
          name: app.name,
          product: app.product,
          productId: index === 0 ? 'hy8308' : 'hy8328',
          image: getAgriculturalImage(app.name)
        };
      })
    },
    {
      id: 'mold-release',
      title: t('categories.mold-release.title'),
      description: t('categories.mold-release.description'),
      image: '/application/机械喷涂.png',
      applications: t.raw('categories.mold-release.applications').map((app: {name: string, product: string}) => {
        // 根据应用名称分配对应图片
        const getMoldReleaseImage = (appName: string) => {
          if (appName.includes('铝合金')) return '/application/机械喷涂.png';
          if (appName.includes('镁合金')) return '/application/汽车制造.png';
          if (appName.includes('轮胎')) return '/application/汽车制造.png';
          if (appName.includes('橡胶')) return '/application/机械喷涂.png';
          if (appName.includes('气囊')) return '/application/机械喷涂.png';
          return '/application/机械喷涂.png'; // 默认图片
        };
        
        // 根据产品名称分配对应的productId
        const getMoldReleaseProductId = (productName: string) => {
          if (productName.includes('HY-19N')) return 'hy-19n';
          if (productName.includes('HY-59N')) return 'hy-59n';
          if (productName.includes('HY-3689')) return 'hy-3689';
          return 'hy-19n'; // 默认
        };
        
        return {
          name: app.name,
          product: app.product,
          productId: getMoldReleaseProductId(app.product),
          image: getMoldReleaseImage(app.name)
        };
      })
    },
    {
      id: 'fiber',
      title: t('categories.fiber.title'),
      description: t('categories.fiber.description'),
      image: '/application/玻璃纤维.png',
      applications: t.raw('categories.fiber.applications').map((app: {name: string, product: string}) => {
        // 根据应用名称分配对应图片
        const getFiberImage = (appName: string) => {
          if (appName.includes('玻璃纤维')) return '/application/玻璃纤维.png';
          if (appName.includes('碳纤维')) return '/application/风叶叶片.png';
          if (appName.includes('航空航天')) return '/application/飞机.png';
          if (appName.includes('风电叶片')) return '/application/风叶叶片.png';
          if (appName.includes('新能源汽车')) return '/application/汽车制造.png';
          if (appName.includes('管道')) return '/application/管道.png';
          return '/application/玻璃纤维.png'; // 默认图片
        };
        
        // 根据产品名称分配对应的productId
        const getFiberProductId = (productName: string) => {
          if (productName.includes('HY-501')) return 'hy-501';
          if (productName.includes('HY-503')) return 'hy-503';
          return 'hy-501'; // 默认
        };
        
        return {
          name: app.name,
          product: app.product,
          productId: getFiberProductId(app.product),
          image: getFiberImage(app.name)
        };
      })
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            应用行业
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600"
          >
            为不同行业提供专业的化工产品解决方案
          </motion.p>
        </div>

        <div className="space-y-16">
          {applicationCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        console.log('Category image load error:', category.image);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-blue-100">{category.description}</p>
                  </div>
                </div>
              </div>

              {/* Applications Grid */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.applications.map((application: {name: string, product: string, productId: string, image: string}, appIndex: number) => (
                    <motion.div
                      key={application.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: appIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <Link href={`/${currentLocale}/products/${application.productId}`}>
                        <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="w-full h-32 bg-white rounded-lg mb-4 overflow-hidden">
                            <Image
                              src={application.image}
                              alt={application.name}
                              width={200}
                              height={128}
                              className="w-full h-full object-contain p-2"
                              onError={(e) => {
                                console.log('Image load error:', application.image);
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {application.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {application.product}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
