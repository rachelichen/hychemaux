'use client';

import Applications from '@/components/Applications';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useTranslations } from 'next-intl';

export default function ApplicationsPage() {
  const t = useTranslations('pageHeaders');

  return (
    <main>
      <PageHeader 
        title={t('applications')}
        backgroundImage="/screen/screen_5.png"
        breadcrumbs={[
          { label: t('applications') }
        ]}
      />
      <Applications />
      <Footer />
    </main>
  );
}
