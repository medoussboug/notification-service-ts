import * as dotenv from 'dotenv';
import logger from "./logging/logger";

dotenv.config({ path: '.env.' + process.env.NODE_ENV});
logger.info(`Environment loaded: ${process.env.NODE_ENV}`);