export enum VehicleType {
  CAR = 'CAR',
  VAN = 'VAN',
  MOTORCYCLE = 'MOTORCYCLE',
  TRUCK = 'TRUCK',
  OTHER = 'OTHER',
}

export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  OTHER = 'OTHER',
}

export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  vin?: string;
  type: VehicleType;
  fuelType: FuelType;
  mileage?: number;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVehicleDto {
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  vin?: string;
  type: VehicleType;
  fuelType: FuelType;
  mileage?: number;
  color?: string;
}

export interface UpdateVehicleDto {
  make?: string;
  model?: string;
  year?: number;
  registrationNumber?: string;
  vin?: string;
  type?: VehicleType;
  fuelType?: FuelType;
  mileage?: number;
  color?: string;
}