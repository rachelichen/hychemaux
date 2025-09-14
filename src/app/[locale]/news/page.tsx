'use client';

import News from '@/components/News';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useTranslations } from 'next-intl';

export default function NewsPage() {
  const t = useTranslations('pageHeaders');

  return (
    <main>
      <PageHeader 
        title={t('news')}
        backgroundImage="/screen/screen_3.png"
        breadcrumbs={[
          { label: t('news') }
        ]}
      />
      <News />
      <Footer />
    </main>
  );
}
