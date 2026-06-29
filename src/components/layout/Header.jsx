import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
  { to: '/blog', label: 'Blog' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      menuRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const trapFocus = (e) => {
      if (!menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll('a, button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
      if (e.key === 'Escape') { setMenuOpen(false); burgerRef.current?.focus(); }
    };
    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [menuOpen]);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-accent' : 'text-ink-muted hover:text-ink'}`;

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-bg/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="container-site">
          <nav className="flex items-center justify-between h-20" aria-label="Main navigation">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 group" aria-label="Acmes Media — Home">
              <span className="font-serif text-xl text-ink tracking-tight">Acmes</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block mb-0.5 group-hover:scale-125 transition-transform duration-200" aria-hidden="true" />
              <span className="font-serif text-xl text-ink tracking-tight">Media</span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className={linkClass}>{label}</NavLink>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link to="/contact" className="btn-primary text-sm">
                Let's talk
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              ref={burgerRef}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-border text-ink hover:border-accent hover:text-accent transition-colors duration-200"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col pt-24 pb-10 px-5"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `block text-3xl font-serif py-4 border-b border-border transition-colors duration-200 ${
                        isActive ? 'text-accent' : 'text-ink hover:text-accent'
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Link to="/contact" className="btn-primary w-full justify-center" onClick={() => setMenuOpen(false)}>
                Let's talk <span aria-hidden="true">→</span>
              </Link>
              <p className="text-ink-muted text-sm mt-6 text-center">hello@acmesmedia.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
