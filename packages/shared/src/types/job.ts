export enum JobType {
  MOT = 'MOT',
  SERVICING = 'SERVICING',
  REPAIR = 'REPAIR',
  INSPECTION = 'INSPECTION',
  OTHER = 'OTHER',
}

export enum JobStatus {
  PENDING = 'PENDING',
  QUOTED = 'QUOTED',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Job {
  id: string;
  userId: string;
  vehicleId: string;
  type: JobType;
  status: JobStatus;
  description: string;
  priority?: string;
  location?: string;
  scheduledDate?: Date;
  completedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobDto {
  vehicleId: string;
  type: JobType;
  description: string;
  priority?: string;
  location?: string;
  scheduledDate?: Date;
}

export interface UpdateJobDto {
  type?: JobType;
  status?: JobStatus;
  description?: string;
  priority?: string;
  location?: string;
  scheduledDate?: Date;
  completedDate?: Date;
}