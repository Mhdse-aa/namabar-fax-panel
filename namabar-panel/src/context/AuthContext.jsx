import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { authApi } from '../api/auth.api';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });

  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials) => {
    setLoading(true);

    try {
        const data = await authApi.createSession(credentials);
        const receivedToken = data?.value?.jwt_token;

        if (!receivedToken) {
        throw new Error(
            data?.message || 'توکن ورود در پاسخ سرور پیدا نشد.'
        );
        }

        localStorage.setItem('token', receivedToken);
        setToken(receivedToken);

        return data;
    } catch (error) {
        const message =
        error.response?.data?.errors?.[0]?.message ??
        error.response?.data?.message ??
        error.message ??
        'ورود ناموفق بود.';

        console.error('Login failed:', message);
        throw new Error(message);
    } finally {
        setLoading(false);
    }
    }, []);



  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      token,
      loading,
      login,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [token, loading, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
