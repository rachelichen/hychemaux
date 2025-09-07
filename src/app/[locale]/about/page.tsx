import About from '@/components/About';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('pageHeaders');

  return (
    <main>
      <PageHeader 
        title={t('about')}
        backgroundImage="/screen/screen_1.png"
        breadcrumbs={[
          { label: t('about') }
        ]}
      />
      <About />
      <Footer />
    </main>
  );
}
