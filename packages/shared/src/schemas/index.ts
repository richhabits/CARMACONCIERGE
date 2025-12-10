import { z } from 'zod';

// User Schemas
export const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const updateUserSchema = userSchema.partial().omit({ password: true });

// Vehicle Schemas
export const vehicleSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  registration: z.string().min(1),
  vin: z.string().optional(),
  mileage: z.number().optional(),
  color: z.string().optional(),
});

export const updateVehicleSchema = vehicleSchema.partial();

// Job Schemas
export const jobSchema = z.object({
  vehicleId: z.string().uuid(),
  type: z.enum(['MOT', 'SERVICE', 'REPAIR', 'INSPECTION']),
  description: z.string().min(1),
  scheduledDate: z.string().datetime().optional(),
});

export const updateJobSchema = z.object({
  status: z.enum(['PENDING', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  description: z.string().optional(),
  scheduledDate: z.string().datetime().optional(),
  completedDate: z.string().datetime().optional(),
  cost: z.number().optional(),
  supplierId: z.string().uuid().optional(),
});

// Quote Schemas
export const quoteSchema = z.object({
  jobId: z.string().uuid(),
  amount: z.number().positive(),
  description: z.string().min(1),
  validUntil: z.string().datetime(),
});

export const updateQuoteSchema = z.object({
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED']).optional(),
  amount: z.number().positive().optional(),
  description: z.string().optional(),
});

// Supplier Schemas
export const supplierSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postcode: z.string().min(1),
  services: z.array(z.string()).min(1),
});

export const updateSupplierSchema = supplierSchema.partial();

// Message Schemas
export const messageSchema = z.object({
  receiverId: z.string().uuid(),
  jobId: z.string().uuid().optional(),
  content: z.string().min(1),
});

// Payment Schemas
export const paymentSchema = z.object({
  jobId: z.string().uuid(),
  amount: z.number().positive(),
  paymentMethod: z.enum(['CARD', 'BANK_TRANSFER', 'WALLET']),
});

export const updatePaymentSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED']).optional(),
  transactionId: z.string().optional(),
});
