let carouselItems = [];
let currentIndex = 0;
let carouselInterval = null; // Armazena o ID do intervalo

function generateCarouselItems(data) {
  const carousel = document.getElementById("carousel");
  const indicators = document.getElementById("indicators");

  if (!carousel || !indicators) {
    console.error("Elementos do carrossel não encontrados.");
    return;
  }

  // Limpa o conteúdo existente
  carousel.innerHTML = "";
  indicators.innerHTML = "";

  if (data.length === 0) {
    console.warn("Nenhum item disponível para o carrossel.");
    return;
  }

  data.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = `carousel__item ${index === 0 ? "active" : ""}`;
    slide.innerHTML = `
      <h2>${item.title}</h2>
      ${item.image ? `<img src="${item.image}" alt="Image" />` : ""}
      <div class="text-content">
        <p>${item.text}</p>
      </div>
      <canvas id="qr-${index}"></canvas>
    `;
    carousel.appendChild(slide);

    const button = document.createElement("button");
    button.className = index === 0 ? "active" : "";
    button.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
    indicators.appendChild(button);
  });

  // Atualiza a lista global de itens do carrossel
  carouselItems = document.querySelectorAll(".carousel__item");
}

function updateCarousel() {
  if (carouselItems.length === 0) {
    console.warn("Nenhum item no carrossel para atualizar.");
    return;
  }

  const items = document.querySelectorAll(".carousel__item");
  const buttons = document.querySelectorAll(".carousel__indicators button");
  const progressBar = document.getElementById("progress-bar");

  // Atualiza os itens ativos
  items.forEach((item, idx) => {
    item.classList.toggle("active", idx === currentIndex);
  });

  // Atualiza os botões ativos
  buttons.forEach((button, idx) => {
    button.classList.toggle("active", idx === currentIndex);
  });

  // Reinicia a barra de progresso
  if (progressBar) {
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    setTimeout(() => {
      progressBar.style.transition = "width 5s linear";
      progressBar.style.width = "100%";
    }, 50);
  } else {
    console.warn("Elemento progress-bar não encontrado.");
  }
}

function startCarousel() {
  // Limpa qualquer intervalo existente antes de iniciar
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }

  if (carouselItems.length === 0) {
    console.warn("Nenhum item para iniciar o carrossel.");
    return;
  }

  carouselInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
  }, 5000);
}

module.exports = {
  generateCarouselItems,
  updateCarousel,
  startCarousel,
};
