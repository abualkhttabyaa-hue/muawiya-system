"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabase";
import Sidebar from "../../src/components/Sidebar";
import { Menu, GraduationCap, Users, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ students: 0, circles: 0 });

  useEffect(() => {
    const getData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = "/login"; return; }
      const { data: p } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      setProfile(p);
      const { count: s } = await supabase.from('students').select('*', { count: 'exact', head: true });
      const { count: c } = await supabase.from('circles').select('*', { count: 'exact', head: true });
      setStats({ students: s || 0, circles: c || 0 });
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white flex" dir="rtl">
      <Sidebar profile={profile} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 bg-zinc-900 rounded-lg text-gold"><Menu/></button>
          <div className="text-right">
            <h1 className="text-2xl font-black text-white italic underline decoration-gold underline-offset-8">اللوحة الرئيسية</h1>
            <p className="text-gold text-[10px] font-bold mt-2 uppercase tracking-widest">مركز معاوية لتحفيظ القرآن الكريم</p>
          </div>
          <img src="/logo-center.png" className="w-12 h-12 rounded-full border border-gold/30 p-1" />
        </header>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] text-center shadow-xl">
            <p className="text-zinc-500 text-[10px] font-bold mb-1 uppercase">إجمالي الطلاب</p>
            <p className="text-3xl font-black text-gold">{stats.students}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] text-center shadow-xl">
            <p className="text-zinc-500 text-[10px] font-bold mb-1 uppercase">الحلقات</p>
            <p className="text-3xl font-black text-gold">{stats.circles}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-black border border-gold/10 p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 blur-3xl"></div>
           <h2 className="text-xl text-yellow-500 font-black mb-4">أهلاً بك يا مدير النظام</h2>
           <p className="text-zinc-400 text-xs italic">أنت الآن تدير مركز معاوية بكل كفاءة.</p>
        </div>
      </main>
    </div>
  );
}
