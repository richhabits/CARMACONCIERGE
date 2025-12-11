import { IsString, IsNumber, IsOptional, IsEnum, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { QuoteStatus } from '@carmaconcierge/shared';

export class QuoteItemDto {
  @IsString()
  description: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;
}

export class CreateQuoteDto {
  @IsString()
  jobId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuoteItemDto)
  items: QuoteItemDto[];

  @IsOptional()
  @IsNumber()
  laborHours?: number;

  @IsOptional()
  @IsNumber()
  laborRate?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsDateString()
  validUntil: string;
}

export class UpdateQuoteDto {
  @IsOptional()
  @IsEnum(QuoteStatus)
  status?: QuoteStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuoteItemDto)
  items?: QuoteItemDto[];

  @IsOptional()
  @IsNumber()
  laborHours?: number;

  @IsOptional()
  @IsNumber()
  laborRate?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  validUntil?: string;
}