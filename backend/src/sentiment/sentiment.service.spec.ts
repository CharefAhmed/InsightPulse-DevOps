import { Test, TestingModule } from '@nestjs/testing';
import { SentimentService } from './sentiment.service';
import { DatabaseService } from '../database/database.service';
import { CommentsService } from '../comments/comments.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SentimentService', () => {
  let service: SentimentService;

  const mockDatabaseService = {
    analysisResult: {
      create: jest.fn(),
    },
  };

  const mockCommentsService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SentimentService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: CommentsService, useValue: mockCommentsService },
      ],
    }).compile();

    service = module.get<SentimentService>(SentimentService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('analyseSentimentFromComment', () => {
    it('should return [sentiment, score] on successful Ollama response', async () => {
      mockedAxios.post.mockResolvedValue({
        data: { response: 'Sentiment: positive\nScore: 4' },
      });

      const result = await service.analyseSentimentFromComment({ content: 'Great product!' });
      expect(result).toEqual(['positive', '4']);
    });

    it('should throw an error when Ollama request fails', async () => {
      mockedAxios.post.mockRejectedValue(new Error('connection refused'));

      await expect(
        service.analyseSentimentFromComment({ content: 'Terrible!' }),
      ).rejects.toThrow('Sentiment analysis failed');
    });
  });

  describe('analyseOneComment', () => {
    it('should create a comment and store analysis result', async () => {
      const dto = { content: 'Loved it!', author: 'alice', userId: 1 };
      const comment = { id: 10, ...dto };
      const analysisResult = { id: 1, sentiment: 'positive', score: '5', commentId: 10 };

      mockCommentsService.create.mockResolvedValue(comment);
      mockedAxios.post.mockResolvedValue({
        data: { response: 'Sentiment: positive\nScore: 5' },
      });
      mockDatabaseService.analysisResult.create.mockResolvedValue(analysisResult);

      const result = await service.analyseOneComment(dto);
      expect(result).toEqual(analysisResult);
      expect(mockCommentsService.create).toHaveBeenCalledWith(dto);
      expect(mockDatabaseService.analysisResult.create).toHaveBeenCalledWith({
        data: { sentiment: 'positive', score: '5', commentId: 10 },
      });
    });
  });
});
