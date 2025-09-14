'use client';

import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('pageHeaders');

  return (
    <main>
      <PageHeader 
        title={t('contact')}
        backgroundImage="/screen/screen_4.png"
        breadcrumbs={[
          { label: t('contact') }
        ]}
      />
      <Contact />
      <Footer />
    </main>
  );
}
