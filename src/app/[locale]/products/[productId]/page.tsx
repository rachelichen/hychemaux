import ProductDetail from '@/components/ProductDetail';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

interface ProductPageProps {
  params: Promise<{
    locale: string;
    productId: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { productId, locale } = await params;

  // 获取产品名称的翻译
  const getProductTitle = (productId: string, locale: string) => {
    const productNames: Record<string, Record<string, string>> = {
      'hy-611': { zh: 'HY-611有机硅消泡剂', en: 'HY-611 Silicone Defoamer' },
      'hy-612': { zh: 'HY-612食品用有机硅消泡剂', en: 'HY-612 Food-Use Silicone Defoamer' },
      'hy-603': { zh: 'HY-603有机硅型消泡剂', en: 'HY-603 Silicone Defoamer' },
      'hy-ws30': { zh: 'HY-WS30有机硅乳液消泡剂', en: 'HY-WS30 Silicone Emulsion Defoamer' },
      'hy8308': { zh: 'HY8308农用有机硅展渗剂', en: 'HY8308 Agricultural Silicone Spreading Agent' },
      'hy8328': { zh: 'HY-8328农用有机硅润湿渗透剂', en: 'HY-8328 Agricultural Silicone Wetting Penetrant' },
      'hy-9072': { zh: 'HY-9072脱模剂', en: 'HY-9072 Release Agent' },
      'hy-09n': { zh: 'HY-09N长链烷基苯基硅油', en: 'HY-09N Long-Chain Alkyl Phenyl Silicone Oil' },
      'hy-19n': { zh: 'HY-19N长链烷基苯基硅油', en: 'HY-19N Long-Chain Alkyl Phenyl Silicone Oil' },
      'hy-59n': { zh: 'HY-59N长链烷基苯基硅油', en: 'HY-59N Long-Chain Alkyl Phenyl Silicone Oil' },
      'hy-3689': { zh: 'HY-3689轮胎气囊脱模剂', en: 'HY-3689 Tire Bladder Release Agent' },
      'hy-6014': { zh: 'HY-6014轮胎气囊脱模剂', en: 'HY-6014 Tire Bladder Release Agent' },
      'hy-501': { zh: 'HY-501玻纤浸润剂', en: 'HY-501 Glass Fiber Sizing Agent' },
      'hy-503': { zh: 'HY-503聚酯型上浆剂', en: 'HY-503 Polyester Sizing Agent' },
      'hy-509': { zh: 'HY-509聚氨酯型上浆剂', en: 'HY-509 Polyurethane Sizing Agent' },
      'hy-510': { zh: 'HY-510上浆剂', en: 'HY-510 Sizing Agent' },
      'hy-512': { zh: 'HY-512水性环氧树脂基纤维上浆剂', en: 'HY-512 Waterborne Epoxy Resin Fiber Sizing Agent' },
      'hy-518': { zh: 'HY-518聚丙烯型上浆剂', en: 'HY-518 Polypropylene Sizing Agent' },
      'hy-104e': { zh: 'HY-104E润湿剂', en: 'HY-104E Wetting Agent' },
      'hy-302-wetting': { zh: 'HY-302自消泡耐酸碱润湿剂', en: 'HY-302 Self-Defoaming Acid/Alkali-Resistant Wetting Agent' },
      'hy-9102': { zh: 'HY-9102丙烯酸纺织涂料润湿剂', en: 'HY-9102 Acrylic Textile Coating Wetting Agent' },
      'hy-1617': { zh: 'HY-1617有机硅改性聚氨酯乳液', en: 'HY-1617 Silicone-Modified Polyurethane Emulsion' },
      'hy-1625': { zh: 'HY-1625改性聚硅氧烷树脂乳液', en: 'HY-1625 Modified Polysiloxane Resin Emulsion' },
      'hy-5100': { zh: 'HY-5100水性聚氨酯乳液', en: 'HY-5100 Waterborne Polyurethane Emulsion' },
      'hy-190': { zh: 'HY-190分散剂', en: 'HY-190 Dispersant' },
      'hy-204': { zh: 'HY-204聚乙二醇丙二醇醚改性聚二甲基硅氧烷', en: 'HY-204 PEG/PPG Ether Modified Polydimethylsiloxane' },
      'hy-8328-modified-silicone': { zh: '聚醚改性七甲基三硅氧烷 HY-8328', en: 'Polyether-Modified Heptamethyltrisiloxane HY-8328' },
      'hy-demmas': { zh: 'HY-DEMMAS双端甲基丙烯酸酯聚硅氧烷', en: 'HY-DEMMAS Bis-Methacrylate Terminated Polysiloxane' },
      'bis-hydroxypropyl-polysiloxane': { zh: '双端羟丙基封端聚二甲基硅氧烷', en: 'Bis-Hydroxypropyl Terminated Polydimethylsiloxane' },
      'hy-evipaps': { zh: 'HY-EVIPAPS双端乙烯基聚烷基芳基硅氧烷', en: 'HY-EVIPAPS Bis-Vinyl Polyalkylaryl Siloxane' },
      'hy-sees': { zh: 'HY-SEES环氧基封端聚硅氧烷', en: 'HY-SEES Epoxy-Terminated Polysiloxane' },
      'hy-semmas': { zh: 'HY-SEMMAS单端甲基丙烯酸酯聚硅氧烷', en: 'HY-SEMMAS Mono-Methacrylate Terminated Polysiloxane' },
      'hy-stmos': { zh: 'HY-STMOS单端三甲氧基封端聚二甲基硅氧烷', en: 'HY-STMOS Mono-Trimethoxy-Terminated Polydimethylsiloxane' },
      'mono-dihydroxy-pdms': { zh: '单端双羟基聚二甲基硅氧烷', en: 'Mono-End Dihydroxy Polydimethylsiloxane' },
      'hy-1380': { zh: 'HY-1380抗静电柔顺剂', en: 'HY-1380 Antistatic Softening Agent' },
      'hy-1390': { zh: 'HY-1390抗静电柔软剂', en: 'HY-1390 Antistatic Softener' },
      'hy-5100-textile': { zh: 'HY-5100塑形剂', en: 'HY-5100 Shaping Agent' }
    };
    
    return productNames[productId]?.[locale] || productId.toUpperCase();
  };

  const productTitle = getProductTitle(productId, locale);
  const productsLabel = locale === 'zh' ? '产品中心' : 'Products';

  return (
    <main>
      <PageHeader 
        title={productTitle}
        backgroundImage="/screen/screen_5.png"
        breadcrumbs={[
          { label: productsLabel, href: `/${locale}/products` },
          { label: productTitle }
        ]}
      />
      <ProductDetail productId={productId} />
      <Footer />
    </main>
  );
}
