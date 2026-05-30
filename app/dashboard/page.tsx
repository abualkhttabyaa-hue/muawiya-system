"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) window.location.href = "/login";
      else setUser(session.user);
    };
    checkUser();
  }, []);

  if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-yellow-600 font-bold">جاري فتح النظام...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6" dir="rtl">
      <header className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-8">
        <div className="text-right">
          <h1 className="text-xl font-black text-white italic">اللوحة الرئيسية</h1>
          <p className="text-yellow-600 text-[10px] font-bold">مركز معاوية لتحفيظ القرآن الكريم وعلومه</p>
        </div>
        <img src="/logo-center.png" className="w-12 h-12 rounded-full border border-gold/30" />
      </header>

      <div className="bg-[#0A0A0A] border border-yellow-600/20 p-10 rounded-[2.5rem] text-center shadow-2xl">
        <h2 className="text-xl text-yellow-600 font-black mb-4 italic">أهلاً بك يا مدير النظام</h2>
        <p className="text-zinc-500 text-xs mb-8">تم تسجيل الدخول بنجاح للإيميل: {user.email}</p>
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800"><p className="text-[10px] text-zinc-500 font-bold mb-1 uppercase">الحلقات</p><p className="text-2xl font-black text-gold">0</p></div>
           <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800"><p className="text-[10px] text-zinc-500 font-bold mb-1 uppercase">الطلاب</p><p className="text-2xl font-black text-gold">0</p></div>
        </div>
      </div>
      
      <button onClick={() => supabase.auth.signOut().then(() => window.location.href = "/login")} className="mt-10 w-full py-4 text-zinc-600 text-xs font-bold border border-zinc-900 rounded-xl">تسجيل الخروج</button>
    </div>
  );
}
