import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { PrismaService } from '../prisma/prisma.service';

describe('JobsService', () => {
  let service: JobsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    job: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a job', async () => {
      const userId = 'user-1';
      const createJobDto = {
        vehicleId: 'vehicle-1',
        type: 'MOT' as any,
        description: 'Annual MOT',
      };

      const expectedJob = { id: 'job-1', userId, ...createJobDto };

      mockPrismaService.job.create.mockResolvedValue(expectedJob);

      const result = await service.create(userId, createJobDto);

      expect(result).toEqual(expectedJob);
      expect(mockPrismaService.job.create).toHaveBeenCalledWith({
        data: {
          ...createJobDto,
          userId,
        },
        include: {
          vehicle: true,
          quotes: true,
        },
      });
    });
  });
});
