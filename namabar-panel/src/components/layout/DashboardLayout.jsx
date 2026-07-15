import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <header className="main-header">
        <div className="header-brand">نمابر</div>
        <div className="header-user">{user?.mobile || 'کاربر مهمان'}</div>
      </header>

      <div className="content-wrapper">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <NavLink to="/dashboard" className="nav-item">
              پیشخوان
            </NavLink>
            <NavLink to="/faxes/inbox" className="nav-item">
              فکس‌های دریافتی
            </NavLink>
            <NavLink to="/faxes/sent" className="nav-item">
              فکس‌های ارسالی
            </NavLink>
            <NavLink to="/faxes/send" className="nav-item">
              ارسال فکس
            </NavLink>
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            خروج
          </button>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
