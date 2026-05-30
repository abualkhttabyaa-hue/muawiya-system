"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../src/lib/supabase";
import { UserPlus, Check, X, Clock, Save, BookOpen, ArrowRight } from "lucide-react";

export default function CircleDetails({ params }: { params: { id: string } }) {
  const [circle, setCircle] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: circ } = await supabase.from('circles').select('*').eq('id', params.id).single();
      setCircle(circ);
      const { data: stds } = await supabase.from('students').select('*').eq('circle_id', params.id);
      setStudents(stds || []);
      setLoading(false);
    };
    fetchData();
  }, [params.id]);

  const saveProgress = async (studentId: string, status: string, hifth: any, review: any) => {
    const { error } = await supabase.from('daily_progress').insert([{
      student_id: studentId,
      status: status,
      type: 'حفظ ومراجعة',
      juz_num: hifth.juz,
      page_from: hifth.page,
      grade: 'ممتاز'
    }]);
    if (!error) alert("تم حفظ سجل الطالب بنجاح");
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-gold font-bold">جاري تحميل سجلات الحلقة...</div>;

  return (
    <div className="p-4 md:p-10 w-full max-w-6xl mx-auto text-right font-['Tajawal']" dir="rtl">
      <header className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-6">
        <a href="/dashboard/circles" className="p-2 bg-zinc-900 rounded-xl text-gold"><ArrowRight/></a>
        <h1 className="text-2xl font-black text-white">إدارة {circle?.name}</h1>
      </header>

      <div className="space-y-6">
        {students.map((s) => (
          <div key={s.id} className="bg-zinc-950 border border-zinc-800 p-6 rounded-[2rem] shadow-2xl">
            <h3 className="text-lg font-black text-gold mb-4 border-r-4 border-gold pr-3">{s.name}</h3>
            
            {/* الحضور والغياب */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <button className="bg-green-500/10 text-green-500 py-3 rounded-xl border border-green-500/20 text-xs font-bold flex items-center justify-center gap-2"><Check size={14}/> حاضر</button>
              <button className="bg-red-500/10 text-red-500 py-3 rounded-xl border border-red-500/20 text-xs font-bold flex items-center justify-center gap-2"><X size={14}/> غائب</button>
              <button className="bg-blue-500/10 text-blue-500 py-3 rounded-xl border border-blue-500/20 text-xs font-bold flex items-center justify-center gap-2"><Clock size={14}/> مستأذن</button>
            </div>

            {/* الحفظ والمراجعة (الترتيب العكسي) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/50 p-4 rounded-2xl">
               <div>
                  <label className="text-zinc-500 text-[10px] font-bold block mb-2">سجل الحفظ (جزء/صفحة/آية)</label>
                  <div className="flex gap-2">
                     <input type="number" placeholder="جزء" className="w-full bg-black border border-zinc-800 p-2 rounded-lg text-center text-white" />
                     <input type="number" placeholder="ص" className="w-full bg-black border border-zinc-800 p-2 rounded-lg text-center text-white" />
                     <input type="number" placeholder="آية" className="w-full bg-black border border-zinc-800 p-2 rounded-lg text-center text-white" />
                  </div>
               </div>
               <div>
                  <label className="text-zinc-500 text-[10px] font-bold block mb-2">سجل المراجعة</label>
                  <div className="flex gap-2">
                     <input type="number" placeholder="جزء" className="w-full bg-black border border-zinc-800 p-2 rounded-lg text-center text-white" />
                     <input type="number" placeholder="ص" className="w-full bg-black border border-zinc-800 p-2 rounded-lg text-center text-white" />
                     <input type="number" placeholder="آية" className="w-full bg-black border border-zinc-800 p-2 rounded-lg text-center text-white" />
                  </div>
               </div>
            </div>
            <button className="w-full mt-4 bg-gold text-black font-black py-3 rounded-xl flex items-center justify-center gap-2"><Save size={18}/> حفظ إنجاز اليوم</button>
          </div>
        ))}
      </div>
    </div>
  );
}
