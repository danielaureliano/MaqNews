const { updateCarousel } = require('../src/js/carousel');

describe('Carousel Module', () => {
  beforeEach(() => {
    // Mock DOM structure for carousel
    document.body.innerHTML = `
      <div class="carousel">
        <div class="carousel__item"></div>
        <div class="carousel__item"></div>
        <div class="carousel__item"></div>
      </div>
      <div class="carousel__indicators">
        <button></button>
        <button></button>
        <button></button>
      </div>
      <div class="carousel__progress-bar"></div>
    `;
  });

  it('should activate the correct carousel item', () => {
    updateCarousel(1);

    const items = document.querySelectorAll('.carousel__item');
    expect(items[0].classList.contains('active')).toBe(false);
    expect(items[1].classList.contains('active')).toBe(true);
    expect(items[2].classList.contains('active')).toBe(false);
  });

  it('should update indicators correctly', () => {
    updateCarousel(2);

    const indicators = document.querySelectorAll('.carousel__indicators button');
    expect(indicators[0].classList.contains('active')).toBe(false);
    expect(indicators[1].classList.contains('active')).toBe(false);
    expect(indicators[2].classList.contains('active')).toBe(true);
  });

  it('should reset the progress bar', () => {
    updateCarousel(0);

    const progressBar = document.querySelector('.carousel__progress-bar');
    expect(progressBar.style.width).toBe('0%');
  });
});
