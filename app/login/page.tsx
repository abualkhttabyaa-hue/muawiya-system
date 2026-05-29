"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setStatus("جاري التحقق...");
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setStatus("خطأ: " + error.message);
    } else {
      setStatus("تم النجاح! جاري التوجيه...");
      // الانتقال الإجباري
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4" dir="rtl">
      <div className="bg-zinc-900 border border-gold/20 p-8 rounded-2xl w-full max-w-md shadow-2xl text-center">
        <img src="/logo-center.png" className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-gold text-2xl font-bold mb-6">دخول مركز معاوية</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="الإيميل" className="w-full p-3 rounded-xl bg-black border border-zinc-800 text-white" onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="كلمة المرور" className="w-full p-3 rounded-xl bg-black border border-zinc-800 text-white" onChange={(e)=>setPassword(e.target.value)} required />
          <button className="w-full bg-gold text-black font-bold py-3 rounded-xl">دخول النظام</button>
        </form>
        {status && <p className="mt-4 text-yellow-200 text-sm">{status}</p>}
      </div>
    </div>
  );
}
