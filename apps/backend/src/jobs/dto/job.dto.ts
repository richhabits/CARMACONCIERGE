import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { JobType, JobStatus } from '@carmaconcierge/shared';

export class CreateJobDto {
  @IsString()
  vehicleId: string;

  @IsEnum(JobType)
  type: JobType;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  scheduledDate?: string;
}

export class UpdateJobDto {
  @IsOptional()
  @IsEnum(JobType)
  type?: JobType;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  scheduledDate?: string;

  @IsOptional()
  @IsDateString()
  completedDate?: string;
}