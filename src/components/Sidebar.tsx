"use client";
import React from 'react';
import { LayoutDashboard, Users, GraduationCap, ClipboardCheck, FileBarChart, UserCog, LogOut, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Sidebar({ userRole, isOpen, onClose }: { userRole: string, isOpen: boolean, onClose: () => void }) {
  const menuItems = [
    { name: 'اللوحة الرئيسية', icon: <LayoutDashboard size={20}/>, path: '/dashboard' },
    { name: 'إدارة الحلقات', icon: <GraduationCap size={20}/>, path: '/dashboard/circles' },
    { name: 'شؤون الطلاب', icon: <Users size={20}/>, path: '/dashboard/students' },
    { name: 'التقارير والتحليل', icon: <FileBarChart size={20}/>, path: '/dashboard/reports' },
  ];

  if (userRole === 'المدير العام') {
    menuItems.push({ name: 'إدارة المستخدمين', icon: <UserCog size={20}/>, path: '/dashboard/users' });
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={onClose}></div>}
      <div className={`fixed md:static inset-y-0 right-0 w-64 bg-zinc-950 border-l border-zinc-800 p-4 flex flex-col z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}>
        <div className="flex justify-between items-center mb-10 pt-4">
          <div className="text-center flex-1">
            <img src="/logo-center.png" className="w-16 h-16 mx-auto mb-2 shadow-2xl" />
            <h2 className="text-gold font-black text-xs">نظام معاوية التعليمي</h2>
          </div>
          <button onClick={onClose} className="md:hidden text-zinc-400 p-2"><X size={24}/></button>
        </div>
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <a key={item.name} href={item.path} className="flex items-center gap-3 p-3 text-zinc-400 hover:bg-gold/10 hover:text-gold rounded-xl transition font-bold text-sm">
              {item.icon} <span>{item.name}</span>
            </a>
          ))}
        </nav>
        <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/login')} className="mt-auto flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition font-bold">
          <LogOut size={20}/> <span>خروج</span>
        </button>
      </div>
    </>
  );
}
