import getAllAnalysedComments from './getAllAnalysedComments';
import api from './axiosInstance';

jest.mock('./axiosInstance', () => ({
  post: jest.fn(),
  get: jest.fn(),
  interceptors: { response: { use: jest.fn() } },
}));

describe('getAllAnalysedComments API', () => {
  it('should call GET /comments with the correct userId query param', () => {
    api.get.mockResolvedValue({ data: [] });

    getAllAnalysedComments(42);

    expect(api.get).toHaveBeenCalledWith('comments?userId=42');
  });
});
