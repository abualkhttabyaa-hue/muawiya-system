"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";

export default function StudentsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [circles, setCircles] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [form, setForm] = useState({ name: "", phone: "", birth: "", initial_juz: 0, circle_id: "" });

  useEffect(() => {
    const getData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const { data: p } = await supabase.from('profiles').select('*').eq('id', session?.user.id).single();
      setProfile(p);
      const { data: s } = await supabase.from('students').select('*, circles(name)');
      setStudents(s || []);
      const { data: c } = await supabase.from('circles').select('*');
      setCircles(c || []);
    };
    getData();
  }, []);

  const addStudent = async () => {
    await supabase.from('students').insert([{
      name: form.name,
      parent_phone: form.phone,
      birth_date: form.birth,
      initial_juz: form.initial_juz,
      circle_id: form.circle_id
    }]);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white flex" dir="rtl">
      <Sidebar userRole={profile?.role} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-black text-gold mb-8 italic text-center">شؤون الطلاب</h1>
        
        <div className="bg-zinc-900 p-6 rounded-3xl mb-8 border border-gold/10 shadow-2xl">
          <h3 className="mb-4 font-bold text-yellow-100">تسجيل طالب جديد</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="اسم الطالب الرباعي" className="bg-black p-3 rounded-xl border border-zinc-800" onChange={e=>setForm({...form, name: e.target.value})}/>
            <input placeholder="رقم ولي الأمر (WhatsApp)" className="bg-black p-3 rounded-xl border border-zinc-800" onChange={e=>setForm({...form, phone: e.target.value})}/>
            <input type="date" className="bg-black p-3 rounded-xl border border-zinc-800 text-zinc-500" onChange={e=>setForm({...form, birth: e.target.value})}/>
            <select className="bg-black p-3 rounded-xl border border-zinc-800" onChange={e=>setForm({...form, circle_id: e.target.value})}>
              <option value="">تسكين في حلقة</option>
              {circles.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input type="number" placeholder="مقدار الحفظ عند الدخول (رقم الجزء)" className="bg-black p-3 rounded-xl border border-zinc-800 md:col-span-2" onChange={e=>setForm({...form, initial_juz: parseInt(e.target.value)})}/>
            <button onClick={addStudent} className="bg-gold text-black font-black py-3 rounded-xl md:col-span-2 shadow-lg">حفظ بيانات الطالب</button>
          </div>
        </div>

        <div className="space-y-4">
          {students.map(s => (
            <div key={s.id} className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 flex justify-between items-center">
              <div>
                <p className="font-bold text-gold">{s.name}</p>
                <p className="text-[10px] text-zinc-500">الحلقة: {s.circles?.name} | الحفظ الأولي: {s.initial_juz}</p>
              </div>
              <div className="text-zinc-500 text-xs">{s.parent_phone}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
