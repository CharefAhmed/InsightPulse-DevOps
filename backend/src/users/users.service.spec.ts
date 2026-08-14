import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from '../database/database.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockDatabaseService = {
    user: {
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
        UsersService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, username: 'alice', email: 'alice@example.com' }];
      mockDatabaseService.user.findMany.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockDatabaseService.user.findMany).toHaveBeenCalledWith({});
    });
  });

  describe('findOne', () => {
    it('should return a single user by id', async () => {
      const user = { id: 1, username: 'alice', email: 'alice@example.com' };
      mockDatabaseService.user.findUnique.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(mockDatabaseService.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      const user = { id: 1, username: 'alice', email: 'alice@example.com' };
      mockDatabaseService.user.findUnique.mockResolvedValue(user);

      const result = await service.findOneByEmail('alice@example.com');
      expect(result).toEqual(user);
      expect(mockDatabaseService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'alice@example.com' },
      });
    });
  });

  describe('create', () => {
    it('should hash the password and create a user', async () => {
      const dto = { username: 'bob', email: 'bob@example.com', password: 'password123' };
      const created = { id: 2, username: 'bob', email: 'bob@example.com' };
      mockDatabaseService.user.create.mockResolvedValue(created);

      const result = await service.create(dto);
      expect(result).toEqual(created);
      expect(mockDatabaseService.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            username: 'bob',
            email: 'bob@example.com',
          }),
        }),
      );
      // password must be hashed (not plaintext)
      const callArg = mockDatabaseService.user.create.mock.calls[0][0];
      expect(callArg.data.password).not.toBe('password123');
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      mockDatabaseService.user.delete.mockResolvedValue({ id: 1 });

      const result = await service.delete(1);
      expect(result).toEqual({ id: 1 });
      expect(mockDatabaseService.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
