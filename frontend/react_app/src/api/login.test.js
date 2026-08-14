import login from './login';
import api from './axiosInstance';

jest.mock('./axiosInstance', () => ({
  post: jest.fn(),
  get: jest.fn(),
  interceptors: { response: { use: jest.fn() } },
}));

describe('login API', () => {
  it('should call POST /auth/login with email and password', () => {
    const mockResponse = { data: { user: { id: 1, username: 'alice' } } };
    api.post.mockResolvedValue(mockResponse);

    login({ email: 'alice@example.com', password: 'secret' });

    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'alice@example.com',
      password: 'secret',
    });
  });

  it('should return the axios response', async () => {
    const mockResponse = { data: { user: { id: 1, username: 'alice' } } };
    api.post.mockResolvedValue(mockResponse);

    const result = await login({ email: 'alice@example.com', password: 'secret' });
    expect(result).toEqual(mockResponse);
  });
});
