import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PassportJwtGuard } from '../auth/guards/passport-jwt.guard';

describe('UploadController', () => {
  let controller: UploadController;

  const mockUploadService = {
    processFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [{ provide: UploadService, useValue: mockUploadService }],
    })
      .overrideGuard(PassportJwtGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UploadController>(UploadController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('uploadFile() should delegate to UploadService.processFile()', async () => {
    const fakeFile = { originalname: 'data.csv', buffer: Buffer.from('') } as Express.Multer.File;
    const parsed = [{ content: 'great', author: 'alice' }];
    mockUploadService.processFile.mockResolvedValue(parsed);

    const result = await controller.uploadFile(fakeFile);
    expect(result).toBe(parsed);
    expect(mockUploadService.processFile).toHaveBeenCalledWith(fakeFile);
  });
});
