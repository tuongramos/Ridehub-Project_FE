import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{name: string, role: string, avatarUrl?: string} | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    window.addEventListener('user-auth-change', checkUser);

    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('user-auth-change', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('user-auth-change'));
    setUser(null);
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.logo}>
          VN<span>GO</span>
        </Link>
        
        <nav className={styles.nav}>
          <Link to="/how-to-use" className={styles.navLink}>Hướng dẫn sử dụng</Link>
          <Link to="/vehicles" className={styles.navLink}>Bảng giá</Link>
          <Link to="/stations" className={styles.navLink}>Danh sách trạm</Link>
          <Link to="/my-bookings" className={styles.navLink}>Xe đã thuê</Link>
          <Link to="/about" className={styles.navLink}>Về chúng tôi</Link>
        </nav>
        
        <div className={styles.actions}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/profile" className={styles.avatarLink} title="Hồ sơ cá nhân">
                <div className={styles.avatarCircle} style={{ overflow: 'hidden' }}>
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <User size={20} color="white" strokeWidth={2.5} />
                  )}
                </div>
              </Link>
              {user.role === 'ADMIN' && (
                 <Link to="/admin" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Dashboard</Link>
              )}
              <button 
                onClick={handleLogout}
                style={{ background: 'rgba(220,53,69,0.1)', border: 'none', color: 'var(--color-error)', cursor: 'pointer', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)' }}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className={`btn ${styles.loginBtn}`}>Đăng nhập</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
