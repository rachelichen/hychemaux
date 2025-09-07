import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {locales} from '@/i18n';
import LocaleProvider from '@/components/LocaleProvider';

export const metadata: Metadata = {
  title: '珩钰科技有限公司',
  description: '专业的珩钰科技有限公司，提供高品质、高效率的化工设备解决方案',
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages({locale});

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <LocaleProvider>
        {children}
      </LocaleProvider>
    </NextIntlClientProvider>
  );
}
