import logger from "./logger.js";
import { fetchData } from "./api.js";
import { updateCarousel } from "./carousel.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import QRCode from "qrcode";

// Configuração de diretórios para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Adiciona headers de segurança com Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://www.maqplan.com.br", "http://bubble-55211.bubbleapps.io/", "https://bubble-55211.bubbleapps.io/version-test/api/1.1/"], // Adicione suas URLs permitidas
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "https://a0e30819b37637906a0fb71950dd8b08.cdn.bubble.io", "https://cdn.bubble.io"], // Exemplo
        connectSrc: ["'self'"],
      },
    },
    frameGuard: { action: "deny" }, // Substitui X-Frame-Options
    noSniff: true, // Adiciona X-Content-Type-Options
  })
);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "../html")));
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));
// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});

async function initialize() {
  try {    
    const data = await fetchData();
    logger.info("Aplicação inicializada com sucesso.");
    renderCarousel(data);
  } catch (error) {
    logger.error(`Erro na inicialização: ${error.message}`);
  }
}

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
