import signUp from './signUp';
import api from './axiosInstance';

jest.mock('./axiosInstance', () => ({
  post: jest.fn(),
  get: jest.fn(),
  interceptors: { response: { use: jest.fn() } },
}));

describe('signUp API', () => {
  it('should call POST /users with username, email and password', () => {
    api.post.mockResolvedValue({ data: {} });

    signUp({ username: 'bob', email: 'bob@example.com', password: 'pass123' });

    expect(api.post).toHaveBeenCalledWith('users', {
      username: 'bob',
      email: 'bob@example.com',
      password: 'pass123',
    });
  });
});
