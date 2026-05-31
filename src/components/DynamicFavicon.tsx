'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

const DYNAMIC_ICON_ATTRIBUTE = 'data-hy-dynamic-icon';
const DYNAMIC_ICON_SELECTOR = `link[${DYNAMIC_ICON_ATTRIBUTE}="true"]`;

export default function DynamicFavicon() {
  const locale = useLocale();

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const isEnglish = locale === 'en';
    const faviconPath = isEnglish ? '/icon_en.png' : '/icon_zh.png';
    
    // 更新页面标题
    document.title = isEnglish 
      ? 'Hengyu Technology Co., Ltd.' 
      : '珩钰科技有限公司';
    
    const upsertFavicon = (rel: string, href: string) => {
      if (!document.head) {
        return;
      }

      let link = document.querySelector<HTMLLinkElement>(
        `${DYNAMIC_ICON_SELECTOR}[rel="${rel}"]`
      );

      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        link.type = 'image/png';
        link.setAttribute(DYNAMIC_ICON_ATTRIBUTE, 'true');
        document.head.appendChild(link);
      }

      link.href = href;
    };

    upsertFavicon('icon', faviconPath);
    upsertFavicon('shortcut icon', faviconPath);
    upsertFavicon('apple-touch-icon', faviconPath);
  }, [locale]);

  return null; // 这个组件不渲染任何内容
}
