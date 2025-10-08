'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';

export default function DynamicFavicon() {
  const locale = useLocale();
  const isMountedRef = useRef(true);

  useEffect(() => {
    // 检查是否在浏览器环境中
    if (typeof window === 'undefined' || !document) {
      return;
    }

    const isEnglish = locale === 'en';
    const faviconPath = isEnglish ? '/icon_en.png' : '/icon_zh.png';
    
    // 更新页面标题
    if (isMountedRef.current) {
      document.title = isEnglish 
        ? 'Hengyu Technology Co., Ltd.' 
        : '珩钰科技有限公司';
    }
    
    // 更新favicon
    const updateFavicon = (href: string) => {
      if (!isMountedRef.current || !document.head) {
        return;
      }

      try {
        // 移除现有的favicon链接
        const existingLinks = document.querySelectorAll('link[rel*="icon"]');
        existingLinks.forEach(link => {
          if (link && link.parentNode && isMountedRef.current) {
            try {
              link.parentNode.removeChild(link);
            } catch (e) {
              // 忽略移除失败的错误
            }
          }
        });
        
        if (!isMountedRef.current) return;
        
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
      } catch (error) {
        console.warn('Failed to update favicon:', error);
      }
    };

    updateFavicon(faviconPath);

    // 清理函数
    return () => {
      isMountedRef.current = false;
    };
  }, [locale]);

  // 组件卸载时标记为未挂载
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return null; // 这个组件不渲染任何内容
}

