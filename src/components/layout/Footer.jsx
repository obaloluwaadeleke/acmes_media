import { Link } from 'react-router-dom';
import LogoComponent from '../ui/LogoComponent';

const navLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const serviceLinks = [
  { to: '/services', label: 'Web Design & Development' },
  { to: '/services', label: 'Branding & Identity' },
  { to: '/services', label: 'Motion Graphics' },
  { to: '/services', label: 'Corporate Designs' },
  { to: '/services', label: 'Printing Solutions' },
];

export default function Footer() {
  const year = new Date().getFullYear();
 
  return (
    <footer className="border-t border-border bg-bg-surface">
      <div className="container-site py-16 lg:py-20">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-1">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 group" aria-label="Acmes Media — Home"> 
              <div className="h-10"> 
                <LogoComponent />
              </div>
            </Link>
            
            <p className="text-ink-muted text-sm leading-relaxed mb-6 max-w-xs">
              We build brands and the digital work that grows them. Creative and digital agency since 2016.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/acmesmedia"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-accent hover:text-accent transition-colors duration-200 text-xs font-medium"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >in</a>
              <a
                href="https://instagram.com/acmesmedia"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-accent hover:text-accent transition-colors duration-200 text-xs font-medium"
                aria-label="Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >Ig</a>
              <a
                href="https://behance.net/acmesmedia"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-accent hover:text-accent transition-colors duration-200 text-xs font-medium"
                aria-label="Behance"
                rel="noopener noreferrer"
                target="_blank"
              >Be</a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-ink text-sm font-medium tracking-widest uppercase mb-5">Company</h2>
            <ul className="space-y-3" role="list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-ink-muted text-sm hover:text-accent transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-ink text-sm font-medium tracking-widest uppercase mb-5">Services</h2>
            <ul className="space-y-3" role="list">
              {serviceLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-ink-muted text-sm hover:text-accent transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-ink text-sm font-medium tracking-widest uppercase mb-5">Get In Touch</h2>
            <ul className="space-y-3" role="list">
              <li>
                <a href="mailto:hello@acmesmedia.com" className="text-ink-muted text-sm hover:text-accent transition-colors duration-200 block">
                  hello@acmesmedia.com
                </a>
              </li>
              <li>
                <a href="tel:+2348065134373" className="text-ink-muted text-sm hover:text-accent transition-colors duration-200 block">
                  +234 806 513 4373
                </a>
              </li>
              <li>
                <span className="text-ink-muted text-sm">
                  <span aria-hidden="true">◎ </span>Nigeria · UK · Canada
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/contact" className="btn-text text-sm">
                Start a project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-ink-muted text-sm">
            © {year} Acmes Media. All rights reserved.
          </p>
          <p className="text-ink-muted text-sm">
            Creative & digital work built to perform.
          </p>
        </div>

      </div>
    </footer>
  );
}
