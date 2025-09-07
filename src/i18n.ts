import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'zh'] as const;
export const defaultLocale = 'zh' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  // 如果没有locale或locale不在支持的语言列表中，使用默认语言
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  console.log(`Loading messages for locale: ${locale}`);
  
  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    console.log(`Successfully loaded messages for ${locale}, nav.home:`, messages.nav?.home);
    return {messages, locale: locale as Locale};
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    // 如果加载失败，使用默认语言
    const messages = (await import(`../messages/${defaultLocale}.json`)).default;
    console.log(`Fallback to ${defaultLocale}, nav.home:`, messages.nav?.home);
    return {messages, locale: defaultLocale};
  }
});
