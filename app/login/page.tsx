"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleAction = async (e: any) => {
    e.preventDefault();
    setStatus("جاري التحقق من البيانات...");
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setStatus("تم النجاح! جاري فتح النظام...");
        // توجيه إجباري يكسر التعليق
        setTimeout(() => { window.location.replace("/dashboard"); }, 500);
      } else {
        const { error } = await supabase.auth.signUp({
          email, password, options: { data: { display_name: name } }
        });
        if (error) throw error;
        setStatus("تم الطلب! انتظر تفعيل الحساب من المدير.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setStatus("فشل: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-right font-['Tajawal']" dir="rtl">
      <div className="bg-[#0A0A0A] border border-zinc-800 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl">
        <img src="/logo-center.png" className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-white text-lg font-black text-center mb-1">مركز معاوية لتحفيظ القرآن الكريم وعلومه</h1>
        <p className="text-yellow-600 text-[10px] text-center font-bold mb-8 uppercase">نظام الإدارة الذكي</p>

        <form onSubmit={handleAction} className="space-y-4">
          {!isLogin && (
            <input type="text" placeholder="الاسم الكامل" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none" onChange={(e) => setName(e.target.value)} required />
          )}
          <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="كلمة المرور" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-yellow-600 text-black font-black py-4 rounded-2xl shadow-lg">
            {isLogin ? "دخول النظام" : "إرسال الطلب"}
          </button>
        </form>

        <button onClick={() => { setIsLogin(!isLogin); setStatus(""); }} className="w-full mt-6 text-zinc-500 text-[10px] font-bold">
          {isLogin ? "ليس لديك حساب؟ طلب انضمام كمعلم" : "لديك حساب؟ سجل دخولك"}
        </button>

        {status && <div className="mt-4 p-3 bg-zinc-900 rounded-xl text-[10px] text-center text-yellow-200 border border-yellow-900/20">{status}</div>}
      </div>
    </div>
  );
}
