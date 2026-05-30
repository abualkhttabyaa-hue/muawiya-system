"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabase";
import Sidebar from "../../src/components/Sidebar";
import { GraduationCap, Users, Menu, TrendingUp } from "lucide-react";

export default function Dash() {
  const [u, setU] = useState<any>(null);
  const [c, setC] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const start = async () => {
      const { data:{session} } = await supabase.auth.getSession();
      if (!session) window.location.replace("/login");
      else {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        setU(data || session.user);
        const { data: circs } = await supabase.from('circles').select('*');
        setC(circs || []);
      }
    };
    start();
  }, []);

  if (!u) return <div className="min-h-screen bg-black flex items-center justify-center text-gold font-bold">جاري الفتح...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex" dir="rtl">
      <Sidebar profile={u} isOpen={open} onClose={()=>setOpen(false)} />
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <button onClick={()=>setOpen(true)} className="md:hidden p-2 bg-zinc-900 rounded-lg text-gold"><Menu/></button>
          <div className="text-right">
            <h1 className="text-2xl font-black text-white">اللوحة الرئيسية</h1>
            <p className="text-gold text-[10px] font-bold italic">مركز معاوية لتحفيظ القرآن الكريم وعلومه</p>
          </div>
          <img src="/logo-center.png" className="w-10 h-10 rounded-full border border-gold/30" />
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 text-center">
          {['الطلاب', 'الغائبون', 'الحاضرون', 'الحلقات'].map((l, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 p-5 rounded-[2rem] shadow-xl">
              <p className="text-zinc-500 text-[10px] font-bold mb-1 uppercase">{l}</p>
              <p className="text-2xl font-black text-gold">0</p>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-bold mb-4 flex gap-2 items-center text-yellow-100 italic"><GraduationCap className="text-gold"/> قائمة الحلقات الحالية</h2>
        <div className="flex overflow-x-auto gap-4 pb-6 no-scrollbar snap-x">
          {c.length === 0 ? (
            <div className="w-full bg-zinc-900/30 border-2 border-dashed border-zinc-800 p-10 rounded-[2rem] text-center text-zinc-600 font-bold italic">لا توجد حلقات نشطة.</div>
          ) : (
            c.map(circle => (
              <div key={circle.id} className="min-w-[280px] snap-center bg-zinc-900 border border-zinc-800 p-6 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-xl font-black text-white mb-6">{circle.name}</h3>
                <a href={`/dashboard/circles/${circle.id}`} className="block w-full bg-gold text-black text-center py-3 rounded-2xl font-black text-xs">إدارة الحلقة</a>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
