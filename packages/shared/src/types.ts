/**
 * Vehicle-related types
 */
export interface Vehicle {
  id: string;
  registration: string;
  make: string;
  model: string;
  year: number;
  ownerId: string;
}

/**
 * Service-related types
 */
export interface Service {
  id: string;
  vehicleId: string;
  type: 'MOT' | 'Service' | 'Repair';
  date: string;
  cost: number;
  description: string;
}

/**
 * User-related types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin' | 'fleet_manager';
}
