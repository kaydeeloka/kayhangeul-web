export default function StatCard({
  icon,
  iconBg,
  label,
  value,
  sublabel,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-cherry-pink/30 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm ${iconBg}`}>
        {icon}
      </div>
      <p className="mt-4 font-sans text-xs font-bold uppercase tracking-widest text-text-light">{label}</p>
      <p className="mt-1 font-sans text-2xl font-black text-text-dark">{value}</p>
      {sublabel && <p className="mt-1 font-sans text-xs text-text-light">{sublabel}</p>}
    </div>
  );
}
