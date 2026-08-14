import { Test, TestingModule } from '@nestjs/testing';
import { SentimentController } from './sentiment.controller';
import { SentimentService } from './sentiment.service';
import { PassportJwtGuard } from '../auth/guards/passport-jwt.guard';

describe('SentimentController', () => {
  let controller: SentimentController;

  const mockSentimentService = {
    analyseAllComments: jest.fn(),
    analyseOneComment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SentimentController],
      providers: [{ provide: SentimentService, useValue: mockSentimentService }],
    })
      .overrideGuard(PassportJwtGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<SentimentController>(SentimentController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('analyseAllComments() should delegate to SentimentService.analyseAllComments()', async () => {
    const comments = [{ content: 'great', author: 'alice', userId: 1 }];
    const results = [{ id: 1, sentiment: 'positive', score: '4' }];
    mockSentimentService.analyseAllComments.mockResolvedValue(results);

    const result = await controller.analyseAllComments(comments);
    expect(result).toBe(results);
    expect(mockSentimentService.analyseAllComments).toHaveBeenCalledWith(comments);
  });

  it('analyseOneComment() should delegate to SentimentService.analyseOneComment()', async () => {
    const dto = { content: 'ok', author: 'bob', userId: 2 };
    const analysisResult = { id: 2, sentiment: 'neutral', score: '3' };
    mockSentimentService.analyseOneComment.mockResolvedValue(analysisResult);

    const result = await controller.analyseOneComment(dto);
    expect(result).toBe(analysisResult);
    expect(mockSentimentService.analyseOneComment).toHaveBeenCalledWith(dto);
  });
});
