import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, label } = format;
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5
};

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `;
  if (metadata) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

/** 

Use only on Server-side (SSR)

*/
const logger = createLogger({
  levels: logLevels,
  transports: [
    new transports.File({
      filename: './logs/application.log',

      format: combine(
        label({ label: 'NEXT_LOG', message: true }),
        timestamp(),
        myFormat
      )
    }),
    new transports.File({
      filename: './logs/application_log.json',
		
      format: combine(
        label({ label: 'NEXT_LOG', message: true  }),
        timestamp(),
        format.json()
      )
    })
  ]
});

export default logger;
