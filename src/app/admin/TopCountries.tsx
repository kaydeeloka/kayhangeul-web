type CountryTotal = { country: string; count: number; total: number };

export default function TopCountries({ countries }: { countries: CountryTotal[] }) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-cherry-pink/20 bg-light-pink px-3 py-2.5 font-sans text-xs font-bold uppercase tracking-wide text-text-light">
        <span>Country name</span>
        <span className="flex items-center gap-6">
          <span>Count</span>
          <span>Total sales</span>
        </span>
      </div>
      {countries.map((c) => (
        <div key={c.country} className="flex items-center justify-between border-b border-cherry-pink/10 px-3 py-2.5">
          <span className="font-sans text-sm text-text-dark">{c.country}</span>
          <span className="flex items-center gap-6">
            <span className="font-sans text-sm text-text-mid">{c.count}</span>
            <span className="font-sans text-sm font-bold text-text-dark">RM {c.total.toFixed(2)}</span>
          </span>
        </div>
      ))}
      {countries.length === 0 && <p className="px-3 py-4 font-sans text-sm text-text-light">No sales yet.</p>}
    </div>
  );
}
