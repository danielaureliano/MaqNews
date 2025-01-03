import dotenv from "dotenv";
dotenv.config();
// Para requisições HTTP
import fetch from "node-fetch"; 
// Para logs de erros e eventos
import logger from "./logger.js";
import QRCode from "qrcode"; 

const API_URL = process.env.API_URL;
const API_PRIVATE_KEY = process.env.API_PRIVATE_KEY; // Token seguro

async function fetchData() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_PRIVATE_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMsg = `Erro na API: ${response.status} - ${response.statusText}`;
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    const data = await response.json();
    logger.info("Dados buscados com sucesso.");
    return data.filter((item) => new Date(item.validUntil) > new Date());
  } catch (error) {
    logger.error(`Erro ao buscar dados: ${error.message}`);
    throw error;
  }
}

export { fetchData };
