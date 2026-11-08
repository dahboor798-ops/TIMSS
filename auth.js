'use strict';
// ============================================================
// إدارة الجلسة — حفظ / قراءة / مسح + التحقق من الدور
// ============================================================

const SESSION_KEY = 'timss_session';

// صفحات كل دور بعد تسجيل الدخول الناجح
const ROLE_HOME = {
  student:    'student.html',
  teacher:    'teacher.html',
  supervisor: 'supervisor.html'
};

// ------------------------------------------------------------
// حفظ الجلسة
// ------------------------------------------------------------
function saveSession(role, data) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      role: role,
      data: data,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.error('saveSession error:', e);
  }
}

// ------------------------------------------------------------
// قراءة الجلسة
// ------------------------------------------------------------
function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (!s || !s.role || !s.data) return null;
    return s;
  } catch (e) {
    return null;
  }
}

// ------------------------------------------------------------
// مسح الجلسة
// ------------------------------------------------------------
function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
}

// ------------------------------------------------------------
// الصفحة الرئيسية للدور
// ------------------------------------------------------------
function getRoleHome(role) {
  return ROLE_HOME[role] || 'index.html';
}

// ------------------------------------------------------------
// حماية الصفحات
// ------------------------------------------------------------

// يتطلب تسجيل دخول فقط (أي دور)
function requireAuth() {
  const s = getSession();
  if (!s) {
    window.location.replace('index.html');
    return null;
  }
  return s;
}

// يتطلب دوراً محدداً (student / teacher / supervisor)
function requireRole(role) {
  const s = getSession();
  if (!s) { window.location.replace('index.html'); return null; }
  
  const allowed = Array.isArray(role) ? role : [role];
  if (!allowed.includes(s.role)) {
    window.location.replace(getRoleHome(s.role));
    return null;
  }
  return s;
}
// إذا كان المستخدم مسجلاً بالفعل — وجّهه لصفحته (تُستخدم في index.html فقط)
function redirectIfLoggedIn() {
  const s = getSession();
  if (s) {
    window.location.replace(getRoleHome(s.role));
  }
}

// ------------------------------------------------------------
// تسجيل الخروج
// ------------------------------------------------------------
function logout() {
  if (!confirm('هل تريد تسجيل الخروج؟')) return;
  localStorage.clear();
  sessionStorage.clear();
  window.location.replace('index.html');
}
// ------------------------------------------------------------
// رجوع ذكي — يرجع للصفحة السابقة أو لصفحة الدور الحالي
// ------------------------------------------------------------
function navBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    const s = getSession();
    window.location.href = s ? getRoleHome(s.role) : 'index.html';
  }
}
