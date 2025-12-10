// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SUPPLIER = 'SUPPLIER',
}

// Vehicle Types
export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  registration: string;
  vin?: string;
  mileage?: number;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Job Types
export interface Job {
  id: string;
  vehicleId: string;
  userId: string;
  type: JobType;
  status: JobStatus;
  description: string;
  scheduledDate?: Date;
  completedDate?: Date;
  cost?: number;
  supplierId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum JobType {
  MOT = 'MOT',
  SERVICE = 'SERVICE',
  REPAIR = 'REPAIR',
  INSPECTION = 'INSPECTION',
}

export enum JobStatus {
  PENDING = 'PENDING',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// Quote Types
export interface Quote {
  id: string;
  jobId: string;
  supplierId: string;
  amount: number;
  description: string;
  validUntil: Date;
  status: QuoteStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum QuoteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

// Supplier Types
export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  rating?: number;
  verified: boolean;
  services: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  jobId?: string;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Payment Types
export interface Payment {
  id: string;
  userId: string;
  jobId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  WALLET = 'WALLET',
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
