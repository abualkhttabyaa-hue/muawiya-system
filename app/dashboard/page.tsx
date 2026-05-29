"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
    };
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-gold">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8" dir="rtl">
      <nav className="flex justify-between items-center border-b border-zinc-800 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gold">لوحة تحكم مركز معاوية</h1>
          <p className="text-zinc-500 text-sm">أهلاً بك، {user.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-900/20 text-red-500 px-4 py-2 rounded-lg border border-red-900/50 hover:bg-red-500 hover:text-white transition"
        >
          تسجيل الخروج
        </button>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl text-center">
          <h3 className="text-zinc-500 mb-2">إجمالي الحلقات</h3>
          <p className="text-4xl font-black text-gold">0</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl text-center">
          <h3 className="text-zinc-500 mb-2">عدد الطلاب</h3>
          <p className="text-4xl font-black text-gold">0</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl text-center">
          <h3 className="text-zinc-500 mb-2">المعلمون النشطون</h3>
          <p className="text-4xl font-black text-gold">1</p>
        </div>
      </div>

      <div className="mt-10 bg-zinc-900/30 border border-gold/10 p-10 rounded-3xl text-center">
        <p className="text-zinc-400">نظام الإدارة قيد التفعيل.. سيتم إضافة ميزة "الرول" والحلقات في الخطوة التالية.</p>
      </div>
    </div>
  );
}
