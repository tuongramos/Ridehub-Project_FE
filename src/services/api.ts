import axios from 'axios';
import type { User, Vehicle, Station, Trip, Review, DashboardStats } from '../types';

// Connect exactly to the user's real backend
const apiClient = axios.create({
  baseURL: 'https://api.anhchuno.id.vn',
  headers: {
    'Content-Type': 'application/json'
  }
});

// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

import { mockVehicles, mockTrips } from './mockData';

const getLocalVehicles = () => {
    const saved = localStorage.getItem('vehicles');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('vehicles', JSON.stringify(mockVehicles));
    return mockVehicles;
};

const getLocalTrips = () => {
    const saved = localStorage.getItem('trips');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('trips', JSON.stringify(mockTrips));
    return mockTrips;
};

export const api = {
  // Vehicles
  getVehicles: async (): Promise<Vehicle[]> => {
    return getLocalVehicles();
  },
  getVehicleById: async (id: string): Promise<Vehicle | undefined> => {
    return getLocalVehicles().find((v: any) => v.id === id);
  },

  // Stations
  getStations: async (): Promise<Station[]> => {
    try {
      const response = await apiClient.get('/stations');
      return response.data || [];
    } catch {
      return [];
    }
  },

  // Users
  getUserProfile: async (id: string): Promise<User | undefined> => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch {
      return undefined;
    }
  },

  // Trips & Booking
  getUserTrips: async (userId: string): Promise<Trip[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getLocalTrips().filter((t: any) => t.userId === userId));
      }, 400); // Simulate network latency
    });
  },
  createBooking: async (tripData: Partial<Trip>): Promise<Trip> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTrip: Trip = {
          id: 't' + Date.now(),
          startTime: tripData.startTime || new Date().toISOString(),
          endTime: tripData.endTime || new Date().toISOString(),
          distance: tripData.distance || 0,
          totalCost: tripData.totalCost || 0,
          status: 'ONGOING',
          startStationId: tripData.startStationId || 's1',
          endStationId: tripData.endStationId || 's1',
          vehicleId: tripData.vehicleId || 'v1',
          userId: tripData.userId || 'u1'
        };
        const trips = getLocalTrips();
        trips.unshift(newTrip); // Add new trip to the top
        localStorage.setItem('trips', JSON.stringify(trips));
        
        // UPDATE VEHICLE STATUS TO RENTED
        const vehicles = getLocalVehicles();
        const vIndex = vehicles.findIndex((v: any) => v.id === tripData.vehicleId);
        if (vIndex !== -1) {
            vehicles[vIndex].status = 'RENTED';
            localStorage.setItem('vehicles', JSON.stringify(vehicles));
        }

        resolve(newTrip);
      }, 600);
    });
  },
  updateTripStatus: async (tripId: string, newStatus: string): Promise<void> => {
    const trips = getLocalTrips();
    const tIndex = trips.findIndex((t: any) => t.id === tripId);
    if (tIndex !== -1) {
        const trip = trips[tIndex];
        trip.status = newStatus as any;
        if (newStatus === 'COMPLETED') trip.endTime = new Date().toISOString();
        localStorage.setItem('trips', JSON.stringify(trips));
        
        // if returning or cancelling, update vehicle back to AVAILABLE
        if (newStatus === 'COMPLETED' || newStatus === 'CANCELLED') {
            const vehicles = getLocalVehicles();
            const vIndex = vehicles.findIndex((v: any) => v.id === trip.vehicleId);
            if (vIndex !== -1) {
                vehicles[vIndex].status = 'AVAILABLE';
                localStorage.setItem('vehicles', JSON.stringify(vehicles));
            }
        }
    }
  },

  // Reviews
  getVehicleReviews: async (vehicleId: string): Promise<Review[]> => {
    try {
       const response = await apiClient.get(`/vehicles/${vehicleId}/reviews`);
       return response.data || [];
    } catch {
       return [];
    }
  },

  // Admin / Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return response.data || { totalVehicles: 0, rentedVehicles: 0, totalRevenue: 0 };
    } catch {
      return { totalVehicles: 0, rentedVehicles: 0, totalRevenue: 0 };
    }
  },

  // Users
  updateUserProfile: async (_userId: string, data: any): Promise<void> => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const user = JSON.parse(saved);
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setTimeout(() => window.dispatchEvent(new Event('user-auth-change')), 100);
    }
  }
};
