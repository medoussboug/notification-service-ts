import winston from 'winston';
import {CorrelationContext} from "../CorrealtionContext";
const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ timestamp, level, message, stack }) => {
    const correlationId = CorrelationContext.getCorrelationID();
    return `${timestamp} [${level}] (Correlation ID: ${correlationId}): ${stack || message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize({all: true}),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
        errors({stack: true}),
        logFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
        new winston.transports.File({filename: 'logs/combined.log'})
    ]
})

export default logger;