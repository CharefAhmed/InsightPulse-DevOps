import { Test, TestingModule } from '@nestjs/testing';
import { SentimentController } from './sentiment.controller';

describe('SentimentController', () => {
  let controller: SentimentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SentimentController],
    }).compile();

    controller = module.get<SentimentController>(SentimentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
