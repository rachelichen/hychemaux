import ProductDetail from '@/components/ProductDetail';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import productsData from '@/data/products.json';
import productsDataEn from '@/data/products_en.json';

interface ProductPageProps {
  params: Promise<{
    locale: string;
    productId: string;
  }>;
}

interface ProductTitleSource {
  product_name?: string;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { productId, locale } = await params;

  const getProductTitle = (productId: string, locale: string) => {
    const source = locale === 'en'
      ? productsDataEn[productId as keyof typeof productsDataEn]
      : productsData[productId as keyof typeof productsData];

    return (source as ProductTitleSource | undefined)?.product_name || productId.toUpperCase();
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
