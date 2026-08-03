export default function StatTile({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-cherry-pink/30 bg-white p-6">
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-text-light">{label}</p>
      <p className="mt-2 font-sans text-3xl font-black text-text-dark">{value}</p>
      {sublabel && <p className="mt-1 font-sans text-xs text-text-light">{sublabel}</p>}
    </div>
  );
}
