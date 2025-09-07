import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import HomeProducts from '@/components/HomeProducts';
import News from '@/components/News';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <HomeProducts />
      <News />
      <Footer />
    </main>
  );
}
