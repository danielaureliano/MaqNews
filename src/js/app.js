const logger = require("./logger");
const { fetchData } = require("./api");
const { updateCarousel } = require("./carousel");
const express = require("express");
const helmet = require("helmet");
const path = require("path");

const app = express();

// Adiciona headers de segurança com Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://example.com"], // Adicione suas URLs permitidas
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "https://a0e30819b37637906a0fb71950dd8b08.cdn.bubble.io"], // Exemplo
        connectSrc: ["'self'"],
      },
    },
    frameguard: { action: "deny" }, // Substitui X-Frame-Options
    noSniff: true, // Adiciona X-Content-Type-Options
  })
);

// Configuração de cache para recursos estáticos
app.use(
  "/static",
  express.static(path.join(__dirname, "public"), {
    maxAge: "1y", // Um ano de cache
    immutable: true, // Os arquivos não mudarão
  })
);

// Adiciona Cache-Control para todas as respostas
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "max-age=31536000, immutable");
  next();
});

// Servir arquivos HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/html/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

async function initialize() {
  try {
    updateDateTime(); // Atualiza a hora inicial
    setInterval(updateDateTime, 1000); // Atualiza a cada segundo

    const data = await fetchData();
    logger.info("Aplicação inicializada com sucesso.");
    renderCarousel(data);
  } catch (error) {
    logger.error(`Erro na inicialização: ${error.message}`);
  }
}

function updateDateTime() {
  const now = new Date();
  const datetimeElement = document.getElementById("datetime");
  
  if (datetimeElement) {
    // Exibe a data e hora no formato brasileiro
    datetimeElement.textContent = now.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  } else {
    console.error("Elemento para exibição de data/hora não encontrado.");
  }
}

// Chame essa função na inicialização e configure o intervalo
updateDateTime();
setInterval(updateDateTime, 1000); // Atualiza a cada segundo

function renderCarousel(data) {
  const carousel = document.getElementById("carousel");
  const indicators = document.getElementById("indicators");

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
      updateCarousel(index); // Reutiliza a função do módulo carousel.js
    });
    indicators.appendChild(button);
  });

  data.forEach((item, index) => {
    const canvas = document.getElementById(`qr-${index}`);
    if (canvas && QRCode) {
      QRCode.toCanvas(canvas, item.qrCodeLink, (error) => {
        if (error) logger.error(`Erro ao gerar QR Code: ${error.message}`);
      });
    } else {
      logger.warn(`Canvas para QR Code não encontrado no índice ${index}`);
    }
  });
}

initialize();
