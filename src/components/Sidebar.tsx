"use client";
import React from 'react';
import { LayoutDashboard, Users, GraduationCap, FileBarChart, UserCog, LogOut, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Sidebar({ profile, isOpen, onClose }: any) {
  const menu = [
    { name: 'الرئيسية', icon: <LayoutDashboard size={20}/>, path: '/dashboard' },
    { name: 'الحلقات', icon: <GraduationCap size={20}/>, path: '/dashboard/circles' },
    { name: 'الطلاب', icon: <Users size={20}/>, path: '/dashboard/students' },
    { name: 'التقارير', icon: <FileBarChart size={20}/>, path: '/dashboard/reports' },
  ];
  if (profile?.role === 'المدير العام') menu.push({ name: 'المستخدمين', icon: <UserCog size={20}/>, path: '/dashboard/users' });

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={onClose}></div>}
      <div className={`fixed md:static inset-y-0 right-0 w-64 bg-zinc-950 border-l border-zinc-800 p-6 flex flex-col z-50 transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}>
        <img src="/logo-center.png" className="w-20 h-20 mx-auto mb-6" />
        <nav className="flex-1 space-y-2">
          {menu.map((i) => (
            <a key={i.name} href={i.path} className="flex items-center gap-3 p-3 text-zinc-400 hover:text-gold font-bold text-sm italic">
              {i.icon} <span>{i.name}</span>
            </a>
          ))}
        </nav>
        <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/login')} className="p-4 text-red-500 font-bold flex gap-2"><LogOut/> خروج</button>
      </div>
    </>
  );
}
