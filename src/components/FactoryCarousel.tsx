'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface FactoryCarouselProps {
  title: string;
}

export default function FactoryCarousel({ title }: FactoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 工厂图片列表
  const factoryImages = [
    '/factory/factory1.jpg',
    '/factory/factory2.jpg',
    '/factory/factory3.jpg',
    '/factory/factory4.jpg',
    '/factory/factory5.jpg',
    '/factory/factory6.jpg',
    '/factory/factory7.jpg',
    '/factory/factory8.jpg',
    '/factory/factory9.jpg',
    '/factory/factory10.jpg',
    '/factory/factory11.jpg',
  ];

  // 自动播放功能
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === factoryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // 每4秒切换一次

    return () => clearInterval(interval);
  }, [isAutoPlaying, factoryImages.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? factoryImages.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === factoryImages.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
      >
        {title}
      </motion.h3>

      <div className="relative">
        {/* 主图片显示区域 */}
        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={factoryImages[currentIndex]}
                alt={`工厂图片 ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* 导航按钮 */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="上一张图片"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="下一张图片"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* 图片计数器 */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {factoryImages.length}
          </div>
        </div>

        {/* 缩略图导航 */}
        <div className="mt-6 flex justify-center space-x-2 overflow-x-auto pb-2">
          {factoryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                index === currentIndex 
                  ? 'ring-4 ring-blue-500 scale-110' 
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`缩略图 ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
