import { resolve } from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';

const { format, transports, createLogger } = winston;
const { combine, timestamp, printf } = format;
/**
 * Logger should only be used on Server-Side (SSR)
 **/
const logger = (meta_url: string) => {
  const root = resolve('./');
  const file = fileURLToPath(new URL(meta_url));
  const file_path = file.replace(root, '');

  const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}] ${file_path}: ${stack || message}`;
  });

  const logger = createLogger({
    level: 'info',
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.splat(),
      format.errors({ stack: true }),
      customFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.File({ filename: 'logs/NEXT_ERROR.log', level: 'error' }),
      new transports.File({ filename: 'logs/NEXT_LOG.log' }),
      new transports.File({
        filename: 'logs/NEXT_LOG.json',
        format: combine(
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.json(),
          format.errors({ stack: true })
        )
      })
    ]
  });

  // Log also to console if not in production
  if (process.env.NODE_ENV === 'development') {
    logger.add(
      new transports.Console({
        format: combine(format.colorize(), customFormat)
      })
    );
  }

  return logger;
};

export default logger;
