"use client";
import React from 'react';
import { LayoutDashboard, Users, GraduationCap, UserCog, LogOut, X, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Sidebar({ profile, isOpen, onClose }: { profile: any, isOpen: boolean, onClose: () => void }) {
  const menuItems = [
    { name: 'اللوحة الرئيسية', icon: <LayoutDashboard size={20}/>, path: '/dashboard' },
    { name: 'إدارة الحلقات', icon: <GraduationCap size={20}/>, path: '/dashboard/circles' },
    { name: 'شؤون الطلاب', icon: <Users size={20}/>, path: '/dashboard/students' },
    { name: 'لوحة الشرف', icon: <Trophy size={20}/>, path: '/dashboard/honor-roll' },
    { name: 'المساعد الذكي', icon: <Sparkles size={20}/>, path: '/dashboard/ai-assistant' },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={onClose}></div>}
      <div className={`fixed md:static inset-y-0 right-0 w-72 bg-[#0A0A0A] border-l border-zinc-800/50 p-6 flex flex-col z-50 transition-all duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 shadow-2xl`}>
        <div className="flex flex-col items-center mb-10 pt-4">
          <img src="/logo-center.png" className="w-20 h-20 mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          <h2 className="text-gold font-black text-sm text-center leading-tight">مركز معاوية لتحفيظ القرآن الكريم وعلومه</h2>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <a key={item.name} href={item.path} className="flex items-center gap-4 p-4 text-zinc-400 hover:bg-gold/5 hover:text-gold rounded-2xl transition-all duration-300 font-bold text-[13px] group border border-transparent hover:border-gold/10">
              <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
          
          {/* قسم الإدارة يظهر للمدير فقط */}
          {profile?.role === 'المدير العام' && (
            <a href="/dashboard/users" className="flex items-center gap-4 p-4 text-zinc-400 hover:bg-gold/5 hover:text-gold rounded-2xl transition-all duration-300 font-bold text-[13px] group border border-transparent hover:border-gold/10 mt-4 pt-4 border-t border-zinc-800/50">
              <UserCog size={20} className="text-gold" />
              <span>إدارة المستخدمين</span>
            </a>
          )}
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-800/50">
          <div className="bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50 mb-4">
            <p className="text-white text-xs font-black mb-1">{profile?.display_name}</p>
            <div className="flex items-center gap-2">
               <ShieldCheck size={10} className="text-gold" />
               <span className="text-[9px] text-gold font-bold uppercase tracking-widest">{profile?.role}</span>
            </div>
          </div>
          <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/login')} className="w-full flex items-center justify-center gap-3 p-4 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 font-black text-xs">
            <LogOut size={18}/> <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </>
  );
}
