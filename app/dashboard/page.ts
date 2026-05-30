"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabase";
import Sidebar from "../../src/components/Sidebar";
import { GraduationCap, Users, Menu, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = "/login"; } 
      else { setUser(session.user); }
    };
    checkUser();
  }, []);

  if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-gold font-bold">جاري فتح النظام...</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-white flex" dir="rtl">
      <Sidebar profile={user} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-3 bg-zinc-900 rounded-2xl text-gold border border-zinc-800"><Menu size={24}/></button>
          <div className="text-right">
            <h1 className="text-2xl font-black text-white italic">اللوحة الرئيسية</h1>
            <p className="text-gold text-[10px] font-bold">مركز معاوية لتحفيظ القرآن الكريم وعلومه</p>
          </div>
          <img src="/logo-center.png" className="w-10 h-10 rounded-full border border-gold/30" />
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {['إجمالي الطلاب', 'الغائبون', 'الحاضرون', 'التنبيهات'].map((label, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 p-5 rounded-[2rem] text-center">
              <p className="text-zinc-500 text-[10px] font-black mb-1">{label}</p>
              <p className="text-2xl font-black text-gold">0</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] text-center">
          <GraduationCap className="text-gold mx-auto mb-4" size={40} />
          <h2 className="text-xl font-bold text-white mb-2">أهلاً بك يا مدير النظام</h2>
          <p className="text-zinc-500 text-sm italic">تم الاتصال بقاعدة البيانات بنجاح</p>
        </div>
      </main>
    </div>
  );
}
