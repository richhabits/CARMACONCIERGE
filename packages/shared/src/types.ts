export interface Vehicle {
  id: string;
  registration: string;
  make: string;
  model: string;
  year: number;
  ownerId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'FLEET_MANAGER' | 'DRIVER';
}

export interface MOTRecord {
  id: string;
  vehicleId: string;
  testDate: Date;
  expiryDate: Date;
  result: 'PASS' | 'FAIL';
  mileage: number;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  serviceDate: Date;
  type: string;
  cost: number;
  providerId: string;
}
