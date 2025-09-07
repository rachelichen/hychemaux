import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '珩钰科技有限公司',
  description: '专业的珩钰科技有限公司，提供高品质、高效率的化工设备解决方案',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
