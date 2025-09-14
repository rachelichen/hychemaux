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
      'hy-611': { zh: 'HY-611有机硅型消泡剂', en: 'HY-611 Silicone Defoamer' },
      'hy-603': { zh: 'HY-603有机硅型消泡剂', en: 'HY-603 Silicone Defoamer' },
      'hy8308': { zh: 'HY8308农用有机硅展渗剂', en: 'HY8308 Agricultural Silicone Spreading Agent' },
      'hy8328': { zh: 'HY8328农用有机硅润湿剂', en: 'HY8328 Agricultural Silicone Wetting Agent' },
      'hy-9072': { zh: 'HY-9072脱模剂', en: 'HY-9072 Release Agent' },
      'hy-09n': { zh: 'HY-09N脱模剂', en: 'HY-09N Release Agent' },
      'hy-19n': { zh: 'HY-19N脱模剂', en: 'HY-19N Release Agent' },
      'hy-59n': { zh: 'HY-59N脱模剂', en: 'HY-59N Release Agent' },
      'hy-501': { zh: 'HY-501玻纤浸润剂', en: 'HY-501 Glass Fiber Sizing Agent' },
      'hy-503': { zh: 'HY-503碳纤浸润剂', en: 'HY-503 Carbon Fiber Sizing Agent' }
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
