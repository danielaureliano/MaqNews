import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const transport = new transports.DailyRotateFile({
  filename: "logs/%DATE%-combined.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d", // Retém os logs dos últimos 14 dias
});

const logger = createLogger({
  level: "info", // Define o nível de log padrão como "info"
  format: format.combine(
    format.timestamp(), // Adiciona timestamp aos logs
    format.printf(
      ({ level, message, timestamp }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new transports.Console(), // Logs no console para depuração em tempo real
    transport, // Gera arquivos rotativos diários
  ],
});
logger.info("Configurações de segurança e cache aplicadas com sucesso.");
export default logger;
