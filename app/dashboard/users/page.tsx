"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle, XCircle, Shield, UserPlus } from "lucide-react";

export default function UsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    setUsers(data || []);
    setLoading(false);
  };

  const updateStatus = async (userId: string, approved: boolean, role: string) => {
    const { error } = await supabase.from('profiles').update({ is_approved: approved, role: role }).eq('id', userId);
    if (!error) {
      alert("تم تحديث حالة المستخدم بنجاح");
      fetchUsers();
    }
  };

  return (
    <div className="p-4 md:p-10 w-full max-w-6xl mx-auto text-right" dir="rtl">
      <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3"><UserCog className="text-gold"/> إدارة المستخدمين</h1>
      <p className="text-zinc-500 mb-10 font-bold italic">التحكم في صلاحيات وقبول المدرسين والمدراء</p>

      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-zinc-950 border border-zinc-800 p-6 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${user.is_approved ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {user.display_name?.[0] || 'U'}
              </div>
              <div>
                <h3 className="font-black text-white text-lg">{user.display_name}</h3>
                <p className="text-zinc-500 text-xs">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {/* اختيار الرتبة */}
              <select 
                className="bg-zinc-900 border border-zinc-800 text-gold text-xs font-bold p-2 rounded-xl"
                value={user.role}
                onChange={(e) => updateStatus(user.id, user.is_approved, e.target.value)}
              >
                <option value="مدرس">مدرس</option>
                <option value="مشرف حلقات">مشرف حلقات</option>
                <option value="نائب مدير">نائب مدير</option>
                <option value="مدير مركز">مدير مركز</option>
                <option value="المدير العام">المدير العام</option>
              </select>

              {!user.is_approved ? (
                <button onClick={() => updateStatus(user.id, true, user.role)} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-xs">
                  <CheckCircle size={14}/> قبول الدخول
                </button>
              ) : (
                <button onClick={() => updateStatus(user.id, false, user.role)} className="flex items-center gap-2 bg-zinc-800 hover:bg-red-900/30 text-red-500 px-4 py-2 rounded-xl font-bold text-xs">
                  <XCircle size={14}/> إيقاف الحساب
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
