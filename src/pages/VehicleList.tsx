import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Vehicle } from '../types';
import { VehicleCard } from '../components/VehicleCard';
import { Spinner } from '../components/Spinner';

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('Tất cả loại xe');

  useEffect(() => {
    const fetchVehiclesData = async () => {
      try {
        const vehiclesData = await api.getVehicles();
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehiclesData();
  }, []);

  return (
    <div className="container mt-8 mb-8" style={{ minHeight: '60vh' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>Danh sách phương tiện</h1>
        <div>
           <select 
             value={filterType}
             onChange={(e) => setFilterType(e.target.value)}
             style={{ padding: '0.625rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: '0.95rem', cursor: 'pointer', outline: 'none', color: 'var(--color-text-primary)' }}
           >
             <option>Tất cả loại xe</option>
             <option>Xe đạp</option>
             <option>Xe đạp điện</option>
           </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-8"><Spinner size="lg" /></div>
      ) : (
        <React.Fragment>
          {(() => {
            const filteredVehicles = vehicles.filter(v => {
              if (filterType === 'Tất cả loại xe') return true;
              return v.type === filterType;
            });
            
            return filteredVehicles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)' }}>
              <h3>Không tìm thấy phương tiện nào.</h3>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          );
          })()}
        </React.Fragment>
      )}
    </div>
  );
};

export default VehicleList;
