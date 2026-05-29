"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { GraduationCap, Plus, User, Trash2, ArrowLeft, Users } from "lucide-react";

export default function CirclesPage() {
  const [profile, setProfile] = useState<any>(null);
  const [circles, setCircles] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // بيانات النموذج
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
      setLoading(false);
    };
    getData();
  }, []);

  const addCircle = async () => {
    if(!name || !teacherId) return alert("يرجى إدخال اسم الحلقة واختيار المدرس");
    const { error } = await supabase.from('circles').insert([{ name, teacher_id: teacherId }]);
    if (error) alert(error.message);
    else window.location.reload();
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-gold font-black italic">جاري تحميل الحلقات...</div>;

  return (
    <div className="p-4 md:p-10 w-full max-w-7xl mx-auto text-right font-['Tajawal']" dir="rtl">
      {/* رأس الصفحة مع الشعار بالحجم المطلوب */}
      <header className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">إدارة الحلقات</h1>
          <p className="text-zinc-500 text-sm font-bold">إنشاء وتوزيع المدرسين على الحلقات</p>
        </div>
        <img src="/logo-center.png" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
      </header>

      {/* نموذج الإضافة للمدير فقط */}
      {profile?.role === 'المدير العام' && (
        <div className="bg-[#0A0A0A] border border-gold/10 p-6 rounded-[2rem] mb-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl -mr-16 -mt-16"></div>
          <h3 className="text-lg font-black text-gold mb-6 flex items-center gap-2"><Plus size={18}/> إضافة حلقة تعليمية جديدة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              placeholder="اسم الحلقة (مثال: حلقة عثمان بن عفان)" 
              className="bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-gold transition-all"
              onChange={e => setName(e.target.value)}
            />
            <select 
              className="bg-black border border-zinc-800 p-4 rounded-2xl text-zinc-400 outline-none focus:border-gold transition-all font-bold"
              onChange={e => setTeacherId(e.target.value)}
            >
              <option value="">اختر المدرس المسؤول</option>
              {teachers.map(t => <option key={t.id} value={t.id}>{t.display_name}</option>)}
            </select>
            <button 
              onClick={addCircle}
              className="bg-gold hover:bg-white text-black font-black py-4 rounded-2xl shadow-lg transition-all duration-300 transform active:scale-95"
            >
              اعتماد الحلقة
            </button>
          </div>
        </div>
      )}

      {/* قائمة الحلقات (البطاقات الملكية) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {circles.map(c => (
          <div key={c.id} className="bg-[#0A0A0A] border border-zinc-800 p-8 rounded-[2.5rem] relative group shadow-2xl transition-all duration-500 hover:border-gold/30">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-gold/5 rounded-2xl text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
                <GraduationCap size={28} />
              </div>
              {profile?.role === 'المدير العام' && (
                <button className="text-zinc-800 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
              )}
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{c.name}</h2>
            <div className="flex items-center gap-2 text-zinc-500 font-bold text-xs mb-8">
              <User size={14} className="text-gold" />
              <span>المدرس: {c.profiles?.display_name || "لم يتم التعيين"}</span>
            </div>
            
            <a 
              href={`/dashboard/circles/${c.id}`}
              className="flex items-center justify-center gap-2 w-full bg-zinc-900 border border-zinc-800 hover:border-gold/50 text-white py-4 rounded-2xl font-black text-xs transition-all duration-300"
            >
              <Users size={16} />
              إدارة طلاب الحلقة
              <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
