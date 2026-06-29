import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Acmes Media</title>
      </Helmet>

      <section className="min-h-[80vh] flex flex-col items-center justify-center bg-bg relative overflow-hidden px-5">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 text-center max-w-lg">
          <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">404</p>
          <h1 className="font-serif text-display-lg text-ink mb-4">
            Page not found.
          </h1>
          <p className="body-md mb-10">
            The page you're looking for doesn't exist, or may have been moved. Let's get you back somewhere useful.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary">
              <Home size={16} aria-hidden="true" />
              Go home
            </Link>
            <Link to="/contact" className="btn-ghost">
              Contact us <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
