export default function Highlights({ highlights = [] }) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-700 mb-2">Highlights:</h4>
      <div className="flex flex-wrap gap-2">
        {highlights.map((highlight, idx) => (
          <span key={idx} className="highlight-chip">
            {highlight}
          </span>
        ))}
      </div>
    </div>
  );
}
