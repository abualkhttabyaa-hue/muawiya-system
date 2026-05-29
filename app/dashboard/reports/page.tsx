"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import { MessageSquare, Share2 } from "lucide-react";

export default function ReportsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await supabase.from('students').select('*');
      setStudents(data || []);
    };
    fetchStudents();
  }, []);

  const generateMsg = (name: string, days: number) => {
    let base = `الأخ ولي أمر الطالب ${name}، نحيطكم علماً بغياب الطالب ${name} `;
    if (days === 1) base += "ليومنا هذا.";
    else if (days === 2) base += "لأمس واليوم.";
    else base += `لمدة ${days} أيام هذا الشهر.`;
    base += "\nنرجو الاهتمام بالحضور لضمان مستوى الحفظ.\nمركز معاوية لتحفيظ القرآن الكريم";
    return base;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("تم نسخ نص الرسالة! يمكنك الآن لصقها في واتساب ولي الأمر.");
  };

  return (
    <div className="min-h-screen bg-black text-white flex" dir="rtl">
      <Sidebar userRole="المدير العام" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-black text-gold mb-8 italic">مركز المتابعة والرسائل</h1>
        <div className="grid gap-4">
          {students.map(s => (
            <div key={s.id} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-yellow-100">{s.name}</h3>
                <p className="text-xs text-zinc-500">رقم ولي الأمر: {s.parent_phone}</p>
              </div>
              <button onClick={() => copyToClipboard(generateMsg(s.name, 1))} className="bg-gold/10 text-gold p-3 rounded-2xl hover:bg-gold hover:text-black transition">
                <MessageSquare size={20}/>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
