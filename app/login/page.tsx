"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("جاري الاتصال...");

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setStatus(`خطأ: ${error.message}`);
        setLoading(false);
        return;
      }

      setStatus("تم الدخول! جاري التوجيه...");
      window.location.href = "/dashboard";
      
    } catch (err: any) {
      setStatus(`فشل النظام: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 text-right" dir="rtl">
      <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo-center.png" alt="الشعار" className="w-20 h-20 mb-4" />
          <h1 className="text-xl font-bold text-gold text-center">مركز معاوية - دخول النظام</h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" placeholder="البريد الإلكتروني" 
            className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-gold"
            onChange={(e) => setEmail(e.target.value)} required 
          />
          <input 
            type="password" placeholder="كلمة المرور" 
            className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-gold"
            onChange={(e) => setPassword(e.target.value)} required 
          />
          <button 
            type="submit" disabled={loading}
            className="w-full bg-gold text-black font-bold py-3 rounded-xl transition"
          >
            {loading ? "انتظر ثواني..." : "تسجيل الدخول"}
          </button>
        </form>

        {status && (
          <div className="mt-4 p-3 bg-zinc-900 rounded-lg text-sm text-center text-yellow-200 border border-yellow-900/50 font-bold">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
