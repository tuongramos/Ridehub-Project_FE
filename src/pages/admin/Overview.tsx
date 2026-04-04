import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import type { DashboardStats } from '../../types';
import { Spinner } from '../../components/Spinner';
import { Bike, Users, Banknote } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Overview: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    api.getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <div className="text-center mt-8"><Spinner size="lg" /></div>;

  const barData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        label: 'Doanh thu (VNĐ)',
        data: [1200000, 1900000, 1500000, 2200000, 3500000, 5200000, 4800000],
        backgroundColor: 'rgba(0, 102, 204, 0.7)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Đang thuê', 'Sẵn sàng', 'Bảo trì'],
    datasets: [
      {
        data: [stats.rentedVehicles, stats.totalVehicles - stats.rentedVehicles - 12, 12],
        backgroundColor: [
          '#ffc107',
          '#28a745',
          '#dc3545',
        ],
        borderWidth: 1,
      },
    ],
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--color-text-primary)' }}>Tổng quan hệ thống</h1>
      
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(0,102,204,0.1)', color: 'var(--color-primary)', borderRadius: '50%' }}>
             <Bike size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Tổng xe</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.totalVehicles}</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(255,193,7,0.1)', color: 'var(--color-warning)', borderRadius: '50%' }}>
             <Bike size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Xe đang thuê</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.rentedVehicles}</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(40,167,69,0.1)', color: 'var(--color-success)', borderRadius: '50%' }}>
             <Banknote size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Doanh thu tuần</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{formatPrice(stats.totalRevenue)}</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(108,117,125,0.1)', color: '#6c757d', borderRadius: '50%' }}>
             <Users size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Người dùng</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>1,245</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Biểu đồ doanh thu tuần này</h3>
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Trạng thái phương tiện</h3>
          <div style={{ position: 'relative', height: '300px', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, cutout: '70%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
