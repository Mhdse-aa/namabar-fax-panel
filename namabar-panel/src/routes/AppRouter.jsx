import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Inbox from '../pages/Inbox';
import Outbox from '../pages/Outbox';
import SendFax from '../pages/SendFax';

export default function AppRouter() {
  // گرفتن توکن برای استفاده در شرط‌ها
  const token = localStorage.getItem('token');

  return (
    <Routes>
      {/* 
        اگر کاربر توکن داشت و خواست به ریشه (/) برود، برود داشبورد.
        در غیر این صورت برود به لاگین.
      */}
      <Route 
        path="/" 
        element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />

      {/* 
        صفحه لاگین: اگر کاربر از قبل لاگین است، نباید دوباره لاگین ببیند.
      */}
      <Route 
        path="/login" 
        element={token ? <Navigate to="/dashboard" replace /> : <Login />} 
      />

      {/* روت‌های محافظت شده داخل داشبورد */}
      <Route element={token ? <DashboardLayout /> : <Navigate to="/login" replace />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faxes/inbox" element={<Inbox />} />
        <Route path="/faxes/sent" element={<Outbox />} />
        <Route path="/faxes/send" element={<SendFax />} />
      </Route>

      {/* هر مسیر ناشناخته‌ای کاربر را به جای مناسب هدایت کند */}
      <Route 
        path="*" 
        element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />
    </Routes>
  );
}
