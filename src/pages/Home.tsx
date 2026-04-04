import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { api } from '../services/api';
import type { Vehicle } from '../types';
import { VehicleCard } from '../components/VehicleCard';
import { Spinner } from '../components/Spinner';

const Home: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('Tất cả loại xe');
  const [pricingType, setPricingType] = useState<'BICYCLE' | 'E-BIKE'>('BICYCLE');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const vehiclesData = await api.getVehicles();
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <h1>Kết nối giao thông thông minh</h1>
            <p>Trải nghiệm dịch vụ thuê xe hiện đại, tiện lợi và tiết kiệm cùng VNGo.</p>
            <div className={styles.heroActions}>
              <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 600 }}>Tải ứng dụng</button>
              <button className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid white', backgroundColor: 'transparent', color: 'white', fontWeight: 600 }}>Tìm hiểu thêm</button>
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className={`container mt-8 ${styles.section}`}>
        <div className="text-center mb-8">
          <h2 className={styles.sectionTitle}>Cách sử dụng</h2>
          <p className={styles.sectionSubtitle}>Sau khi Đăng ký, sử dụng dễ dàng với 3 bước: Mở khóa - Đi xe - Trả xe</p>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>1</div>
            <h3>Khởi động</h3>
            <p>Sử dụng ứng dụng để quét mã QR trên xe & mở khóa.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>2</div>
            <h3>Hành trình</h3>
            <p>Di chuyển linh hoạt tới mọi nơi trong thành phố.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>3</div>
            <h3>Kết thúc</h3>
            <p>Đậu xe vào trạm đón/trả và khóa xe để kết thúc chuyến đi.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.lightSection}>
        <div className={`container ${styles.section}`}>
          <h2 className={`text-center mb-4 ${styles.sectionTitle}`}>Bảng giá dịch vụ</h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', backgroundColor: 'var(--color-bg)', padding: '0.25rem', borderRadius: '50px' }}>
              <button 
                onClick={() => setPricingType('BICYCLE')}
                style={{
                  padding: '0.5rem 1.5rem', borderRadius: '50px', border: 'none', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  backgroundColor: pricingType === 'BICYCLE' ? 'var(--color-primary)' : 'transparent',
                  color: pricingType === 'BICYCLE' ? 'white' : 'var(--color-text-secondary)'
                }}
              >
                Xe đạp cơ
              </button>
              <button 
                onClick={() => setPricingType('E-BIKE')}
                style={{
                  padding: '0.5rem 1.5rem', borderRadius: '50px', border: 'none', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  backgroundColor: pricingType === 'E-BIKE' ? 'var(--color-primary)' : 'transparent',
                  color: pricingType === 'E-BIKE' ? 'white' : 'var(--color-text-secondary)'
                }}
              >
                Xe đạp điện
              </button>
            </div>
          </div>

          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3>Vé lượt</h3>
              <div className={styles.price}>{pricingType === 'BICYCLE' ? '10.000' : '20.000'}<span className={styles.currency}>đồng/lượt</span></div>
              <ul className={styles.priceFeatures}>
                <li>Thời lượng: 60 phút</li>
                <li>Thời hạn: 60 phút</li>
                <li>Cước phí quá thời lượng: 3.000đ/15 phút</li>
              </ul>
            </div>
            <div className={`${styles.pricingCard} ${styles.pricingFeatured}`}>
              <h3>Vé ngày</h3>
              <div className={styles.price}>{pricingType === 'BICYCLE' ? '50.000' : '100.000'}<span className={styles.currency}>đồng/ngày</span></div>
              <ul className={styles.priceFeatures}>
                <li>Thời lượng: 450 phút</li>
                <li>Thời hạn: 24h ngày đăng kí</li>
                <li>Cước phí quá thời lượng: 3.000đ/15 phút</li>
              </ul>
            </div>
            <div className={styles.pricingCard}>
              <h3>Vé tuần</h3>
              <div className={styles.price}>{pricingType === 'BICYCLE' ? '150.000' : '300.000'}<span className={styles.currency}>đồng/tuần</span></div>
              <ul className={styles.priceFeatures}>
                <li>Thời lượng: Sử dụng thỏa thích chuyến không quá 60 phút</li>
                <li>Thời hạn: 7 ngày kể từ ngày đăng ký vé</li>
                <li>Cước phí quá thời lượng: 3.000đ/15 phút</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Listing / Explore */}
      <section className={`container mt-8 mb-8 ${styles.section}`}>
        <div className="flex justify-between items-center mb-8 w-full">
          <h2 className={styles.sectionTitle}>Khám phá phương tiện</h2>
          <div className={styles.filters}>
             <select 
               className={styles.filterSelect}
               value={filterType}
               onChange={(e) => setFilterType(e.target.value)}
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
              const filteredVehicles = vehicles.filter((v) => {
                if (filterType === 'Tất cả loại xe') return true;
                return v.type === filterType;
              });

              return filteredVehicles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)', width: '100%' }}>
                  <h3>Không tìm thấy phương tiện nào.</h3>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              );
            })()}
          </React.Fragment>
        )}
      </section>
    </div>
  );
};

export default Home;
