"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const PIN_LENGTH = 4;

export default function AdminLoginPage() {
  const router = useRouter();
  const [digits, setDigits]     = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const [error, setError]       = useState("");
  const [verifying, setVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  async function submitPin(pin: string) {
    setVerifying(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ password: pin }),
      });

      if (!res.ok) throw new Error();

      router.push("/admin");
      router.refresh();
    } catch {
      setError("잠금모드 암호가 일치하지 않습니다.");
      setDigits(Array(PIN_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setVerifying(false);
    }
  }

  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);

    if (digit && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (digit && index === PIN_LENGTH - 1 && next.every((d) => d !== "")) {
      submitPin(next.join(""));
    }
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-warm-linen px-6">
      <div className="w-full max-w-xs space-y-6 rounded-3xl border border-cherry-pink/30 bg-white p-8 text-center shadow-xl">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-light-pink">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ed155d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-sans text-base font-black text-text-dark">잠금모드 상태입니다</p>
          <p className="font-sans text-xs text-text-light">Enter your 4-digit admin PIN</p>
        </div>

        <div className="flex justify-center gap-3">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={verifying}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              className="h-14 w-12 rounded-xl border-2 border-cherry-pink/30 text-center font-sans text-2xl font-black text-text-dark outline-none focus:border-korean-red disabled:opacity-60"
            />
          ))}
        </div>

        {error && <p className="font-sans text-xs text-red-500">{error}</p>}
      </div>
    </main>
  );
}
