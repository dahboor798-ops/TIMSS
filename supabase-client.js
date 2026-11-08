'use strict';
// ============================================================
// تهيئة Supabase — يُحمَّل بعد مكتبة supabase-js
// ============================================================

const SUPABASE_URL = 'https://gdzdfrojugjxkrzffcwg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_cynSZEYXV6I4vENLFImTxQ_Gz6L7W1N';

// التحقق من تحميل المكتبة
if (typeof supabase === 'undefined') {
  console.error('❌ مكتبة supabase-js لم تُحمَّل — تحقق من الاتصال بالإنترنت');
  alert('تعذر تحميل مكتبة Supabase.\nتأكد من اتصالك بالإنترنت ثم أعد تحميل الصفحة.');
  throw new Error('Supabase library not loaded');
}

// إنشاء العميل وتعريفه عالمياً بشكل صريح
window.db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_KEY = SUPABASE_KEY;

console.log('✅ Supabase client ready:', window.db ? 'OK' : 'FAILED');