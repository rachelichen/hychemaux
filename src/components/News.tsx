'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {Beaker, CheckCircle} from 'lucide-react';

export default function News() {
  const t = useTranslations('news');

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            viewport={{once: true}}
            className="text-xl text-gray-600"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          viewport={{once: true}}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <div className="flex items-center mb-4">
              <Beaker className="w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold">{t('featuredProduct.title')}</h3>
            </div>
            <p className="text-blue-100 text-lg">
              {t('featuredProduct.description')}
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{t('featuredProduct.productFeatures')}</h4>
                <div className="space-y-3">
                  {t.raw('featuredProduct.features').map((feature: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{t('featuredProduct.mainApplications')}</h4>
                <div className="space-y-2">
                  {t.raw('featuredProduct.applications').map((application: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm">{application}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">{t('featuredProduct.productAdvantages')}</h4>
              <p className="text-blue-800">
                {t('featuredProduct.advantages')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
