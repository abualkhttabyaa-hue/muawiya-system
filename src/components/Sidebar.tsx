"use client";
import React from 'react';
import { LayoutDashboard, Users, GraduationCap, FileBarChart, UserCog, LogOut, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Sidebar({ profile, isOpen, onClose }: any) {
  const menu = [
    { name: 'اللوحة الرئيسية', icon: <LayoutDashboard size={20}/>, path: '/dashboard' },
    { name: 'إدارة الحلقات', icon: <GraduationCap size={20}/>, path: '/dashboard/circles' },
    { name: 'شؤون الطلاب', icon: <Users size={20}/>, path: '/dashboard/students' },
    { name: 'التقارير والتحليل', icon: <FileBarChart size={20}/>, path: '/dashboard/reports' },
  ];

  if (profile?.role === 'المدير العام') {
    menu.push({ name: 'إدارة المستخدمين', icon: <UserCog size={20}/>, path: '/dashboard/users' });
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={onClose}></div>}
      <div className={`fixed md:static inset-y-0 right-0 w-64 bg-zinc-950 border-l border-zinc-800 p-6 flex flex-col z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 shadow-2xl`}>
        <div className="text-center mb-10 pt-4">
          <img src="/logo-center.png" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-gold font-black text-sm uppercase tracking-tighter leading-tight">مركز معاوية لتحفيظ القرآن الكريم</h2>
        </div>
        <nav className="flex-1 space-y-2">
          {menu.map((item) => (
            <a key={item.name} href={item.path} className="flex items-center gap-4 p-4 text-zinc-400 hover:bg-gold/5 hover:text-gold rounded-2xl transition font-bold text-sm group">
              {item.icon} <span>{item.name}</span>
            </a>
          ))}
        </nav>
        <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/login')} className="mt-auto flex items-center gap-3 p-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition font-bold text-sm">
          <LogOut size={18}/> <span>تسجيل الخروج</span>
        </button>
      </div>
    </>
  );
}
