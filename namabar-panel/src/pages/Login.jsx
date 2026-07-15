import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// فرض بر این است که آیکون‌ها را دارید یا از یک کتابخانه مثل react-icons استفاده می‌کنید
// در اینجا از متن ساده یا اموجی برای شبیه‌سازی آیکون اسکرین‌شات استفاده شده است

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login({ mobile: mobile.trim(), password });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      // پیامی که در اسکرین‌شات بود: "توکن استفاده از وب سرویس معتبر نمی باشد با پشتیبانی تماس بگیرید"
      setError(err.response?.data?.message || 'خطا در برقراری ارتباط با سرور');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          ورود به پنل نمابر
        </div>

        <div style={styles.content}>
          {/* Error Alert */}
          {error && (
            <div style={styles.errorAlert}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Mobile Field */}
            <div style={styles.inputGroup}>
              <span style={styles.icon}>👤</span>
              <input
                style={styles.input}
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="09999999999"
                required
              />
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup}>
              <span style={styles.icon}>🔒</span>
              <input
                style={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Footer Actions */}
            <div style={styles.footer}>
              <button type="submit" disabled={loading} style={styles.loginButton}>
                {loading ? 'در حال ورود...' : 'ورود به حساب'}
              </button>
              <a href="/register" style={styles.registerLink}>ثبت‌نام کاربر جدید</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    direction: 'rtl',
    fontFamily: 'Tahoma, Arial, sans-serif',
  },
  card: {
    width: '450px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#1e2d42',
    color: '#fff',
    padding: '15px',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  content: {
    padding: '20px 30px',
  },
  errorAlert: {
    backgroundColor: '#fff0f2',
    color: '#d93025',
    border: '1px solid #ffdadd',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '13px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
    marginBottom: '25px',
    padding: '5px 0',
  },
  input: {
    border: 'none',
    outline: 'none',
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    textAlign: 'left', // طبق اسکرین‌شات شماره‌ها چپ‌چین هستند
    color: '#555',
  },
  icon: {
    marginLeft: '10px',
    color: '#999',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  loginButton: {
    backgroundColor: '#1e2d42',
    color: '#fff',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  registerLink: {
    color: '#888',
    textDecoration: 'none',
    fontSize: '13px',
  }
};

export default Login;
