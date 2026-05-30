import { createClient } from '@supabase/supabase-js';

// قراءة متغيرات البيئة الخاصة بـ Supabase من نظام الرفع
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// التحقق من وجود المتغيرات لتجنب انهيار التطبيق أثناء البناء
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('تنبيه: مفاتيح اتصال Supabase غير مضافة في إعدادات البيئة (Environment Variables).');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
