"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // للتنقل بين الدخول والتسجيل
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleAction = async (e: any) => {
    e.preventDefault();
    setStatus("جاري المعالجة...");

    if (isLogin) {
      // تسجيل الدخول
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus("خطأ: " + error.message);
      } else {
        setStatus("تم النجاح! جاري فتح اللوحة...");
        window.location.href = "/dashboard";
      }
    } else {
      // تسجيل مدرس جديد
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: name } }
      });
      if (error) {
        setStatus("خطأ: " + error.message);
      } else {
        setStatus("تم إرسال الطلب! انتظر موافقة المدير العام للدخول.");
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-right" dir="rtl">
      <div className="bg-[#0A0A0A] border border-zinc-800 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
        
        <img src="/logo-center.png" className="w-20 h-20 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
        <h1 className="text-white text-xl font-black text-center mb-1">مركز معاوية لتحفيظ القرآن الكريم وعلومه</h1>
        <p className="text-gold text-xs text-center font-bold mb-8">نظام الإدارة الذكي</p>

        <form onSubmit={handleAction} className="space-y-4">
          {!isLogin && (
            <input 
              type="text" placeholder="الاسم الكامل للمدرس" 
              className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-gold"
              onChange={(e) => setName(e.target.value)} required 
            />
          )}
          <input 
            type="email" placeholder="البريد الإلكتروني" 
            className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-gold"
            onChange={(e) => setEmail(e.target.value)} required 
          />
          <input 
            type="password" placeholder="كلمة المرور" 
            className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-gold"
            onChange={(e) => setPassword(e.target.value)} required 
          />
          
          <button type="submit" className="w-full bg-gold text-black font-black py-4 rounded-2xl shadow-lg transition-transform active:scale-95">
            {isLogin ? "تسجيل الدخول" : "إرسال طلب انضمام"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setStatus(""); }}
            className="text-zinc-500 text-xs font-bold hover:text-gold transition"
          >
            {isLogin ? "ليس لديك حساب؟ طلب انضمام كمدرس" : "لديك حساب بالفعل؟ دخول"}
          </button>
        </div>

        {status && (
          <div className="mt-4 p-3 bg-zinc-900 rounded-xl text-[10px] text-center text-yellow-200 border border-gold/10">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
