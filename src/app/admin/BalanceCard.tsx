export default function BalanceCard({
  totalNet,
  totalBill,
  totalFees,
}: {
  totalNet: number;
  totalBill: number;
  totalFees: number;
}) {
  return (
    <div className="rounded-2xl bg-linear-to-br from-korean-red to-[#a8242c] p-6 text-white shadow-lg shadow-korean-red/20">
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-white/70">Net Revenue</p>
      <p className="mt-1 font-sans text-4xl font-black">RM {totalNet.toFixed(2)}</p>

      <div className="mt-6 space-y-3 border-t border-white/20 pt-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-sans text-sm text-white/80">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
            </span>
            Gross Billed
          </span>
          <span className="font-sans text-sm font-bold">RM {totalBill.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-sans text-sm text-white/80">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
            </span>
            Payment Fees
          </span>
          <span className="font-sans text-sm font-bold">− RM {totalFees.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
