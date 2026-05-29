"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import { GraduationCap, TrendingUp, Bell, Users, LayoutDashboard, Menu } from "lucide-react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [circles, setCircles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = "/login"; return; }

      const { data: prof } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      setProfile(prof);

      let query = supabase.from('circles').select('*, profiles(display_name)');
      if (prof?.role !== 'المدير العام') {
        query = query.eq('teacher_id', session.user.id);
      }
      const { data: circs } = await query;
      setCircles(circs || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gold mt-4 font-bold animate-pulse text-sm">جاري تحميل البيانات...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex" dir="rtl">
      {/* القائمة الجانبية */}
      <Sidebar userRole={profile?.role} />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* الهيدر للهاتف والكمبيوتر */}
        <header className="flex justify-between items-center mb-8">
          <div className="md:hidden p-2 bg-zinc-900 rounded-lg text-gold"><Menu size={24}/></div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gold">اللوحة الرئيسية</h1>
            <p className="text-zinc-500 text-xs md:text-sm mt-1">مرحباً بك: {profile?.display_name || "المشرف العام"}</p>
          </div>
          <div className="flex gap-2 md:gap-4 items-center">
             <div className="hidden md:flex bg-zinc-900 p-2 rounded-full text-gold border border-gold/10"><Bell size={20}/></div>
             <div className="bg-gold/10 border border-gold/20 px-3 py-1 rounded-full hidden md:block">
                <span className="text-gold text-[10px] font-black uppercase">{profile?.role}</span>
             </div>
             <img src="/logo-center.png" className="w-10 h-10 rounded-full border-2 border-gold" />
          </div>
        </header>

        {/* كروت الإحصائيات الأربعة (كما في الصورة) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-zinc-900/60 border border-zinc-800 p-4 md:p-6 rounded-2xl flex justify-between items-center group hover:border-gold/30 transition duration-500">
            <div>
              <p className="text-zinc-500 text-[10px] md:text-xs mb-1 font-bold">إجمالي الطلاب</p>
              <p className="text-xl md:text-3xl font-black">0</p>
            </div>
            <div className="p-2 md:p-3 rounded-xl bg-zinc-800 text-yellow-500"><Users size={20}/></div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 p-4 md:p-6 rounded-2xl flex justify-between items-center hover:border-gold/30 transition duration-500">
            <div>
              <p className="text-zinc-500 text-[10px] md:text-xs mb-1 font-bold">الغائبون اليوم</p>
              <p className="text-xl md:text-3xl font-black text-red-500">0</p>
            </div>
            <div className="p-2 md:p-3 rounded-xl bg-zinc-800 text-red-500 font-bold text-xl leading-none">!</div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 p-4 md:p-6 rounded-2xl flex justify-between items-center hover:border-gold/30 transition duration-500">
            <div>
              <p className="text-zinc-500 text-[10px] md:text-xs mb-1 font-bold">تنبيهات الغياب</p>
              <p className="text-xl md:text-3xl font-black text-orange-500">0</p>
            </div>
            <div className="p-2 md:p-3 rounded-xl bg-zinc-800 text-orange-500"><Bell size={20}/></div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 p-4 md:p-6 rounded-2xl flex justify-between items-center hover:border-gold/30 transition duration-500">
            <div>
              <p className="text-zinc-500 text-[10px] md:text-xs mb-1 font-bold">الحاضرون اليوم</p>
              <p className="text-xl md:text-3xl font-black text-green-500">0</p>
            </div>
            <div className="p-2 md:p-3 rounded-xl bg-zinc-800 text-green-500"><Users size={20}/></div>
          </div>
        </div>

        {/* قسم الرول للحلقات (Carousel) */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <GraduationCap className="text-gold" /> قائمة الحلقات
            </h2>
            <a href="/dashboard/circles" className="text-xs text-gold underline">إدارة الكل</a>
          </div>
          
          <div className="flex overflow-x-auto gap-4 pb-6 snap-x no-scrollbar">
            {circles.length === 0 ? (
              <div className="bg-zinc-900/40 border-2 border-dashed border-zinc-800 p-10 rounded-3xl w-full text-center text-zinc-500 text-sm">
                لا توجد حلقات نشطة حالياً. ابدأ بإضافة حلقة من قسم الإدارة.
              </div>
            ) : (
              circles.map((c) => (
                <div key={c.id} className="min-w-[280px] snap-center bg-zinc-900/80 border border-zinc-800 p-6 rounded-[2.5rem] hover:border-gold/40 transition duration-500 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-gold/10 transition duration-500"></div>
                  <h3 className="text-xl font-black text-gold mb-1">{c.name}</h3>
                  <p className="text-zinc-500 text-[10px] mb-6">المدرس: {c.profiles?.display_name || "غير معين"}</p>
                  <div className="flex justify-between items-center">
                     <div>
                       <p className="text-zinc-600 text-[9px] font-bold uppercase">إجمالي الطلاب</p>
                       <p className="text-2xl font-black">0</p>
                     </div>
                     <button className="bg-gold hover:bg-white text-black px-6 py-2 rounded-2xl font-black text-[10px] transition duration-300">إدارة الحلقة</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* قسم اتجاه الأسبوع */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
            <TrendingUp className="text-gold" size={20}/>
            <h3 className="font-bold text-sm">اتجاه الأسبوع (معدل الحفظ)</h3>
          </div>
          <div className="h-32 flex items-end justify-between gap-1 px-2">
            {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
              <div key={i} className="w-full relative group">
                 <div style={{height: `${h}%`}} className="bg-gold/10 border-t-2 border-gold/30 rounded-t-lg group-hover:bg-gold/30 transition duration-300"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 px-2 text-[9px] text-zinc-600 font-bold uppercase">
             <span>السبت</span><span>الأحد</span><span>الاثنين</span><span>الثلاثاء</span><span>الأربعاء</span><span>الخميس</span><span>الجمعة</span>
          </div>
        </div>
      </main>
    </div>
  );
}
