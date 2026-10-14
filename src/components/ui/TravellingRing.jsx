// Gold highlight that travels around a pill button's edge at constant speed.
// Render inside an element with `btn-primary cta-live` (position: relative).
//
// Four dashes share one leading edge but have different lengths and opacities,
// which gives the highlight a long fading tail and a bright head. pathLength
// normalises the perimeter to 100 so the same numbers work at any button size.
const SEGMENTS = [
  { l: 40, opacity: 0.2, stroke: '#C8A96E' },
  { l: 26, opacity: 0.5, stroke: '#E0BC6A' },
  { l: 14, opacity: 0.9, stroke: '#FFD97D' },
  { l: 6, opacity: 1, stroke: '#FFFBE0' },
];

export default function TravellingRing() {
  return (
    <svg className="cta-ring" aria-hidden="true" focusable="false">
      <rect className="cta-ring__base" x="0" y="0" width="100%" height="100%" ry="50%" pathLength="100" />
      {SEGMENTS.map((seg) => (
        <rect
          key={seg.l}
          className="cta-ring__seg"
          x="0"
          y="0"
          width="100%"
          height="100%"
          ry="50%"
          pathLength="100"
          strokeDasharray={`${seg.l} ${100 - seg.l}`}
          style={{ '--l': seg.l, stroke: seg.stroke, strokeOpacity: seg.opacity }}
        />
      ))}
    </svg>
  );
}
