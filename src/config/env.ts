import * as dotenv from 'dotenv';
import logger from "./logging/logger";

dotenv.config();
logger.info(`Environment loaded: ${process.env.NODE_ENV}`);