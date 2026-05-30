"use client";
import { useState } from "react";
// لاحظ المسار المباشر بالنقاط ../.. لكي لا يضيع فيرسل
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setStatus("جاري التحقق...");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setStatus("نجح الدخول! جاري التوجيه...");
      window.location.replace("/dashboard");
    } catch (err: any) {
      setStatus("خطأ: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-right" dir="rtl">
      <div className="bg-[#0A0A0A] border border-zinc-800 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl">
        <img src="/logo-center.png" className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-white text-lg font-black text-center mb-1">مركز معاوية لتحفيظ القرآن الكريم وعلومه</h1>
        <p className="text-yellow-600 text-[10px] text-center mb-8 font-bold">نظام الإدارة الذكي</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-yellow-600" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="كلمة المرور" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-yellow-600" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-yellow-600 text-black font-black py-4 rounded-2xl shadow-lg font-bold">تسجيل الدخول</button>
        </form>
        {status && <div className="mt-4 p-3 bg-zinc-900 rounded-xl text-[10px] text-center text-yellow-200 font-bold">{status}</div>}
      </div>
    </div>
  );
}
