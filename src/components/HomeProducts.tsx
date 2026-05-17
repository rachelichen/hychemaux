'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {
  ArrowRight,
  Droplets,
  Factory,
  FlaskConical,
  Shirt,
  Sparkles,
  Waves,
  type LucideIcon
} from 'lucide-react';
import Link from 'next/link';
import {useLocale} from 'next-intl';
import Image from 'next/image';

type HomeProduct = {
  name: string;
  description: string;
  productId?: string;
  categoryId?: string;
};

type FeaturedCategory = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  image: string;
  accent: string;
  iconTone: string;
  categoryId: string;
  products: HomeProduct[];
};

const featuredCategoriesZh: FeaturedCategory[] = [
  {
    id: 'sizing-agents',
    title: '浸润剂-纤维界面解决方案',
    subtitle: '面向复合材料纤维界面的水性上浆与浸润体系',
    icon: Waves,
    image: '/new_products/shangjiangji.jpg',
    accent: 'border-sky-200 hover:border-sky-400',
    iconTone: 'bg-sky-50 text-sky-700',
    categoryId: '上浆剂',
    products: [
      {
        name: '环氧型耐高温上浆剂',
        description: '耐高温320℃，环保水性自乳化体系',
        productId: 'hy-512'
      },
      {
        name: '聚丙烯型上浆剂',
        description: '应用于PP聚丙烯复合材料增强的纤维浸润剂',
        productId: 'hy-518'
      }
    ]
  },
  {
    id: 'modified-silicone-oil',
    title: '改性硅油',
    subtitle: '兼顾润滑、脱模、低表面张力与功能改性',
    icon: Droplets,
    image: '/new_products/common.png',
    accent: 'border-emerald-200 hover:border-emerald-400',
    iconTone: 'bg-emerald-50 text-emerald-700',
    categoryId: '改性硅油',
    products: [
      {
        name: '长链烷基改性硅油',
        description: '高性能改性硅油，优异的润滑性、脱模性，可作为润滑脂或消泡剂原料',
        productId: 'hy-19n'
      },
      {
        name: '聚醚改性七甲基三硅氧烷',
        description: '低表面张力，优异的润湿渗透性能',
        productId: 'hy-8328-modified-silicone'
      }
    ]
  },
  {
    id: 'modified-polysiloxane',
    title: '改性聚硅氧烷',
    subtitle: '用于聚氨酯、涂层和树脂体系的端基功能硅氧烷',
    icon: Sparkles,
    image: '/new_products/common.png',
    accent: 'border-indigo-200 hover:border-indigo-400',
    iconTone: 'bg-indigo-50 text-indigo-700',
    categoryId: '改性硅油',
    products: [
      {
        name: '单端双羟基硅油',
        description: '显著提升聚氨酯水接触角，优异的防水、防粘、防污、抗涂鸦性能',
        productId: 'mono-dihydroxy-pdms'
      },
      {
        name: '单端甲基丙烯酸酯硅油',
        description: '耐氧化，防水防污性能优异',
        productId: 'hy-semmas'
      }
    ]
  },
  {
    id: 'textile-auxiliaries',
    title: '纺织助剂',
    subtitle: '覆盖化纤柔顺、抗静电与面料整理应用',
    icon: Shirt,
    image: '/new_products/xiaopaoji.png',
    accent: 'border-rose-200 hover:border-rose-400',
    iconTone: 'bg-rose-50 text-rose-700',
    categoryId: '纺织助剂',
    products: [
      {
        name: '抗静电柔顺剂',
        description: '显著提升化纤的柔软度、滑爽感与抗静电性，兼具性价比与工艺适配性',
        productId: 'hy-1390'
      },
      {
        name: '牛仔面料手感增亮整理剂',
        description: '改善牛仔织物粗糙质感，增强织物优异的光泽度与平滑手感',
        categoryId: '纺织助剂'
      }
    ]
  },
  {
    id: 'wetting-agents',
    title: '润湿剂',
    subtitle: '服务水性体系、纺织涂料与润湿分散工艺',
    icon: FlaskConical,
    image: '/new_products/runshiji.png',
    accent: 'border-cyan-200 hover:border-cyan-400',
    iconTone: 'bg-cyan-50 text-cyan-700',
    categoryId: '润湿剂',
    products: [
      {
        name: '自消泡耐酸碱润湿剂',
        description: '优异润湿渗透、消泡抑泡、润滑抗磨损与稳定性，优化张力防缩孔',
        productId: 'hy-302-wetting'
      },
      {
        name: '丙烯酸纺织涂料润湿剂',
        description: '低表面张力，流平润滑，溶解性好，适配纺织整理与印花润湿分散',
        productId: 'hy-9102'
      }
    ]
  },
  {
    id: 'release-agents',
    title: '脱模剂',
    subtitle: '金属压铸与橡胶成型脱模解决方案',
    icon: Factory,
    image: '/new_products/common.png',
    accent: 'border-amber-200 hover:border-amber-400',
    iconTone: 'bg-amber-50 text-amber-700',
    categoryId: '脱模剂',
    products: [
      {
        name: '金属脱模剂',
        description: '专为铝、锌、镁合金压铸设计，耐高温，脱模性好，抗氧化、抗积碳',
        productId: 'hy-9072'
      },
      {
        name: '橡胶脱模剂',
        description: '不伤胶囊，水性环保，隔离性能好，长久脱模，高性价比',
        productId: 'hy-6014'
      }
    ]
  }
];

