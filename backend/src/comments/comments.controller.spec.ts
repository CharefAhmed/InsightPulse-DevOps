import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PassportJwtGuard } from '../auth/guards/passport-jwt.guard';

describe('CommentsController', () => {
  let controller: CommentsController;

  const mockCommentsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [{ provide: CommentsService, useValue: mockCommentsService }],
    })
      .overrideGuard(PassportJwtGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<CommentsController>(CommentsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll() should delegate to CommentsService.findAll()', async () => {
    const comments = [{ id: 1, content: 'test' }];
    mockCommentsService.findAll.mockResolvedValue(comments);

    const result = await controller.findAll('alice', 'positive', '2024-01-01', 1);
    expect(result).toBe(comments);
    expect(mockCommentsService.findAll).toHaveBeenCalledWith('alice', '2024-01-01', 'positive', 1);
  });

  it('findOne() should delegate to CommentsService.findOne()', async () => {
    const comment = { id: 1, content: 'test' };
    mockCommentsService.findOne.mockResolvedValue(comment);

    expect(await controller.findOne(1)).toBe(comment);
    expect(mockCommentsService.findOne).toHaveBeenCalledWith(1);
  });

  it('create() should delegate to CommentsService.create()', async () => {
    const dto = { content: 'Nice!', author: 'bob', userId: 2 };
    const created = { id: 5, ...dto };
    mockCommentsService.create.mockResolvedValue(created);

    expect(await controller.create(dto)).toBe(created);
    expect(mockCommentsService.create).toHaveBeenCalledWith(dto);
  });

  it('delete() should delegate to CommentsService.delete()', async () => {
    mockCommentsService.delete.mockResolvedValue({ id: 1 });

    expect(await controller.delete(1)).toEqual({ id: 1 });
    expect(mockCommentsService.delete).toHaveBeenCalledWith(1);
  });
});
