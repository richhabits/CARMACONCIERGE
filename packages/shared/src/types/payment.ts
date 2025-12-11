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
  PAYPAL = 'PAYPAL',
  APPLE_PAY = 'APPLE_PAY',
  GOOGLE_PAY = 'GOOGLE_PAY',
}

export interface Payment {
  id: string;
  userId: string;
  jobId?: string;
  quoteId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentDto {
  jobId?: string;
  quoteId?: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  metadata?: Record<string, any>;
}

export interface UpdatePaymentDto {
  status?: PaymentStatus;
  transactionId?: string;
  metadata?: Record<string, any>;
}