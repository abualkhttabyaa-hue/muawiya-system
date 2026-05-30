"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../src/lib/supabase";
import { Check, X, Clock, MessageCircle, Save, ArrowRight } from "lucide-react";

export default function CirclePage({ params }: { params: { id: string } }) {
  const [circle, setCircle] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: c } = await supabase.from('circles').select('*').eq('id', params.id).single();
      setCircle(c);
      const { data: s } = await supabase.from('students').select('*').eq('circle_id', params.id);
      setStudents(s || []);
      setLoading(false);
    };
    fetch();
  }, [params.id]);

  const copyMsg = (name: string) => {
    const msg = `الأخ ولي أمر الطالب ${name}، نحيطكم علماً بغيابه ليومنا هذا من مركز معاوية لتحفيظ القرآن الكريم. نرجو الاهتمام بالحضور.`;
    navigator.clipboard.writeText(msg);
    alert("تم نسخ رسالة الغياب");
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-gold font-bold">جاري فتح الحلقة...</div>;

  return (
    <div className="p-4 md:p-10 w-full max-w-6xl mx-auto text-right font-['Tajawal']" dir="rtl">
      <header className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-6">
        <a href="/dashboard/circles" className="p-2 bg-zinc-900 rounded-xl text-gold"><ArrowRight/></a>
        <h1 className="text-2xl font-black text-white">{circle?.name}</h1>
      </header>

      <div className="space-y-6">
        {students.map((s) => (
          <div key={s.id} className="bg-zinc-950 border border-zinc-800 p-6 rounded-[2.5rem] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-gold underline decoration-gold/20 underline-offset-8">{s.name}</h3>
              <button onClick={() => copyMsg(s.name)} className="p-3 bg-gold/5 text-gold rounded-2xl border border-gold/10 hover:bg-gold hover:text-black transition-all"><MessageCircle size={20}/></button>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button className="bg-green-500/10 text-green-500 py-3 rounded-2xl border border-green-500/20 text-xs font-black"><Check size={14} className="inline ml-1"/> حاضر</button>
              <button className="bg-red-500/10 text-red-500 py-3 rounded-2xl border border-red-500/20 text-xs font-black"><X size={14} className="inline ml-1"/> غائب</button>
              <button className="bg-blue-500/10 text-blue-500 py-3 rounded-2xl border border-blue-500/20 text-xs font-black"><Clock size={14} className="inline ml-1"/> مستأذن</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/50 p-4 rounded-2xl border border-zinc-900">
               <div>
                  <p className="text-zinc-600 text-[10px] font-black mb-2 mr-2">سجل الحفظ (جزء/ص/آية)</p>
                  <div className="flex gap-2">
                     <input type="number" placeholder="جزء" className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-center text-white" />
                     <input type="number" placeholder="ص" className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-center text-white" />
                     <input type="number" placeholder="آية" className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-center text-white" />
                  </div>
               </div>
               <div>
                  <p className="text-zinc-600 text-[10px] font-black mb-2 mr-2">سجل المراجعة</p>
                  <div className="flex gap-2">
                     <input type="number" placeholder="جزء" className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-center text-white" />
                     <input type="number" placeholder="ص" className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-center text-white" />
                  </div>
               </div>
            </div>
            <button className="w-full mt-4 bg-gold text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"><Save size={18}/> حفظ البيانات</button>
          </div>
        ))}
      </div>
    </div>
  );
}
