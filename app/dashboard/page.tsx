"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/login";
      } else {
        setUserEmail(session.user.email || "");
      }
    };
    checkUser();
  }, []);

  if (!userEmail) return <div className="min-h-screen bg-black text-gold flex items-center justify-center">جاري فتح النظام...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 text-right font-['Tajawal']" dir="rtl">
      <div className="border-b border-zinc-800 pb-4 mb-8">
        <h1 className="text-3xl font-black text-gold italic">لوحة التحكم الرئيسية</h1>
        <p className="text-zinc-400">مرحباً بك: {userEmail}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-zinc-900 p-10 rounded-3xl border border-gold/20 text-center shadow-2xl">
          <h2 className="text-2xl text-gold font-bold mb-4 font-['Tajawal']">تهانينا! لقد كسرنا حلقة التعليق</h2>
          <p className="text-zinc-300 leading-relaxed">
            أنت الآن داخل النظام رسمياً. هذا يعني أن الربط مع قاعدة البيانات سليم.
            <br/><br/>
            الآن سأقوم بتزويدك بالأكواد "الحقيقية" لإدارة الحلقات والطلاب والتحليلات.
          </p>
        </div>
      </div>
      
      <button onClick={() => supabase.auth.signOut().then(() => window.location.href = "/login")} className="mt-10 text-zinc-600 text-sm underline">تسجيل الخروج</button>
    </div>
  );
}
