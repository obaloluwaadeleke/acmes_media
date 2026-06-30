import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import RevealWrapper from '@/components/ui/RevealWrapper';
import HeroReveal from '@/components/ui/HeroReveal';
import AmbientGlow from '@/components/ui/AmbientGlow';

const serviceOptions = [
  'Website Design & Development',
  'Branding & Identity Design',
  'Motion Graphics',
  'Corporate Designs',
  'Product Design',
  'Printing Solutions',
  'Other / Not sure yet',
];

const budgetOptions = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000 – $15,000',
  '$15,000+',
  'Not sure yet',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', service: '', budget: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Please enter your name.';
    if (!formData.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Please enter a valid email address.';
    if (!formData.message.trim()) e.message = 'Please tell us about your project.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => { const n = { ...e }; delete n[name]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xojrgrlr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) { setStatus('success'); setFormData({ name: '', company: '', email: '', phone: '', service: '', budget: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <>
      <Helmet>
        <title>Contact — Acmes Media</title>
        <meta name="description" content="Start a project with Acmes Media. Tell us what you're building — we'll figure out the best way to help." />
        <link rel="canonical" href="https://acmesmedia.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://acmesmedia.com/contact" />
        <meta property="og:title" content="Contact — Acmes Media" />
        <meta property="og:description" content="Start a project with Acmes Media. Tell us what you're building — we'll figure out the best way to help." />
        <meta property="og:image" content="https://acmesmedia.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact — Acmes Media" />
        <meta name="twitter:description" content="Start a project with Acmes Media. Tell us what you're building." />
        <meta name="twitter:image" content="https://acmesmedia.com/og-image.jpg" />
      </Helmet>

      {/* Page hero */}
      <section className="section-pad bg-bg border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
        <AmbientGlow />
        <div className="container-site relative z-10">
          <HeroReveal delay={0}>
            <span className="label-tag mb-5 block">Get in touch</span>
          </HeroReveal>
          <h1 className="heading-display max-w-4xl mb-6">
            <HeroReveal as="span" text="Let's build something " delay={0} />
            <HeroReveal as="span" text="together." delay={0.36} wordClassName="text-accent" />
          </h1>
          <HeroReveal delay={0.42}>
            <p className="body-lg max-w-2xl">
              Starting something new, growing what you've got, or just figuring out your options online — either way, we'd like to hear from you.
            </p>
          </HeroReveal>
        </div>
      </section>

      {/* Contact layout */}
      <section className="section-pad bg-bg" aria-label="Contact form and information">
        <div className="container-site">
          <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">

            {/* Left: info */}
            <div className="lg:col-span-2">
              <RevealWrapper>
                <h2 className="heading-md mb-6">Contact information</h2>
              </RevealWrapper>

              <RevealWrapper delay={0.1}>
                <div className="space-y-5 mb-10">
                  <a href="mailto:hello@acmesmedia.com" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink-muted group-hover:border-accent group-hover:text-accent transition-colors duration-200 shrink-0">
                      <Mail size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-ink-muted text-xs mb-0.5">Email</p>
                      <p className="text-ink text-sm group-hover:text-accent transition-colors duration-200">hello@acmesmedia.com</p>
                    </div>
                  </a>
                  <a href="tel:+2348065134373" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink-muted group-hover:border-accent group-hover:text-accent transition-colors duration-200 shrink-0">
                      <Phone size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-ink-muted text-xs mb-0.5">Phone</p>
                      <p className="text-ink text-sm group-hover:text-accent transition-colors duration-200">+234 806 513 4373</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink-muted shrink-0">
                      <MapPin size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-ink-muted text-xs mb-0.5">Location</p>
                      <p className="text-ink text-sm">Nigeria · United Kingdom · Canada</p>
                    </div>
                  </div>
                </div>
              </RevealWrapper>

              <RevealWrapper delay={0.15}>
                <div className="card-surface p-6">
                  <h3 className="text-ink font-serif text-lg mb-3">What to expect</h3>
                  <ul className="space-y-3">
                    {[
                      'We respond within 24 hours on business days.',
                      'Initial consultation is free with no commitment.',
                      'We\'ll send a clear proposal with scope and pricing.',
                      'Projects typically start within 1–2 weeks of agreement.',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-ink-muted text-sm">
                        <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealWrapper>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <RevealWrapper delay={0.1}>
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Project enquiry form"
                  className="card-surface p-6 md:p-8"
                >
                  <p className="text-ink-muted text-xs mb-6">
                    <span aria-hidden="true">* </span>Required fields
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <Field
                      label="Full Name" id="name" name="name" type="text"
                      value={formData.name} onChange={handleChange}
                      error={errors.name} required placeholder="Your full name"
                    />
                    <Field
                      label="Company / Brand" id="company" name="company" type="text"
                      value={formData.company} onChange={handleChange}
                      placeholder="Optional"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <Field
                      label="Email Address" id="email" name="email" type="email"
                      value={formData.email} onChange={handleChange}
                      error={errors.email} required placeholder="your@email.com"
                    />
                    <Field
                      label="Phone Number" id="phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleChange}
                      placeholder="Optional"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <SelectField
                      label="Service needed" id="service" name="service"
                      value={formData.service} onChange={handleChange}
                      options={serviceOptions}
                    />
                    <SelectField
                      label="Budget range" id="budget" name="budget"
                      value={formData.budget} onChange={handleChange}
                      options={budgetOptions}
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="text-ink text-sm font-medium mb-1.5 block">
                      Project details <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, goals, and timeline..."
                      required
                      aria-required="true"
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={errors.message ? true : undefined}
                      className={`w-full bg-bg border rounded-xl px-4 py-3 text-ink text-sm placeholder:text-ink-muted focus:outline-none focus:border-accent resize-none transition-colors duration-200 ${errors.message ? 'border-red-500' : 'border-border'}`}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-red-400 text-xs mt-1" aria-live="polite">{errors.message}</p>
                    )}
                  </div>

                  {status === 'success' && (
                    <div role="status" aria-live="polite" className="mb-4 p-4 rounded-xl bg-green-900/20 border border-green-800 text-green-400 text-sm">
                      ✓ Message sent. We'll be in touch within 24 hours.
                    </div>
                  )}
                  {status === 'error' && (
                    <div role="alert" className="mb-4 p-4 rounded-xl bg-red-900/20 border border-red-800 text-red-400 text-sm">
                      Something went wrong. Please email us directly at hello@acmesmedia.com
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                    <Send size={15} aria-hidden="true" />
                  </button>
                </form>
              </RevealWrapper>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, id, name, type, value, onChange, error, required, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="text-ink text-sm font-medium mb-1.5 block">
        {label}
        {required && <span aria-hidden="true" className="text-accent ml-1">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        className={`w-full bg-bg border rounded-xl px-4 py-3 text-ink text-sm placeholder:text-ink-muted focus:outline-none focus:border-accent transition-colors duration-200 ${error ? 'border-red-500' : 'border-border'}`}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-400 text-xs mt-1" aria-live="polite">{error}</p>
      )}
    </div>
  );
}

function SelectField({ label, id, name, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={id} className="text-ink text-sm font-medium mb-1.5 block">{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-accent transition-colors duration-200 appearance-none"
      >
        <option value="">Select one…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
