import useAuth from '../../hooks/useAuth';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar__title">نمابر</div>
      <button className="btn btn--outline" onClick={logout}>
        خروج
      </button>
    </header>
  );
}
