import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SchemaScript from '@/components/ui/SchemaScript';
import { professionalServiceSchema, webSiteSchema } from '@/lib/schema';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Site-wide entities — pages reference these by @id */}
      <SchemaScript data={[professionalServiceSchema(), webSiteSchema()]} />
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        {/* Route chunks are lazy-loaded; the fallback only shows on client-side
            navigation to a page whose chunk hasn't downloaded yet. */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
