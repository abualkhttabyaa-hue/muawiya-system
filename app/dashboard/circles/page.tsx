"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import { Plus, GraduationCap, User, Trash2 } from "lucide-react";

export default function CirclesManager() {
  const [circles, setCircles] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [newCircleName, setNewCircleName] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // جلب الحلقات مع أسماء المدرسين
    const { data: circs } = await supabase.from('circles').select('*, profiles(display_name)');
    // جلب قائمة المدرسين لاختيار أحدهم للحلقة
    const { data: techs } = await supabase.from('profiles').select('id, display_name').filter('role', 'neq', 'المدير العام');
    
    setCircles(circs || []);
    setTeachers(techs || []);
    setLoading(false);
  };

  const handleAddCircle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCircleName || !selectedTeacher) return alert("يرجى إكمال البيانات");

    const { error } = await supabase.from('circles').insert([
      { name: newCircleName, teacher_id: selectedTeacher }
    ]);

    if (error) alert("خطأ: " + error.message);
    else {
      setNewCircleName("");
      fetchData();
      alert("تمت إضافة الحلقة بنجاح!");
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-gold">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex" dir="rtl">
      <Sidebar userRole="المدير العام" />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-black text-gold mb-8 flex items-center gap-3">
          <GraduationCap size={32} /> إدارة الحلقات
        </h1>

        {/* نموذج إضافة حلقة جديدة */}
        <div className="bg-zinc-900 border border-gold/20 p-6 rounded-3xl mb-10 shadow-2xl">
          <h2 className="text-lg font-bold mb-4 text-yellow-100 flex items-center gap-2">
            <Plus size={20} className="text-gold" /> إضافة حلقة جديدة
          </h2>
          <form onSubmit={handleAddCircle} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" placeholder="اسم الحلقة (مثلاً: حلقة البقرة)" 
              className="bg-black border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-gold"
              value={newCircleName} onChange={(e) => setNewCircleName(e.target.value)}
            />
            <select 
              className="bg-black border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-gold"
              value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">اختر المدرس</option>
              {teachers.map(t => <option key={t.id} value={t.id}>{t.display_name}</option>)}
            </select>
            <button type="submit" className="bg-gold text-black font-black py-3 rounded-xl hover:bg-white transition">
              حفظ الحلقة
            </button>
          </form>
        </div>

        {/* عرض قائمة الحلقات الحالية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {circles.map((c) => (
            <div key={c.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] relative overflow-hidden group transition hover:border-gold/30">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gold/10 p-3 rounded-2xl text-gold">
                   <GraduationCap size={24} />
                </div>
                <button className="text-zinc-700 hover:text-red-500 transition"><Trash2 size={18}/></button>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{c.name}</h3>
              <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
                <User size={14} />
                <span>المدرس: {c.profiles?.display_name || "غير محدد"}</span>
              </div>
              <button className="w-full bg-zinc-800 py-2 rounded-xl text-xs font-bold hover:bg-gold hover:text-black transition">عرض الطلاب والتحضير</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
