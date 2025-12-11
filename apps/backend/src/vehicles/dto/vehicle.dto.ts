import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { VehicleType, FuelType } from '@carmaconcierge/shared';

export class CreateVehicleDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;

  @IsString()
  registrationNumber: string;

  @IsOptional()
  @IsString()
  vin?: string;

  @IsEnum(VehicleType)
  type: VehicleType;

  @IsEnum(FuelType)
  fuelType: FuelType;

  @IsOptional()
  @IsNumber()
  mileage?: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  engineSize?: string;
}

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @IsOptional()
  @IsString()
  vin?: string;

  @IsOptional()
  @IsEnum(VehicleType)
  type?: VehicleType;

  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @IsOptional()
  @IsNumber()
  mileage?: number;

  @IsOptional()
  @IsString()
  color?: string;
}