import { loadData } from './dataSources';

const mockData = {
  test: '123',
};

const mockResponse = {
  json: () => mockData,
};

const mockFetch = jest.fn().mockImplementation(() => mockResponse);
window.fetch = mockFetch;

describe('loadData()', () => {
  test('returns data', async () => {
    const result = await loadData('./profile.json');
    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith('./profile.json');
  });
});
