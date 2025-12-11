export enum SupplierType {
  GARAGE = 'GARAGE',
  MOBILE_MECHANIC = 'MOBILE_MECHANIC',
  DEALERSHIP = 'DEALERSHIP',
  SPECIALIST = 'SPECIALIST',
}

export interface Supplier {
  id: string;
  userId: string;
  businessName: string;
  type: SupplierType;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  rating?: number;
  reviewCount?: number;
  specialties?: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSupplierDto {
  businessName: string;
  type: SupplierType;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  specialties?: string[];
}

export interface UpdateSupplierDto {
  businessName?: string;
  type?: SupplierType;
  address?: string;
  city?: string;
  postcode?: string;
  phone?: string;
  specialties?: string[];
}