const featuredCategoriesEn: FeaturedCategory[] = [
  {
    id: 'sizing-agents',
    title: 'Sizing Agents - Fiber Interface Solutions',
    subtitle: 'Waterborne sizing and wetting systems for composite fiber interfaces',
    icon: Waves,
    image: '/new_products/shangjiangji.jpg',
    accent: 'border-sky-200 hover:border-sky-400',
    iconTone: 'bg-sky-50 text-sky-700',
    categoryId: '上浆剂',
    products: [
      {
        name: 'High-Temperature Epoxy Sizing Agent',
        description: 'Withstands 320°C with an eco-friendly waterborne self-emulsifying system',
        productId: 'hy-512'
      },
      {
        name: 'Polypropylene Sizing Agent',
        description: 'Fiber wetting agent for PP polypropylene composite reinforcement',
        productId: 'hy-518'
      }
    ]
  },
  {
    id: 'modified-silicone-oil',
    title: 'Modified Silicone Oil',
    subtitle: 'Lubrication, release performance, low surface tension and functional modification',
    icon: Droplets,
    image: '/new_products/common.png',
    accent: 'border-emerald-200 hover:border-emerald-400',
    iconTone: 'bg-emerald-50 text-emerald-700',
    categoryId: '改性硅油',
    products: [
      {
        name: 'Long-Chain Alkyl Modified Silicone Oil',
        description: 'High-performance modified silicone oil with excellent lubrication and release properties for grease or defoamer raw materials',
        productId: 'hy-19n'
      },
      {
        name: 'Polyether Modified Heptamethyl Trisiloxane',
        description: 'Low surface tension with excellent wetting and penetration performance',
        productId: 'hy-8328-modified-silicone'
      }
    ]
  },
  {
    id: 'modified-polysiloxane',
    title: 'Modified Polysiloxane',
    subtitle: 'End-functional siloxanes for polyurethane, coating and resin systems',
    icon: Sparkles,
    image: '/new_products/common.png',
    accent: 'border-indigo-200 hover:border-indigo-400',
    iconTone: 'bg-indigo-50 text-indigo-700',
    categoryId: '改性硅油',
    products: [
      {
        name: 'Mono-End Dihydroxy Silicone Oil',
        description: 'Significantly improves polyurethane water contact angle with waterproof, anti-stick, anti-fouling and anti-graffiti performance',
        productId: 'mono-dihydroxy-pdms'
      },
      {
        name: 'Mono-End Methacrylate Silicone Oil',
        description: 'Excellent oxidation resistance, waterproofing and stain resistance',
        productId: 'hy-semmas'
      }
    ]
  },
  {
    id: 'textile-auxiliaries',
    title: 'Textile Auxiliaries',
    subtitle: 'Softening, antistatic and fabric finishing applications',
    icon: Shirt,
    image: '/new_products/xiaopaoji.png',
    accent: 'border-rose-200 hover:border-rose-400',
    iconTone: 'bg-rose-50 text-rose-700',
    categoryId: '纺织助剂',
    products: [
      {
        name: 'Antistatic Softener',
        description: 'Improves softness, smooth hand feel and antistatic performance for chemical fibers with strong process adaptability',
        productId: 'hy-1390'
      },
      {
        name: 'Denim Hand-Feel Brightening Finishing Agent',
        description: 'Improves rough denim texture while enhancing gloss and smooth hand feel',
        categoryId: '纺织助剂'
      }
    ]
  },
  {
    id: 'wetting-agents',
    title: 'Wetting Agents',
    subtitle: 'For waterborne systems, textile coatings and wetting-dispersion processes',
    icon: FlaskConical,
    image: '/new_products/runshiji.png',
    accent: 'border-cyan-200 hover:border-cyan-400',
    iconTone: 'bg-cyan-50 text-cyan-700',
    categoryId: '润湿剂',
    products: [
      {
        name: 'Self-Defoaming Acid-Alkali Resistant Wetting Agent',
        description: 'Excellent wetting, penetration, foam control, lubricity, wear resistance and stability for surface tension optimization',
        productId: 'hy-302-wetting'
      },
      {
        name: 'Acrylic Textile Coating Wetting Agent',
        description: 'Low surface tension, leveling and lubricity with good solubility for textile finishing and printing dispersion',
        productId: 'hy-9102'
      }
    ]
  },
  {
    id: 'release-agents',
    title: 'Release Agents',
    subtitle: 'Release solutions for metal die-casting and rubber molding',
    icon: Factory,
    image: '/new_products/common.png',
    accent: 'border-amber-200 hover:border-amber-400',
    iconTone: 'bg-amber-50 text-amber-700',
    categoryId: '脱模剂',
    products: [
      {
        name: 'Metal Release Agent',
        description: 'Designed for aluminum, zinc and magnesium alloy die-casting with high-temperature release, oxidation resistance and low carbon build-up',
        productId: 'hy-9072'
      },
      {
        name: 'Rubber Release Agent',
        description: 'Waterborne and eco-friendly, gentle on bladders, with durable release, isolation performance and strong value',
        productId: 'hy-6014'
      }
    ]
  }
];

