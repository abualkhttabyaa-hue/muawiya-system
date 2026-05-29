"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import { Plus, GraduationCap, User, Menu } from "lucide-react";

export default function CirclesPage() {
  const [profile, setProfile] = useState<any>(null);
  const [circles, setCircles] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const { data: p } = await supabase.from('profiles').select('*').eq('id', session?.user.id).single();
      setProfile(p);
      const { data: c } = await supabase.from('circles').select('*, profiles(display_name)');
      setCircles(c || []);
      const { data: t } = await supabase.from('profiles').select('id, display_name').eq('role', 'مدرس');
      setTeachers(t || []);
    };
    getData();
  }, []);

  const addCircle = async () => {
    if(!name || !teacherId) return alert("اكمل البيانات");
    await supabase.from('circles').insert([{ name, teacher_id: teacherId }]);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white flex" dir="rtl">
      <Sidebar userRole={profile?.role} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 p-6">
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden mb-4 p-2 bg-zinc-900 rounded-lg text-gold"><Menu/></button>
        <h1 className="text-2xl font-black text-gold mb-8 italic">إدارة الحلقات التعليمية</h1>
        
        {profile?.role === 'المدير العام' && (
          <div className="bg-zinc-900 p-6 rounded-3xl mb-8 border border-gold/10">
            <h3 className="mb-4 font-bold text-yellow-100">إضافة حلقة جديدة</h3>
            <div className="flex flex-col gap-4">
              <input placeholder="اسم الحلقة" className="bg-black p-3 rounded-xl border border-zinc-800" onChange={e=>setName(e.target.value)}/>
              <select className="bg-black p-3 rounded-xl border border-zinc-800" onChange={e=>setTeacherId(e.target.value)}>
                <option value="">اختر المدرس</option>
                {teachers.map(t => <option key={t.id} value={t.id}>{t.display_name}</option>)}
              </select>
              <button onClick={addCircle} className="bg-gold text-black font-black py-3 rounded-xl">إنشاء الحلقة</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {circles.map(c => (
            <div key={c.id} className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-xl">
              <h2 className="text-xl font-bold text-gold">{c.name}</h2>
              <p className="text-zinc-500 text-xs mt-1">المدرس: {c.profiles?.display_name}</p>
              <a href={`/dashboard/circles/${c.id}`} className="block mt-6 text-center bg-zinc-800 py-2 rounded-xl text-xs font-bold hover:bg-gold hover:text-black transition">إدارة طلاب الحلقة</a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
