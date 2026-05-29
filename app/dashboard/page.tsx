"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/login";
        return;
      }

      // جلب بياناتك من الجدول الذي أنشأناه يدوياً
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setProfile(data);
      } else {
        console.log("لم يتم العثور على ملف شخصي");
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gold font-bold animate-pulse">جاري فتح لوحة الإدارة...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 text-right font-['Tajawal']" dir="rtl">
      {/* رأس الصفحة (Header) */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gold">مركز معاوية - لوحة التحكم</h1>
          <p className="text-zinc-400 text-sm mt-1">مرحباً بك: {profile?.display_name || "المدير العام"}</p>
        </div>
        <div className="bg-gold/10 border border-gold/20 px-4 py-1 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.1)]">
          <span className="text-gold text-xs font-bold">{profile?.role || "مسؤول"}</span>
        </div>
      </div>

      {/* بطاقات الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-xl hover:border-gold/30 transition duration-500">
          <p className="text-zinc-500 text-xs mb-1 font-bold text-center uppercase">إجمالي الحلقات</p>
          <p className="text-4xl font-black text-gold text-center">0</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-xl hover:border-gold/30 transition duration-500">
          <p className="text-zinc-500 text-xs mb-1 font-bold text-center uppercase">عدد الطلاب</p>
          <p className="text-4xl font-black text-gold text-center">0</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-xl border-l-4 border-l-green-600">
          <p className="text-zinc-500 text-xs mb-1 font-bold text-center uppercase">حالة الاتصال</p>
          <p className="text-sm font-bold text-green-500 text-center mt-2">متصل بنجاح</p>
        </div>
      </div>

      {/* رسالة ترحيبية مركزية */}
      <div className="bg-zinc-900/40 border-2 border-dashed border-gold/10 p-12 rounded-[2rem] text-center backdrop-blur-sm shadow-2xl">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gold blur-2xl opacity-20 rounded-full"></div>
          <img src="/logo-center.png" className="relative w-24 h-24 mx-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
        </div>
        <h2 className="text-xl font-bold text-yellow-100 mb-2">نظام الإدارة الذكي جاهز</h2>
        <p className="text-zinc-400 max-w-md mx-auto leading-relaxed italic">
          تم التعرف على حسابك كمدير عام للمركز. يمكنك الآن البدء بإضافة الحلقات والمدرسين من القائمة التي سنقوم بتفعيلها في الخطوة التالية.
        </p>
      </div>

      {/* زر تسجيل الخروج للهواتف */}
      <div className="mt-8">
        <button 
          onClick={async () => { await supabase.auth.signOut(); window.location.href = "/login"; }}
          className="w-full py-3 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-xl font-bold hover:bg-red-950 hover:text-red-500 hover:border-red-900 transition duration-300"
        >
          تسجيل الخروج من النظام
        </button>
      </div>
    </div>
  );
}
