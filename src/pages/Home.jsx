import Seo from '@/components/ui/Seo';
import SchemaScript from '@/components/ui/SchemaScript';
import { webPageSchema } from '@/lib/schema';
import Hero from '../components/home/Hero';
import Marquee from '../components/home/Marquee';
import WhoWeAre from '../components/home/WhoWeAre';
import ServicesPreview from '../components/home/ServicesPreview';
import FeaturedWork from '../components/home/FeaturedWork';
import Testimonials from '../components/home/Testimonials';
import HomeCTA from '../components/home/HomeCTA';

export default function Home() {
  return (
    <>
      <Seo
        title="Acmes Media — Branding, Web Design & AI Automation Agency in Lagos"
        description="We build brands and the digital work that grows them. Acmes Media is a Lagos-based creative and digital agency serving startups, businesses, and institutions since 2016."
        path="/"
      />
      <SchemaScript data={webPageSchema({
        name: 'Acmes Media — Creative & Digital Agency',
        description: 'We build brands and the digital work that grows them. Creative and digital agency serving startups, businesses, and institutions since 2016.',
        url: '/',
      })} />

      <Hero />
      <Marquee />
      <WhoWeAre />
      <ServicesPreview />
      <FeaturedWork />
      <Testimonials />
      <HomeCTA />
    </>
  );
}
