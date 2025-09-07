'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {Award, Lightbulb, Users, Clock, Building2, Factory, Shield, Leaf} from 'lucide-react';
import FactoryCarousel from './FactoryCarousel';

export default function About() {
  const t = useTranslations('about');

  const companySections = [
    {
      icon: Building2,
      title: t('companyOverview'),
      description: t('companyOverviewDesc')
    },
    {
      icon: Factory,
      title: t('productionLines'),
      description: t('productionLinesDesc')
    },
    {
      icon: Shield,
      title: t('qualityControl'),
      description: t('qualityControlDesc')
    },
    {
      icon: Leaf,
      title: t('safety'),
      description: t('safetyDesc')
    }
  ];

  const features = [
    {
      icon: Award,
      title: t('features.quality'),
      description: t('features.qualityDesc')
    },
    {
      icon: Lightbulb,
      title: t('features.innovation'),
      description: t('features.innovationDesc')
    },
    {
      icon: Users,
      title: t('features.service'),
      description: t('features.serviceDesc')
    },
    {
      icon: Clock,
      title: t('features.experience'),
      description: t('features.experienceDesc')
    }
  ];

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
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t('description')}
          </motion.p>
        </div>

        {/* Factory Gallery */}
        <div className="mb-16">
          <FactoryCarousel title={t('factoryGallery')} />
        </div>

        {/* Company Features */}
        <div className="text-center mb-12">
          <motion.h3
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          >
            {t('companyAdvantages')}
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: index * 0.1}}
              viewport={{once: true}}
              className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
