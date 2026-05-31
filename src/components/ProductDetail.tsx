'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Package, Clock, Thermometer } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import productsDataZh from '@/data/products.json';
import productsDataEn from '@/data/products_en.json';
import {buildContactMailtoHref, CONTACT_RECIPIENT_EMAIL} from '@/lib/contact-email';

interface ProductDetailProps {
  productId: string;
}

interface ProductData {
  product_name: string;
  category: string;
  product_introduction: string;
  features?: string[];
  how_to_use?: string[];
  indicators?: Record<string, string>;
  typical_properties?: Record<string, string>;
  typical_applications?: string[];
  applicable_pesticides?: string[];
  packaging?: string;
  storage?: string;
  shelf_life?: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const tDetail = useTranslations('productDetail');
  const params = useParams();
  const locale = params.locale as string;
  const currentLocale = useLocale();
  // 根据语言版本选择对应的产品数据
  const productsData = currentLocale === 'en' ? productsDataEn : productsDataZh;
  const product = productsData[productId as keyof typeof productsData] as ProductData;

  // 表单状态
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // 提交状态
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          productId: productId
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Message submitted successfully:', result);
        console.log(`Opening product inquiry mail draft for ${CONTACT_RECIPIENT_EMAIL}`);
        window.location.href = buildContactMailtoHref({
          locale: currentLocale,
          name: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          productId,
          productName: product?.product_name
        });
        setIsSubmitted(true);
        // 重置表单
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        console.error('Failed to submit message:', result.error);
        alert('提交失败，请稍后重试。');
      }
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('提交失败，请检查网络连接。');
    }
  };

  // 属性名称翻译映射
  const propertyTranslations: Record<string, string> = currentLocale === 'en' ? {
    appearance: 'Appearance',
    solid_content: 'Solid Content',
    specific_gravity: 'Specific Gravity',
    viscosity: 'Viscosity',
    cloud_point: 'Cloud Point',
    water_solubility: 'Water Solubility',
    surface_tension: 'Surface Tension',
    active_ingredient: 'Active Ingredient',
    ph_value: 'pH Value',
    odor: 'Odor',
    solvent: 'Solvent',
    main_component: 'Main Component',
    curing_temperature_time: 'Curing Temperature/Time',
    stability: 'Stability',
    static_surface_tension_001: 'Static Surface Tension',
    static_surface_tension_005: 'Static Surface Tension',
    static_surface_tension_01: 'Static Surface Tension',
    dynamic_surface_tension_1: 'Dynamic Surface Tension',
    dynamic_surface_tension_3: 'Dynamic Surface Tension',
    dynamic_surface_tension_6: 'Dynamic Surface Tension',
    applicable_system: 'Applicable System',
    foam_under_strong_stirring: 'Foam Under Strong Stirring',
    foam_under_normal_stirring: 'Foam Under Normal Stirring',
    high_temperature_hydrolysis_resistance: 'High-Temperature Hydrolysis Resistance',
    temperature_resistance: 'Temperature Resistance',
    applicable_metals: 'Applicable Metals',
    ionic_type: 'Ionic Type',
    average_molecular_weight: 'Average Molecular Weight',
    hydroxyl_equivalent_weight: 'Hydroxyl Equivalent Weight',
    voc: 'VOC',
    process: 'Applicable Process',
    crosslinker: 'Crosslinker',
    drying_condition: 'Drying Condition',
    product_type: 'Type',
    amine_value: 'Amine Value',
    acid_value: 'Acid Value',
    solubility: 'Solubility',
    boiling_point: 'Boiling Point',
    double_bond_equivalent_weight: 'Double Bond Equivalent Weight',
    double_bond_content: 'Double Bond Content',
    vinyl_content: 'Vinyl Content',
    hydroxyl_value: 'Hydroxyl Value',
    grade_1200: 'MW 1200 Grade',
    grade_2000: 'MW 2000 Grade',
    grade_2300: 'MW 2300 Grade',
    grade_2500: 'MW 2500 Grade',
    grade_3000: 'MW 3000 Grade',
    grade_4000: 'MW 4000 Grade',
    grade_5000: 'MW 5000 Grade',
    melting_point: 'Melting Point',
    shaping_hardness: 'Shaping Hardness',
    setting_durability: 'Setting Durability'
  } : {
    appearance: '外观',
    solid_content: '固含量',
    specific_gravity: '比重',
    viscosity: '粘度',
    cloud_point: '浊点',
    water_solubility: '水溶性',
    surface_tension: '表面张力',
    active_ingredient: '活性成分',
    ph_value: 'pH值',
    odor: '气味',
    solvent: '溶剂',
    main_component: '主要成分',
    curing_temperature_time: '固化温度/时间',
    stability: '稳定性',
    static_surface_tension_001: '静态表面张力',
    static_surface_tension_005: '静态表面张力',
    static_surface_tension_01: '静态表面张力',
    dynamic_surface_tension_1: '动态表面张力',
    dynamic_surface_tension_3: '动态表面张力',
    dynamic_surface_tension_6: '动态表面张力',
    applicable_system: '适用体系',
    foam_under_strong_stirring: '剧烈搅拌下水溶液泡沫状态',
    foam_under_normal_stirring: '普通搅拌下水溶液泡沫状态',
    high_temperature_hydrolysis_resistance: '高温抗水解能力',
    temperature_resistance: '耐温性',
    applicable_metals: '适用金属',
    ionic_type: '离子类型',
    average_molecular_weight: '平均分子量',
    hydroxyl_equivalent_weight: '羟基当量',
    voc: 'VOC',
    process: '适用工艺',
    crosslinker: '交联剂',
    drying_condition: '干燥条件',
    product_type: '类型',
    amine_value: '胺值',
    acid_value: '酸值',
    solubility: '溶解性',
    boiling_point: '沸点',
    double_bond_equivalent_weight: '双键克当量',
    double_bond_content: '双键含量',
    vinyl_content: '乙烯基含量',
    hydroxyl_value: '羟值',
    grade_1200: '1200分子量规格',
    grade_2000: '2000分子量规格',
    grade_2300: '2300分子量规格',
    grade_2500: '2500分子量规格',
    grade_3000: '3000分子量规格',
    grade_4000: '4000分子量规格',
    grade_5000: '5000分子量规格',
    melting_point: '熔点',
    shaping_hardness: '塑形硬度',
    setting_durability: '定型持久性'
  };

  // 获取属性名称的翻译
  const getPropertyName = (key: string): string => {
    return propertyTranslations[key] || key;
  };

  // 产品ID到图片文件名的映射
  const productImageMap: Record<string, string> = {
    'hy-611': '有机硅型消泡剂HY611.png',
    'hy-612': '/new_products/xiaopaoji.png',
    'hy-603': '有机硅型消泡剂HY603.png',
    'hy-ws30': '/new_products/xiaopaoji.png',
    'hy8308': '农用有机硅展渗剂.png',
    'hy-9072': '/new_products/common.png',
    'hy-09n': '/new_products/common.png',
    'hy-19n': '/new_products/common.png',
    'hy-59n': '/new_products/common.png',
    'hy-302': '通用图片.png',
    'hy-329': '通用图片.png',
    'hy-3845': '通用图片.png',
    'hy-3689': '/new_products/shangjiangji.jpg',
    'hy-6014': '/new_products/shangjiangji.jpg',
    'hy-3000': '通用图片.png',
    'hy-501': 'HY-501玻纤浸润剂.png',
    'hy-503': '/new_products/shangjiangji.jpg',
    'hy-509': '/new_products/shangjiangji.jpg',
    'hy-510': '/new_products/shangjiangji.jpg',
    'hy-512': '/new_products/shangjiangji.jpg',
    'hy-518': '/new_products/shangjiangji.jpg',
    'hy-104e': '/new_products/runshiji.png',
    'hy-302-wetting': '/new_products/runshiji.png',
    'hy8328': '/new_products/runshiji.png',
    'hy-9102': '/new_products/runshiji.png',
    'hy-1617': '/new_products/shuzhi.png',
    'hy-1625': '/new_products/shuzhi.png',
    'hy-5100': '/new_products/shuzhi.png',
    'hy-190': '/new_products/common.png',
    'hy-204': '/new_products/common.png',
    'hy-8328-modified-silicone': '/new_products/common.png',
    'hy-demmas': '/new_products/common.png',
    'bis-hydroxypropyl-polysiloxane': '/new_products/common.png',
    'hy-evipaps': '/new_products/common.png',
    'hy-sees': '/new_products/common.png',
    'hy-semmas': '/new_products/common.png',
    'hy-stmos': '/new_products/common.png',
    'mono-dihydroxy-pdms': '/new_products/common.png',
    'hy-1380': '/new_products/xiaopaoji.png',
    'hy-1390': '/new_products/xiaopaoji.png',
    'hy-5100-textile': '/new_products/xiaopaoji.png',
    'hy-1303': '/new_products/xiaopaoji.png',
    'hy-1322': '/new_products/xiaopaoji.png',
    'hy-1352': '/new_products/xiaopaoji.png',
    'hy-1355': '/new_products/xiaopaoji.png',
    'hy-1375': '/new_products/xiaopaoji.png',
    'hy-1378': '/new_products/xiaopaoji.png'
  };

  // 获取产品图片路径
  const getProductImage = (productId: string): string => {
    const imageName = productImageMap[productId.toLowerCase()];
    if (!imageName) return '/products/通用图片.png';
    return imageName.startsWith('/') ? imageName : `/products/${imageName}`;
  };
  
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{tDetail('productNotFound')}</h1>
          <Link href={`/${locale}/products`} className="text-blue-600 hover:text-blue-800">
            {tDetail('backToProducts')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Section - Product Visual */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-b from-blue-50 to-white rounded-lg border-2 border-blue-100 p-8 shadow-lg">
              {/* Logo Section */}
              <div className="flex items-center mb-8">
                <div className="mr-4">
                  <Image
                    src={currentLocale === 'zh' ? '/icon_zh.png' : '/icon_en.png'}
                    alt={currentLocale === 'zh' ? '珩钰科技' : 'Hengyu Technology'}
                    width={108}
                    height={108}
                  />
                </div>
              </div>

              {/* Product Name */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.product_name}
                </h2>
              </div>

              {/* Product Image */}
              <div className="relative">
                <div className="w-full h-80 overflow-hidden">
                  <Image
                    src={getProductImage(productId)}
                    alt={product.product_name}
                    width={400}
                    height={320}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      // 如果图片加载失败，显示通用图片
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <img src="/products/通用图片.png" alt="通用图片" class="w-full h-full object-contain p-4" />
                          </div>
                        `;
                      }
                    }}
                  />
                </div>            
              </div>

            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-blue-600 mb-6">
                {product.product_name}
              </h3>
              
              <div className="prose prose-lg text-gray-700 mb-8">
                <p className="leading-relaxed">
                  {product.product_introduction}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        {product.features && product.features.length > 0 && (
          <div className="mt-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{tDetail('productFeatures')}</h2>
                <div className="w-full h-px bg-gray-300"></div>
              </div>
              
              <div className="space-y-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-900 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Typical Properties Section */}
        {(product.indicators || product.typical_properties) && (
          <div className="mt-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{tDetail('typicalProperties')}</h2>
                <div className="w-full h-px bg-gray-300"></div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">{tDetail('indicator')}</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">{tDetail('result')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.indicators && Object.entries(product.indicators).map(([key, value], index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{getPropertyName(key)}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{String(value)}</td>
                      </tr>
                    ))}
                    {product.typical_properties && Object.entries(product.typical_properties).map(([key, value], index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{getPropertyName(key)}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                {tDetail('note')}
              </div>
            </div>
          </div>
        )}

        {/* How to Use Section */}
        {product.how_to_use && product.how_to_use.length > 0 && (
          <div className="mt-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{tDetail('howToUse')}</h2>
              </div>
              
              <div className="prose prose-lg text-gray-900 space-y-6">
                {product.how_to_use.map((step, index) => (
                  <p key={index} className="leading-relaxed">
                    {step}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Typical Applications Section */}
        {product.typical_applications && product.typical_applications.length > 0 && (
          <div className="mt-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{tDetail('typicalApplications')}</h2>
                <div className="w-full h-px bg-gray-300"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.typical_applications.map((application: string, index: number) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-900">{application}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Applicable Pesticides Section */}
        {product.applicable_pesticides && product.applicable_pesticides.length > 0 && (
          <div className="mt-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{tDetail('applicablePesticides')}</h2>
                <div className="w-full h-px bg-gray-300"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.applicable_pesticides.map((pesticide: string, index: number) => (
                  <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      <span className="text-gray-900">{pesticide}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Packaging and Storage Section */}
        {(product.packaging || product.storage || product.shelf_life) && (
          <div className="mt-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{tDetail('packagingAndStorage')}</h2>
                <div className="w-full h-px bg-gray-300"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {product.packaging && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Package className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">{tDetail('packagingSpecs')}</h3>
                    </div>
                    <p className="text-gray-700">{product.packaging}</p>
                  </div>
                )}

                {product.storage && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Thermometer className="w-6 h-6 text-green-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">{tDetail('storageConditions')}</h3>
                    </div>
                    <p className="text-gray-700">{product.storage}</p>
                  </div>
                )}

                {product.shelf_life && (
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Clock className="w-6 h-6 text-orange-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">{tDetail('shelfLife')}</h3>
                    </div>
                    <p className="text-gray-700">{product.shelf_life}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contact Form Section */}
        <div className="mt-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">{tDetail('leaveMessage')}</h2>
              <div className="w-full h-px bg-gray-300"></div>
            </div>
            
            {isSubmitted ? (
              /* Thank You Message */
              <div className="text-center py-12">
                <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-green-800 mb-2">
                    {tDetail('thankYouMessage')}
                  </h3>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{tDetail('name')}*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={tDetail('namePlaceholder')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{tDetail('email')}*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={`* ${tDetail('email')}`}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{tDetail('phoneNumber')}*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={`* ${tDetail('phoneNumber')}`}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{tDetail('message')}*</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={`* ${tDetail('message')}`}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    {tDetail('submit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
