import { Test, TestingModule } from '@nestjs/testing';
import { PassportAuthController } from './passport-auth.controller';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';

describe('PassportAuthController', () => {
  let controller: PassportAuthController;

  const mockAuthService = {
    sign: jest.fn(),
    refreshToken: jest.fn(),
  };

  // Mock response object
  const mockRes = {
    cookie: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassportAuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
      .overrideGuard(PassportLocalGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<PassportAuthController>(PassportAuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should set cookies and return user info', async () => {
      const tokenData = {
        accessToken: 'at',
        refreshToken: 'rt',
        username: 'alice',
        userId: 1,
      };
      mockAuthService.sign.mockResolvedValue(tokenData);

      const req = { user: { userId: 1, username: 'alice' } };
      const result = await controller.login(req, mockRes as any);

      expect(mockAuthService.sign).toHaveBeenCalledWith(req.user);
      expect(mockRes.cookie).toHaveBeenCalledWith(
        'accessToken',
        'at',
        expect.any(Object),
      );
      expect(mockRes.cookie).toHaveBeenCalledWith(
        'refreshToken',
        'rt',
        expect.any(Object),
      );
      expect(result).toEqual({
        message: 'Login Successfully',
        user: { id: 1, username: 'alice' },
      });
    });
  });
});
