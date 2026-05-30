"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../src/lib/supabase";
import { UserPlus, Check, X, Clock, MessageCircle, ArrowRight, Save, BookOpen } from "lucide-react";

export default function CircleDetails({ params }: { params: { id: string } }) {
  const [circle, setCircles] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: circ } = await supabase.from('circles').select('*').eq('id', params.id).single();
    setCircles(circ);
    const { data: stds } = await supabase.from('students').select('*').eq('circle_id', params.id);
    setStudents(stds || []);
    setLoading(false);
  };

  const addStudent = async () => {
    if (!newStudentName) return;
    await supabase.from('students').insert([{ name: newStudentName, circle_id: params.id }]);
    setNewStudentName("");
    setShowAddStudent(false);
    fetchData();
  };

  const generateSMS = (name: string, days: number) => {
    let msg = `الأخ ولي أمر الطالب ${name}، نحيطكم علماً بغيابه `;
    msg += days >= 2 ? "أمس واليوم. " : "ليومنا هذا. ";
    if (days >= 3) msg += `علماً أن لديه ${days} أيام غياب هذا الشهر. `;
    msg += "نرجو الاهتمام بالحضور.\nمركز معاوية لتحفيظ القرآن الكريم";
    navigator.clipboard.writeText(msg);
    alert("تم نسخ الرسالة لواتساب ولي الأمر");
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-gold font-black">جاري تحميل طلاب الحلقة...</div>;

  return (
    <div className="p-4 md:p-10 w-full max-w-6xl mx-auto text-right font-['Tajawal']" dir="rtl">
      <header className="flex justify-between items-center mb-8">
        <a href="/dashboard/circles" className="p-2 bg-zinc-900 rounded-xl text-gold border border-zinc-800"><ArrowRight/></a>
        <div className="text-right">
          <h1 className="text-2xl font-black text-white">{circle?.name}</h1>
          <p className="text-gold text-xs font-bold">إدارة سجلات الحفظ والحضور</p>
        </div>
      </header>

      {/* زر إضافة طالب سريع */}
      <button onClick={() => setShowAddStudent(!showAddStudent)} className="w-full mb-6 bg-gold/10 border border-gold/20 p-4 rounded-2xl text-gold font-black flex items-center justify-center gap-3">
        <UserPlus size={20}/> إضافة طالب جديد لهذه الحلقة
      </button>

      {showAddStudent && (
        <div className="bg-zinc-900 p-4 rounded-2xl mb-6 border border-gold/30">
          <input placeholder="اسم الطالب الرباعي" className="w-full bg-black p-3 rounded-xl border border-zinc-800 text-white mb-3" onChange={e => setNewStudentName(e.target.value)} />
          <button onClick={addStudent} className="w-full bg-gold text-black font-black py-2 rounded-xl">حفظ الطالب</button>
        </div>
      )}

      {/* قائمة الطلاب */}
      <div className="space-y-4">
        {students.map((student) => (
          <div key={student.id} className="bg-[#0A0A0A] border border-zinc-800 p-6 rounded-[2rem] shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-white">{student.name}</h3>
              <div className="flex gap-2">
                 <button onClick={() => generateSMS(student.name, 1)} className="p-2 bg-zinc-900 text-zinc-400 rounded-lg"><MessageCircle size={18}/></button>
              </div>
            </div>

            {/* أزرار الحضور السريع */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <button className="bg-green-500/10 text-green-500 py-2 rounded-xl border border-green-500/20 text-xs font-bold flex items-center justify-center gap-1"><Check size={14}/> حاضر</button>
              <button className="bg-red-500/10 text-red-500 py-2 rounded-xl border border-red-500/20 text-xs font-bold flex items-center justify-center gap-1"><X size={14}/> غائب</button>
              <button className="bg-blue-500/10 text-blue-500 py-2 rounded-xl border border-blue-500/20 text-xs font-bold flex items-center justify-center gap-1"><Clock size={14}/> مستأذن</button>
            </div>

            {/* خانات الحفظ والمراجعة الرقمية */}
            <div className="space-y-3 bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800">
               <div className="flex items-center gap-2 text-gold mb-2 text-xs font-bold"><BookOpen size={14}/> سجل الحفظ اليومي</div>
               <div className="grid grid-cols-3 gap-2">
                  <input type="number" placeholder="جزء" className="bg-black border border-zinc-800 p-2 rounded-lg text-center text-xs text-white" />
                  <input type="number" placeholder="من ص" className="bg-black border border-zinc-800 p-2 rounded-lg text-center text-xs text-white" />
                  <input type="number" placeholder="إلى ص" className="bg-black border border-zinc-800 p-2 rounded-lg text-center text-xs text-white" />
               </div>
               <button className="w-full mt-2 bg-zinc-800 hover:bg-gold hover:text-black py-2 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2">
                 <Save size={12}/> حفظ سجل الطالب
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
