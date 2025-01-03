const { initialize, updateDateTime } = require('../src/js/app');
const { fetchData } = require('../src/js/api');

jest.mock('../src/js/api');

describe('App Module', () => {
  beforeEach(() => {
    // Mock DOM structure
    document.body.innerHTML = `
      <div id="datetime"></div>
      <div id="carousel"></div>
      <div id="indicators"></div>
    `;
  });

  it('should update the datetime element correctly', () => {
    updateDateTime();
    const datetimeElement = document.getElementById('datetime');
    expect(datetimeElement.textContent).not.toBe('');
    expect(datetimeElement.textContent).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}/); // Verifica formato brasileiro
  });

  it('should initialize the app successfully', async () => {
    const mockData = [
      { title: 'Test News', text: 'Some text', validUntil: '2025-12-31T23:59:59Z', qrCodeLink: 'http://example.com' },
    ];
    fetchData.mockResolvedValue(mockData);

    await initialize();

    const carouselItems = document.querySelectorAll('#carousel .carousel__item');
    expect(carouselItems.length).toBe(1);
    expect(carouselItems[0].querySelector('h2').textContent).toBe('Test News');
  });

  it('should handle fetchData errors gracefully', async () => {
    fetchData.mockRejectedValue(new Error('API Error'));

    await expect(initialize()).resolves.not.toThrow(); // Verifica que não lança erro
    expect(document.getElementById('carousel').children.length).toBe(0); // Verifica que o DOM permanece vazio
  });
});
