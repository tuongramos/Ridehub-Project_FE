import React, { useState } from 'react';
import { mockUsers } from '../../services/mockData';
import type { User } from '../../types';
import { Button } from '../../components/Button';
import { Shield } from 'lucide-react';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    if (saved) {
      return JSON.parse(saved);
    }
    localStorage.setItem('users', JSON.stringify(mockUsers));
    return mockUsers;
  });

  const toggleStatus = (id: string) => {
    const updatedUsers = users.map(u => {
      if (u.id === id) {
        let newStatus: User['status'] = u.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
        return { ...u, status: newStatus as any };
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>Quản lý người dùng</h1>
        <Button>+ Thêm người dùng</Button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>ID</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Người dùng</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Vai trò</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Trạng thái</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>#{u.id}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={u.avatarUrl} alt={u.userName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 500 }}>{u.firstName} {u.lastName}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    backgroundColor: u.role === 'ADMIN' ? 'rgba(0,102,204,0.1)' : 'rgba(108,117,125,0.1)', 
                    color: u.role === 'ADMIN' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}>
                    {u.role === 'ADMIN' ? <Shield size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/> : null}
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    backgroundColor: u.status === 'ACTIVE' ? 'rgba(40,167,69,0.1)' : 'rgba(220,53,69,0.1)', 
                    color: u.status === 'ACTIVE' ? 'var(--color-success)' : 'var(--color-error)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}>
                    {u.status === 'ACTIVE' ? 'Hoạt động' : 'Bị cấm'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant={u.status === 'ACTIVE' ? 'danger' : 'primary'} size="sm" onClick={() => toggleStatus(u.id)}>
                      {u.status === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
