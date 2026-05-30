"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) window.location.replace("/login");
      else setUser(session.user);
    };
    checkUser();
  }, []);

  if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-yellow-600 font-bold font-['Tajawal']">جاري فتح النظام...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 text-right font-['Tajawal']" dir="rtl">
      <header className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-8 text-right">
        <div>
          <h1 className="text-xl font-black text-white italic text-yellow-600">لوحة التحكم</h1>
          <p className="text-zinc-500 text-[10px] font-bold">مركز معاوية لتحفيظ القرآن الكريم وعلومه</p>
        </div>
        <img src="/logo-center.png" className="w-12 h-12 rounded-full border border-gold/30" />
      </header>
      <div className="bg-[#0A0A0A] border border-yellow-600/20 p-10 rounded-[2.5rem] text-center shadow-2xl">
        <h2 className="text-xl text-yellow-600 font-black mb-4 italic text-center">أهلاً بك يا مدير النظام</h2>
        <p className="text-zinc-500 text-xs mb-6 text-center leading-relaxed">أنت الآن متصل بقاعدة البيانات بنجاح.</p>
        <div className="grid grid-cols-2 gap-4 text-center">
           <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800"><p className="text-[10px] text-zinc-500 font-bold mb-1">الحلقات</p><p className="text-xl font-black text-gold">0</p></div>
           <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800"><p className="text-[10px] text-zinc-500 font-bold mb-1">الطلاب</p><p className="text-xl font-black text-gold">0</p></div>
        </div>
      </div>
    </div>
  );
}
