'use client';

import {useLocale, useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {Mail, MapPin, MessageCircle, Send, User} from 'lucide-react';
import {useState} from 'react';

export default function Contact() {
  const t = useTranslations('contact');
  const currentLocale = useLocale();
  
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });
  
  // 提交状态
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          message: formData.message,
          productId: null, // 联系我们页面没有关联产品
          sendEmail: true
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Contact message submitted successfully:', result);
        setIsSubmitted(true);
        // 重置表单
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          message: ''
        });
      } else {
        console.error('Failed to submit contact message:', result.error);
        alert('提交失败，请稍后重试。');
      }
    } catch (error) {
      console.error('Error submitting contact message:', error);
      alert('提交失败，请检查网络连接。');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: User,
      title: t('salesManager'),
      content: t('salesManagerPhone'),
      color: 'text-blue-600',
      href: `tel:${t('salesManagerPhone')}`
    },
    ...(currentLocale === 'en' ? [{
      icon: MessageCircle,
      title: t('whatsapp'),
      content: t('whatsappPhone'),
      color: 'text-green-600',
      href: 'https://wa.me/85277921151'
    }] : []),
    {
      icon: Mail,
      title: t('email'),
      content: t('emailContent'),
      color: 'text-red-600'
    },
    {
      icon: MapPin,
      title: t('address'),
      content: t('addressContent'),
      color: 'text-purple-600'
    }
  ];
  const showEnglishExtraFields = currentLocale === 'en';

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            viewport={{once: true}}
            className="text-xl text-gray-600"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{opacity: 0, x: -20}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
          >
            <div className="space-y-8">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ${info.color}`}>
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {info.title}
                    </h3>
                    {info.href ? (
                      <a 
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-600">
                        {info.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, x: 20}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              {t('form.title')}
            </h3>
            
            {isSubmitted ? (
              /* Thank You Message */
              <div className="text-center py-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-green-800 mb-2">
                    {t('form.thankYouMessage')}
                  </h4>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('form.name')}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('form.email')}
                      required
                    />
                  </div>
                  {showEnglishExtraFields ? (
                    <>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('form.phone')}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('form.phone')}
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('form.country')}
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('form.country')}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('form.message')}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? t('form.submitting') : t('form.submit')}
                  {!isLoading && <Send className="ml-2 h-5 w-5" />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
