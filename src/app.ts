import express from 'express';
import logger from "./config/logging/logger";

const app = express();

app.use(express.json());

export const startServer = async () => {
    app.listen(3000, () => {
        logger.info('Server is running on port 3000');
    });
};
