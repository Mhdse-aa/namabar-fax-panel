import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Inbox from '../pages/Inbox';
import Outbox from '../pages/Outbox';
import SendFax from '../pages/SendFax';


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faxes/inbox" element={<Inbox />} /> {/* مسیر دریافتی */}
        <Route path="/faxes/sent" element={<Outbox />} />   {/* مسیر ارسالی */}
        <Route path="/faxes/send" element={<SendFax />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
