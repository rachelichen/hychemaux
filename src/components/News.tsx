'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {Beaker, CheckCircle, ChevronDown} from 'lucide-react';
import {useState} from 'react';

export default function News() {
  const t = useTranslations('news');
  const [selectedNews, setSelectedNews] = useState('hy-611-defoamer');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownOptions = t.raw('dropdown.options');

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
            className="text-xl text-gray-600 mb-8"
          >
            {t('subtitle')}
          </motion.p>
          
          {/* 新闻下拉框 */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.4}}
            viewport={{once: true}}
            className="relative max-w-md mx-auto"
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
            >
              <span className="text-gray-700">
                {dropdownOptions.find((option: {value: string, label: string}) => option.value === selectedNews)?.label || t('dropdown.placeholder')}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {dropdownOptions.map((option: {value: string, label: string}, index: number) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedNews(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                      selectedNews === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    } ${index === 0 ? 'rounded-t-lg' : ''} ${
                      index === dropdownOptions.length - 1 ? 'rounded-b-lg' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          key={selectedNews}
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <div className="flex items-center mb-4">
              <Beaker className="w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold">
                {selectedNews === 'hy-611-defoamer' && t('featuredProduct.title')}
                {selectedNews === 'oilfield-foam-solution' && t('oilfieldSolution.title')}
              </h3>
            </div>
            <p className="text-blue-100 text-lg">
              {selectedNews === 'hy-611-defoamer' && t('featuredProduct.description')}
              {selectedNews === 'oilfield-foam-solution' && t('oilfieldSolution.description')}
            </p>
          </div>

          <div className="p-8">
            {selectedNews === 'hy-611-defoamer' && (
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
            )}

            {selectedNews === 'oilfield-foam-solution' && (
              <div className="space-y-8">
                {/* 介绍部分 */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {t('oilfieldSolution.introduction')}
                  </p>
                </div>

                {/* 原因分析 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    {t('oilfieldSolution.causes.title')}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {t('oilfieldSolution.causes.description')}
                  </p>
                  <div className="space-y-3">
                    {t.raw('oilfieldSolution.causes.items').map((item: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 后果分析 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    {t('oilfieldSolution.consequences.title')}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {t('oilfieldSolution.consequences.description')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t.raw('oilfieldSolution.consequences.items').map((item: string, index: number) => (
                      <div key={index} className="flex items-start p-3 bg-orange-50 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 解决方案 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {t('oilfieldSolution.solutions.title')}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {t('oilfieldSolution.solutions.description')}
                  </p>
                  <div className="space-y-3">
                    {t.raw('oilfieldSolution.solutions.items').map((item: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 产品优势 */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {t('oilfieldSolution.benefits.title')}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {t('oilfieldSolution.benefits.description')}
                  </p>
                  <div className="space-y-3">
                    {t.raw('oilfieldSolution.benefits.items').map((item: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-green-500">
                    <p className="text-gray-700 font-medium">
                      {t('oilfieldSolution.benefits.conclusion')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            

            {selectedNews === 'hy-611-defoamer' && (
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">
                  {t('featuredProduct.productAdvantages')}
                </h4>
                <p className="text-blue-800">
                  {t('featuredProduct.advantages')}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