const getProductHref = (locale: string, category: FeaturedCategory, product: HomeProduct) => {
  if (product.productId) {
    return `/${locale}/products/${product.productId}`;
  }

  return `/${locale}/products?category=${encodeURIComponent(product.categoryId || category.categoryId)}`;
};

export default function HomeProducts() {
  const t = useTranslations('products');
  const locale = useLocale();
  const featuredCategories = locale === 'en' ? featuredCategoriesEn : featuredCategoriesZh;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-5"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            viewport={{once: true}}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredCategories.map((category, categoryIndex) => {
            const Icon = category.icon;

            return (
              <motion.article
                key={category.id}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.7, delay: categoryIndex * 0.08}}
                viewport={{once: true}}
                className={`bg-white border ${category.accent} rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all`}
              >
                <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[112px_1fr] min-h-[128px]">
                  <div className="relative bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="112px"
                      className="object-contain p-3"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${category.iconTone}`}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-xl font-bold text-gray-900 leading-snug break-words">
                          {category.title}
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed mt-1">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 divide-y divide-gray-100">
                  {category.products.map((product, productIndex) => (
                    <motion.div
                      key={product.name}
                      initial={{opacity: 0, x: -16}}
                      whileInView={{opacity: 1, x: 0}}
                      transition={{duration: 0.5, delay: productIndex * 0.08}}
                      viewport={{once: true}}
                    >
                      <Link
                        href={getProductHref(locale, category, product)}
                        className="group block py-4 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors break-words">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed mt-2">
                              {product.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 mt-1 flex-shrink-0" aria-hidden="true" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.4}}
          viewport={{once: true}}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-7 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('cta.button')}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
