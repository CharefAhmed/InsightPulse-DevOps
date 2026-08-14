import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { DatabaseService } from '../database/database.service';

describe('CommentsService', () => {
  let service: CommentsService;

  const mockDatabaseService = {
    comment: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should filter by author when author is provided', async () => {
      const comments = [{ id: 1, author: 'alice', content: 'great!' }];
      mockDatabaseService.comment.findMany.mockResolvedValue(comments);

      const result = await service.findAll('alice', '', '', 1);
      expect(result).toEqual(comments);
      expect(mockDatabaseService.comment.findMany).toHaveBeenCalledWith({
        where: { author: 'alice' },
      });
    });

    it('should filter by userId when no other filter is set', async () => {
      const comments = [{ id: 2, userId: 5, content: 'ok' }];
      mockDatabaseService.comment.findMany.mockResolvedValue(comments);

      const result = await service.findAll('', '', '', 5);
      expect(result).toEqual(comments);
      expect(mockDatabaseService.comment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { userId: 5 } }),
      );
    });
  });

  describe('findOne', () => {
    it('should return a comment by id', async () => {
      const comment = { id: 1, content: 'hello' };
      mockDatabaseService.comment.findUnique.mockResolvedValue(comment);

      const result = await service.findOne(1);
      expect(result).toEqual(comment);
      expect(mockDatabaseService.comment.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('create', () => {
    it('should create a comment', async () => {
      const dto = { content: 'Nice product!', author: 'bob', userId: 2 };
      const created = { id: 10, ...dto };
      mockDatabaseService.comment.create.mockResolvedValue(created);

      const result = await service.create(dto);
      expect(result).toEqual(created);
      expect(mockDatabaseService.comment.create).toHaveBeenCalledWith({
        data: { content: 'Nice product!', author: 'bob', userId: 2 },
      });
    });
  });

  describe('delete', () => {
    it('should delete a comment by id', async () => {
      mockDatabaseService.comment.delete.mockResolvedValue({ id: 3 });

      const result = await service.delete(3);
      expect(result).toEqual({ id: 3 });
      expect(mockDatabaseService.comment.delete).toHaveBeenCalledWith({
        where: { id: 3 },
      });
    });
  });
});
