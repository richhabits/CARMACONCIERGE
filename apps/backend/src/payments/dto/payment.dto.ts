import { IsString, IsNumber, IsOptional, IsEnum, IsObject } from 'class-validator';
import { PaymentStatus, PaymentMethod } from '@carmaconcierge/shared';

export class CreatePaymentDto {
  @IsOptional()
  @IsString()
  jobId?: string;

  @IsOptional()
  @IsString()
  quoteId?: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class UpdatePaymentDto {
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}