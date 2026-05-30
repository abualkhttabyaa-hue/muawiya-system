"use client";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("جاري التحقق...");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setStatus("تم النجاح! جاري التوجيه...");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setStatus("خطأ: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] border border-zinc-800 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl text-center">
        <img src="/logo-center.png" className="w-20 h-20 mx-auto mb-4" alt="logo" />
        <h1 className="text-white text-lg font-black mb-1">مركز معاوية لتحفيظ القرآن الكريم وعلومه</h1>
        <p className="text-yellow-600 text-[10px] font-bold mb-8 uppercase">نظام الإدارة الذكي</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="كلمة المرور" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-yellow-600 text-black font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform font-bold">تسجيل الدخول</button>
        </form>
        {status && <div className="mt-4 p-3 bg-zinc-900 rounded-xl text-[10px] text-yellow-200 border border-yellow-900/20">{status}</div>}
      </div>
    </div>
  );
}
