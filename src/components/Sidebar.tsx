"use client";
import React from 'react';
import { LayoutDashboard, Users, GraduationCap, ClipboardCheck, FileBarChart, UserCog, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Sidebar({ userRole }: { userRole: string }) {
  const menuItems = [
    { name: 'اللوحة الرئيسية', icon: <LayoutDashboard size={20}/>, path: '/dashboard' },
    { name: 'إدارة الحلقات', icon: <GraduationCap size={20}/>, path: '/dashboard/circles' },
    { name: 'شؤون الطلاب', icon: <Users size={20}/>, path: '/dashboard/students' },
    { name: 'سجل الحضور', icon: <ClipboardCheck size={20}/>, path: '/dashboard/attendance' },
    { name: 'التقارير والتحليل', icon: <FileBarChart size={20}/>, path: '/dashboard/reports' },
  ];

  if (userRole === 'المدير العام') {
    menuItems.push({ name: 'إدارة المستخدمين', icon: <UserCog size={20}/>, path: '/dashboard/users' });
  }

  return (
    <div className="w-64 min-h-screen bg-zinc-950 border-l border-zinc-800 p-4 flex flex-col hidden md:flex">
      <div className="mb-10 text-center pt-4">
        <img src="/logo-center.png" className="w-20 h-20 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
        <h2 className="text-gold font-black text-sm tracking-widest">نظام معاوية الذكي</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <a key={item.name} href={item.path} className="flex items-center gap-3 p-3 text-zinc-400 hover:bg-gold/5 hover:text-gold rounded-xl transition duration-300 group">
            <div className="group-hover:scale-110 transition-transform">{item.icon}</div>
            <span className="font-bold text-sm">{item.name}</span>
          </a>
        ))}
      </nav>

      <button 
        onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login'; }}
        className="mt-auto flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition duration-300"
      >
        <LogOut size={20}/>
        <span className="font-bold text-sm">تسجيل الخروج</span>
      </button>
    </div>
  );
}
