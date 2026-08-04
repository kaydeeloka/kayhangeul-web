// Fixed color order — color follows the provider identity, never reassigned by rank/filter.
const PROVIDER_COLORS: Record<string, string> = {
  toyyibpay: "#CD313A",
  paypal:    "#2563EB",
};
const PROVIDER_LABELS: Record<string, string> = {
  toyyibpay: "ToyyibPay",
  paypal:    "PayPal",
};
const FALLBACK_COLORS = ["#059669", "#D97706", "#7C3AED", "#DB2777", "#0891B2", "#65A30D"];

function colorFor(provider: string, index: number): string {
  return PROVIDER_COLORS[provider] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

function labelFor(provider: string): string {
  return PROVIDER_LABELS[provider] ?? provider;
}

type MethodTotal = { method: string; count: number; total: number };

const SIZE = 160;
const RADIUS = 62;
const STROKE = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function PaymentMethodDonut({ methods }: { methods: MethodTotal[] }) {
  const total = methods.reduce((sum, m) => sum + m.total, 0);
  const fractions = methods.map((m) => (total > 0 ? m.total / total : 0));

  const segments = methods.map((m, i) => ({
    provider: m.method,
    label: labelFor(m.method),
    count: m.count,
    total: m.total,
    color: colorFor(m.method, i),
    dasharray: `${fractions[i] * CIRCUMFERENCE} ${CIRCUMFERENCE}`,
    dashoffset: -fractions.slice(0, i).reduce((sum, f) => sum + f, 0) * CIRCUMFERENCE,
  }));

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90 shrink-0">
        {total === 0 ? (
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="var(--cherry-pink)" strokeOpacity={0.3} strokeWidth={STROKE} />
        ) : (
          segments.map((s) => (
            <circle
              key={s.provider}
              cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
              fill="none"
              stroke={s.color}
              strokeWidth={STROKE}
              strokeDasharray={s.dasharray}
              strokeDashoffset={s.dashoffset}
              strokeLinecap="butt"
            />
          ))
        )}
        <text
          x={SIZE / 2} y={SIZE / 2 - 6}
          textAnchor="middle"
          transform={`rotate(90 ${SIZE / 2} ${SIZE / 2})`}
          className="fill-text-light"
          fontSize={11}
        >
          Total
        </text>
        <text
          x={SIZE / 2} y={SIZE / 2 + 16}
          textAnchor="middle"
          transform={`rotate(90 ${SIZE / 2} ${SIZE / 2})`}
          className="fill-text-dark font-black"
          fontSize={16}
        >
          RM {total.toFixed(2)}
        </text>
      </svg>

      <div className="w-full min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-cherry-pink/20 pb-2 font-sans text-xs font-bold uppercase tracking-wide text-text-light">
          <span>Payment instrument</span>
          <span className="flex items-center gap-6">
            <span>Count</span>
            <span>Amount</span>
          </span>
        </div>
        {segments.map((s) => (
          <div key={s.provider} className="flex items-center justify-between border-b border-cherry-pink/10 py-2.5">
            <span className="flex items-center gap-2 font-sans text-sm text-text-dark">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
            <span className="flex items-center gap-6">
              <span className="font-sans text-sm text-text-mid">{s.count}</span>
              <span className="font-sans text-sm font-bold text-text-dark">RM {s.total.toFixed(2)}</span>
            </span>
          </div>
        ))}
        {segments.length === 0 && <p className="py-3 font-sans text-sm text-text-light">No sales yet.</p>}
      </div>
    </div>
  );
}
