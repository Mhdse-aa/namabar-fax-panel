import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const links = [
    { name: 'پیشخوان', to: '/dashboard', icon: '🏠' },
    { name: 'فکس‌های دریافتی', to: '/faxes/inbox', icon: '📥' },
    { name: 'فکس‌های ارسالی', to: '/faxes/sent', icon: '📤' },
    { name: 'ارسال فکس', to: '/faxes/send', icon: '📝' },
    { name: 'حساب من', to: '/profile', icon: '👤' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src="/logo.png" alt="نمابر" />
        <span>نمابر</span>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink 
            key={link.to} 
            to={link.to} 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="icon">{link.icon}</span>
            <span className="text">{link.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn">خروج</button>
      </div>
    </aside>
  );
}
