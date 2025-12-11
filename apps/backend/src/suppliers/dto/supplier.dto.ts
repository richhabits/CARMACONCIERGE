import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { SupplierType } from '@carmaconcierge/shared';

export class CreateSupplierDto {
  @IsString()
  businessName: string;

  @IsEnum(SupplierType)
  type: SupplierType;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  postcode: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialties?: string[];
}

export class UpdateSupplierDto {
  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsEnum(SupplierType)
  type?: SupplierType;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postcode?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialties?: string[];
}