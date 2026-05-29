"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import { GraduationCap, TrendingUp, Bell, Users, Menu } from "lucide-react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [circles, setCircles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = "/login"; return; }

      const { data: prof } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      setProfile(prof);

      const { data: circs } = await supabase.from('circles').select('*, profiles(display_name)');
      setCircles(circs || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-gold">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex" dir="rtl">
      {/* القائمة الجانبية مع تحكم للهاتف */}
      <Sidebar 
        userRole={profile?.role} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        {/* الهيدر مع زر القائمة للهاتف */}
        <header className="flex justify-between items-center mb-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 bg-zinc-900 rounded-lg text-gold border border-zinc-800"
          >
            <Menu size={24}/>
          </button>
          
          <div className="text-right flex-1 md:flex-none mr-4 md:mr-0">
            <h1 className="text-xl md:text-3xl font-black text-gold">اللوحة الرئيسية</h1>
            <p className="text-zinc-500 text-[10px] md:text-sm">مرحباً بك: {profile?.display_name}</p>
          </div>

          <div className="flex gap-2 items-center">
             <img src="/logo-center.png" className="w-10 h-10 rounded-full border border-gold/50" />
          </div>
        </header>

        {/* الكروت الأربعة */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { t: 'إجمالي الطلاب', v: '0', c: 'text-yellow-500' },
            { t: 'الغائبون', v: '0', c: 'text-red-500' },
            { t: 'تنبيهات', v: '0', c: 'text-orange-500' },
            { t: 'حاضرون', v: '0', c: 'text-green-500' }
          ].map((s, i) => (
            <div key={i} className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl text-center">
              <p className="text-zinc-500 text-[9px] mb-1 font-bold">{s.t}</p>
              <p className={`text-xl font-black ${s.c}`}>{s.v}</p>
            </div>
          ))}
        </div>

        {/* الرول */}
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-yellow-100">
          <GraduationCap className="text-gold" size={18} /> قائمة الحلقات
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x">
          {circles.length === 0 ? (
            <div className="w-full bg-zinc-900/40 border-2 border-dashed border-zinc-800 p-8 rounded-3xl text-center text-zinc-500 text-xs">
              لا توجد حلقات. استخدم "إدارة الحلقات" من القائمة.
            </div>
          ) : (
            circles.map((c) => (
              <div key={c.id} className="min-w-[250px] snap-center bg-zinc-900 border border-zinc-800 p-5 rounded-[2rem] shadow-xl">
                <h3 className="text-lg font-bold text-gold mb-4">{c.name}</h3>
                <button className="w-full bg-gold text-black py-2 rounded-xl font-black text-[10px]">دخول الحلقة</button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
