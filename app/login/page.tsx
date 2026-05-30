"use client";
import { useState } from "react";
import { supabase } from "../../src/lib/supabase";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleAction = async (e: any) => {
    e.preventDefault();
    setStatus("جاري المعالجة...");
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setStatus("تم النجاح! جاري التوجيه...");
        window.location.href = "/dashboard";
      } else {
        const { error } = await supabase.auth.signUp({
          email, password, options: { data: { display_name: name } }
        });
        if (error) throw error;
        setStatus("تم الطلب! انتظر تفعيل المدير.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setStatus("فشل: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-right" dir="rtl">
      <div className="bg-[#0A0A0A] border border-zinc-800 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl relative">
        <img src="/logo-center.png" className="w-24 h-24 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
        <h1 className="text-white text-xl font-black text-center mb-1 leading-tight">مركز معاوية لتحفيظ القرآن الكريم وعلومه</h1>
        <p className="text-gold text-[10px] text-center font-bold mb-8 uppercase tracking-widest">نظام الإدارة الذكي</p>
        <form onSubmit={handleAction} className="space-y-4">
          {!isLogin && <input type="text" placeholder="الاسم الكامل للمدرس" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-gold" onChange={(e) => setName(e.target.value)} required />}
          <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-gold" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="كلمة المرور" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-gold" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-gold text-black font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">
            {isLogin ? "تسجيل الدخول" : "إرسال طلب انضمام"}
          </button>
        </form>
        <button onClick={() => { setIsLogin(!isLogin); setStatus(""); }} className="w-full mt-6 text-zinc-500 text-[10px] font-bold hover:text-gold transition">
          {isLogin ? "ليس لديك حساب؟ طلب انضمام كمعلم جديد" : "لديك حساب بالفعل؟ سجل دخولك"}
        </button>
        {status && <div className="mt-4 p-3 bg-zinc-900 rounded-xl text-[10px] text-center text-yellow-200 border border-gold/10 font-bold">{status}</div>}
      </div>
    </div>
  );
}
