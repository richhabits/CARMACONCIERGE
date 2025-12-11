export enum QuoteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  jobId: string;
  supplierId: string;
  status: QuoteStatus;
  items: QuoteItem[];
  totalAmount: number;
  laborHours?: number;
  laborRate?: number;
  notes?: string;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateQuoteDto {
  jobId: string;
  items: Omit<QuoteItem, 'id' | 'total'>[];
  laborHours?: number;
  laborRate?: number;
  notes?: string;
  validUntil: Date;
}

export interface UpdateQuoteDto {
  status?: QuoteStatus;
  items?: Omit<QuoteItem, 'id' | 'total'>[];
  laborHours?: number;
  laborRate?: number;
  notes?: string;
  validUntil?: Date;
}