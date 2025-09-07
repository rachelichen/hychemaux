import ProductPage from '@/components/ProductPage';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useTranslations } from 'next-intl';

export default function ProductsPage() {
  const t = useTranslations('pageHeaders');

  return (
    <main>
      <PageHeader 
        title={t('products')}
        backgroundImage="/screen/screen_2.png"
        breadcrumbs={[
          { label: t('products') }
        ]}
      />
      <ProductPage />
      <Footer />
    </main>
  );
}
