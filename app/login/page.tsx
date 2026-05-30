"use client";
import { useState } from "react";
import { supabase } from "../../src/lib/supabase";

export default function Login() {
  const [isL, setL] = useState(true);
  const [e, setE] = useState("");
  const [p, setP] = useState("");
  const [n, setN] = useState("");
  const [s, setS] = useState("");

  const handle = async (ev: any) => {
    ev.preventDefault(); setS("انتظر...");
    try {
      if (isL) {
        const { error } = await supabase.auth.signInWithPassword({ email:e, password:p });
        if (error) throw error;
        window.location.replace("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({ email:e, password:p, options:{data:{display_name:n}} });
        if (error) throw error;
        setS("تم الطلب! انتظر تفعيل المدير."); setL(true);
      }
    } catch (err: any) { setS("خطأ: " + err.message); }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-right" dir="rtl">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] w-full max-w-md shadow-2xl">
        <img src="/logo-center.png" className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-white text-lg font-black text-center mb-1">مركز معاوية لتحفيظ القرآن الكريم وعلومه</h1>
        <p className="text-gold text-[10px] text-center mb-8 uppercase font-bold">نظام الإدارة الذكي</p>
        <form onSubmit={handle} className="space-y-4">
          {!isL && <input type="text" placeholder="الاسم الكامل" className="w-full bg-black p-4 rounded-2xl text-white outline-none border border-zinc-800" onChange={x=>setN(ev.target.value)} required />}
          <input type="email" placeholder="البريد" className="w-full bg-black p-4 rounded-2xl text-white outline-none border border-zinc-800" onChange={x=>setE(ev.target.value)} required />
          <input type="password" placeholder="كلمة المرور" className="w-full bg-black p-4 rounded-2xl text-white outline-none border border-zinc-800" onChange={x=>setP(ev.target.value)} required />
          <button className="w-full bg-gold text-black font-black py-4 rounded-2xl shadow-lg">{isL ? "دخول" : "انضمام كمعلم"}</button>
        </form>
        <button onClick={()=>setL(!isL)} className="w-full mt-6 text-zinc-500 text-xs">{isL ? "طلب انضمام كمعلم جديد" : "لديك حساب؟ دخول"}</button>
        {s && <p className="mt-4 text-gold text-center text-xs font-bold">{s}</p>}
      </div>
    </div>
  );
}
