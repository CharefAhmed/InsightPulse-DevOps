import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthCheckService } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma.health';

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: HealthCheckService;

  const mockHealthCheckService = {
    check: jest.fn(),
  };

  const mockPrismaHealthIndicator = {
    isHealthy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useValue: mockHealthCheckService },
        {
          provide: PrismaHealthIndicator,
          useValue: mockPrismaHealthIndicator,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /health (liveness probe)', () => {
    it('should call health.check with no indicators', async () => {
      const mockResult = { status: 'ok', info: {}, error: {}, details: {} };
      mockHealthCheckService.check.mockResolvedValue(mockResult);

      const result = await controller.liveness();

      expect(healthCheckService.check).toHaveBeenCalledWith([]);
      expect(result).toEqual(mockResult);
    });

    it('should return status ok when app is running', async () => {
      mockHealthCheckService.check.mockResolvedValue({ status: 'ok' });
      const result = await controller.liveness();
      expect(result.status).toBe('ok');
    });
  });

  describe('GET /ready (readiness probe)', () => {
    it('should call health.check with database indicator', async () => {
      const mockResult = {
        status: 'ok',
        info: { database: { status: 'up' } },
        error: {},
        details: { database: { status: 'up' } },
      };
      mockHealthCheckService.check.mockResolvedValue(mockResult);

      const result = await controller.readiness();

      expect(healthCheckService.check).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });

    it('should include database in health info', async () => {
      mockHealthCheckService.check.mockResolvedValue({
        status: 'ok',
        info: { database: { status: 'up' } },
      });
      const result = await controller.readiness();
      expect(result.info).toHaveProperty('database');
    });
  });

  describe('GET /version', () => {
    it('should return version info with correct shape', () => {
      const result = controller.version();

      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('version');
      expect(result).toHaveProperty('environment');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('timestamp');
    });

    it('should return a valid ISO 8601 timestamp', () => {
      const result = controller.version();
      expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
    });

    it('should return a non-negative integer uptime', () => {
      const result = controller.version();
      expect(result.uptime).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(result.uptime)).toBe(true);
    });

    it('should return environment as string', () => {
      const result = controller.version();
      expect(typeof result.environment).toBe('string');
    });
  });
});
