"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("خطأ في بيانات الدخول، يرجى المحاولة مرة أخرى.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* الشعار في الخلفية بشفافية بسيطة */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <img src="/logo-center.png" alt="Logo BG" className="w-[500px] h-[500px] object-contain" />
      </div>

      <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl w-full max-w-md relative z-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo-center.png" alt="الشعار" className="w-24 h-24 mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
          <h1 className="text-2xl font-black text-gold text-center">مركز معاوية لتحفيظ القرآن</h1>
          <p className="text-zinc-500 text-sm mt-2 font-bold">نظام الإدارة الذكي</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gold text-sm font-bold mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl focus:outline-none focus:border-gold text-white transition"
              placeholder="name@muawiya.edu"
              required
            />
          </div>

          <div>
            <label className="block text-gold text-sm font-bold mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl focus:outline-none focus:border-gold text-white transition"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-dark text-black font-black py-3 rounded-xl transition duration-300 shadow-lg"
          >
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-zinc-900 pt-6">
          <p className="text-zinc-500 text-sm italic">
            مشرف الحلقات: مهيب محمد سيف أحمد
          </p>
        </div>
      </div>
    </div>
  );
}
