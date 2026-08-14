import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOneByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll() should delegate to UsersService.findAll()', async () => {
    const users = [{ id: 1, username: 'alice' }];
    mockUsersService.findAll.mockResolvedValue(users);

    expect(await controller.findAll()).toBe(users);
    expect(mockUsersService.findAll).toHaveBeenCalledTimes(1);
  });

  it('findOne() should delegate to UsersService.findOne()', async () => {
    const user = { id: 1, username: 'alice' };
    mockUsersService.findOne.mockResolvedValue(user);

    expect(await controller.findOne(1)).toBe(user);
    expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
  });

  it('create() should delegate to UsersService.create()', async () => {
    const dto = { username: 'bob', email: 'bob@example.com', password: 'secret123' };
    const created = { id: 2, ...dto };
    mockUsersService.create.mockResolvedValue(created);

    expect(await controller.create(dto)).toBe(created);
    expect(mockUsersService.create).toHaveBeenCalledWith(dto);
  });

  it('delete() should delegate to UsersService.delete()', async () => {
    mockUsersService.delete.mockResolvedValue({ id: 1 });

    expect(await controller.delete(1)).toEqual({ id: 1 });
    expect(mockUsersService.delete).toHaveBeenCalledWith(1);
  });
});
