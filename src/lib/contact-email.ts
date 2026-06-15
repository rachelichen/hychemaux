export const CONTACT_RECIPIENT_EMAIL = 'info@hychemaux.com';

interface ContactMailtoFields {
  locale?: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  message: string;
  productId?: string | null;
  productName?: string;
}

export function buildContactMailtoHref({
  locale,
  name,
  email,
  phone,
  country,
  message,
  productId,
  productName
}: ContactMailtoFields): string {
  const isChinese = locale === 'zh';
  const subject = productName
    ? isChinese
      ? `产品咨询：${productName}`
      : `Product inquiry: ${productName}`
    : isChinese
      ? '网站留言'
      : 'Website contact message';

  const labels = isChinese
    ? {
        name: '姓名',
        email: '邮箱',
        phone: '电话',
        country: '国家',
        productName: '产品',
        productId: '产品ID',
        message: '留言'
      }
    : {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        country: 'Country',
        productName: 'Product',
        productId: 'Product ID',
        message: 'Message'
      };

  const lines = [
    `${labels.name}: ${name}`,
    `${labels.email}: ${email}`,
    phone ? `${labels.phone}: ${phone}` : null,
    country ? `${labels.country}: ${country}` : null,
    productName ? `${labels.productName}: ${productName}` : null,
    productId ? `${labels.productId}: ${productId}` : null,
    '',
    `${labels.message}:`,
    message
  ].filter((line): line is string => line !== null);

  return `mailto:${CONTACT_RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
