import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {locales} from '@/i18n';
import LocaleProvider from '@/components/LocaleProvider';
import DynamicFavicon from '@/components/DynamicFavicon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  
  const isEnglish = locale === 'en';
  
  return {
    title: isEnglish ? 'Hengyu Technology Co., Ltd.' : '珩钰科技有限公司',
    description: isEnglish 
      ? 'Professional Hengyu Technology Co., Ltd., providing high-quality and efficient chemical equipment solutions'
      : '专业的珩钰科技有限公司，提供高品质、高效率的化工设备解决方案',
    icons: {
      icon: isEnglish ? '/icon_en.png' : '/icon_zh.png',
      shortcut: isEnglish ? '/icon_en.png' : '/icon_zh.png',
      apple: isEnglish ? '/icon_en.png' : '/icon_zh.png',
    },
  };
}

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
        <DynamicFavicon />
        {children}
      </LocaleProvider>
    </NextIntlClientProvider>
  );
}
