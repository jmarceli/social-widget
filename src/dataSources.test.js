import { loadData } from './dataSources';

const mockData = {
  test: '123',
  commentList: [
    { pubTimestamp: 123 },
    { pubTimestamp: 456 },
    { pubTimestamp: 12 },
  ],
};

const mockResponse = {
  json: () => mockData,
};

const mockFetch = jest.fn().mockImplementation(() => mockResponse);
window.fetch = mockFetch;

describe('loadData()', () => {
  test('returns data in correct order', async () => {
    const result = await loadData('./profile.json');
    expect(result).toEqual(mockData);
    expect(result.commentList).toEqual([
      { pubTimestamp: 12 },
      { pubTimestamp: 123 },
      { pubTimestamp: 456 },
    ]);
    expect(mockFetch).toHaveBeenCalledWith('./profile.json');
  });
});
