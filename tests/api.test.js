const { fetchData } = require('../src/js/api');

describe('API Module', () => {
  it('should fetch data successfully', async () => {
    const mockData = [{ title: 'Test News', validUntil: '2025-12-31T23:59:59Z' }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const data = await fetchData();
    expect(data).toEqual(mockData);
  });

  it('should handle API errors', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    );

    await expect(fetchData()).rejects.toThrow('Erro na API: 500 - Internal Server Error');
  });
});
