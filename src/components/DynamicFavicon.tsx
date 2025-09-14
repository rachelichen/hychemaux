'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

export default function DynamicFavicon() {
  const locale = useLocale();

  useEffect(() => {
    const isEnglish = locale === 'en';
    const faviconPath = isEnglish ? '/icon_en.png' : '/icon_zh.png';
    
    // 更新页面标题
    document.title = isEnglish 
      ? 'Hengyu Technology Co., Ltd.' 
      : '珩钰科技有限公司';
    
    // 更新favicon
    const updateFavicon = (href: string) => {
      // 移除现有的favicon链接
      const existingLinks = document.querySelectorAll('link[rel*="icon"]');
      existingLinks.forEach(link => link.remove());
      
      // 添加新的favicon链接
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = href;
      document.head.appendChild(link);
      
      // 添加shortcut icon
      const shortcutLink = document.createElement('link');
      shortcutLink.rel = 'shortcut icon';
      shortcutLink.type = 'image/png';
      shortcutLink.href = href;
      document.head.appendChild(shortcutLink);
      
      // 添加apple-touch-icon
      const appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      appleLink.type = 'image/png';
      appleLink.href = href;
      document.head.appendChild(appleLink);
    };

    updateFavicon(faviconPath);
  }, [locale]);

  return null; // 这个组件不渲染任何内容
}
