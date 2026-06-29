const items = [
  'Brand Identity',
  'Web Design',
  'Motion Graphics',
  'Corporate Designs',
  'Printing Solutions',
  'Creative Direction',
  'Web Development',
  'Brand Strategy',
  'Print Production',
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-border bg-bg-surface overflow-hidden py-5" aria-hidden="true">
      <div className="flex">
        <div className="marquee-track flex gap-12 animate-marquee whitespace-nowrap">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-12 text-ink-muted text-sm font-medium tracking-widest uppercase shrink-0">
              {item}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
