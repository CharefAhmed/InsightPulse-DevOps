import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: 1,
    username: 'alice',
    email: 'alice@example.com',
    // bcrypt hash of "password123"
    password: '$2b$09$hash-placeholder',
  };

  const mockUsersService = {
    findOneByEmail: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should throw UnauthorizedException when user is not found', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(null);

      await expect(
        service.validateUser({ email: 'unknown@example.com', password: 'any' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return null when password does not match', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);
      // bcrypt.compare will return false for a mismatched hash
      const result = await service.validateUser({
        email: 'alice@example.com',
        password: 'wrong-password',
      });
      expect(result).toBeNull();
    });
  });

  describe('sign', () => {
    it('should return tokens and user info', async () => {
      mockJwtService.signAsync.mockResolvedValueOnce('access-token');
      mockJwtService.signAsync.mockResolvedValueOnce('refresh-token');

      const result = await service.sign({ userId: 1, username: 'alice' });

      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        username: 'alice',
        userId: 1,
      });
      expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
    });
  });

  describe('refreshToken', () => {
    it('should return a new access token when refresh token is valid', async () => {
      mockJwtService.verifyAsync.mockResolvedValue({ sub: 1, username: 'alice' });
      mockJwtService.signAsync.mockResolvedValue('new-access-token');

      const result = await service.refreshToken('valid-refresh-token');
      expect(result).toBe('new-access-token');
    });

    it('should throw UnauthorizedException when refresh token is invalid', async () => {
      mockJwtService.verifyAsync.mockRejectedValue(new Error('invalid'));

      await expect(service.refreshToken('bad-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
