"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabase";
import Sidebar from "../../src/components/Sidebar";
import { GraduationCap, Users, Menu, TrendingUp, Bell } from "lucide-react";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = "/login"; return; }
      const { data: p } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      setProfile(p);
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white flex font-['Tajawal']" dir="rtl">
      <Sidebar profile={profile} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-3 bg-zinc-900 rounded-2xl text-gold border border-zinc-800"><Menu/></button>
          <div className="text-right">
            <h1 className="text-2xl font-black text-white italic">اللوحة الرئيسية</h1>
            <p className="text-gold text-[10px] font-bold uppercase">مركز معاوية لتحفيظ القرآن الكريم</p>
          </div>
          <img src="/logo-center.png" className="w-12 h-12 rounded-full border border-gold/30 p-1" />
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {['إجمالي الطلاب', 'الغائبون اليوم', 'الحاضرون اليوم', 'إجمالي الحلقات'].map((l, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 p-5 rounded-[2rem] text-center shadow-xl">
              <p className="text-zinc-500 text-[9px] font-bold mb-1 uppercase">{l}</p>
              <p className="text-2xl font-black text-gold">0</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900/40 border border-gold/10 p-10 rounded-[2.5rem] text-center shadow-2xl">
          <GraduationCap className="text-gold mx-auto mb-4" size={40} />
          <h2 className="text-xl text-yellow-600 font-black mb-2">أهلاً بك: {profile?.display_name || "مدير النظام"}</h2>
          <p className="text-zinc-500 text-xs italic">تم تفعيل كافة ميزات الإدارة والطلاب بنجاح.</p>
        </div>
      </main>
    </div>
  );
}
