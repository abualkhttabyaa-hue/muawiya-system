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
      setStatus("خطأ: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-right font-['Tajawal']" dir="rtl">
      <div className="bg-[#0A0A0A] border border-zinc-800 p-8 rounded-[2rem] w-full max-w-md shadow-2xl">
        <img src="/logo-center.png" className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-white text-lg font-black text-center mb-1 leading-tight">مركز معاوية لتحفيظ القرآن الكريم</h1>
        <p className="text-gold text-[10px] text-center font-bold mb-8 uppercase italic">نظام الإدارة الذكي</p>
        <form onSubmit={handleAction} className="space-y-4">
          {!isLogin && <input type="text" placeholder="الاسم الرباعي للمدرس" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-gold" onChange={(e)=>setName(e.target.value)} required />}
          <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-gold" onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="كلمة المرور" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-gold" onChange={(e)=>setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-gold text-black font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">{isLogin ? "دخول النظام" : "انضمام كمعلم"}</button>
        </form>
        <button onClick={()=>setIsLogin(!isLogin)} className="w-full mt-6 text-zinc-500 text-xs font-bold">{isLogin ? "طلب انضمام كمعلم جديد" : "لديك حساب؟ دخول"}</button>
        {status && <div className="mt-4 p-3 bg-zinc-900 rounded-xl text-yellow-200 text-xs text-center border border-gold/10 font-bold">{status}</div>}
      </div>
    </div>
  );
}
