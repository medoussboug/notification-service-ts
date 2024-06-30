import express from 'express';
import logger from "./config/logging/logger";
import {consumeMessages} from "./clients/consumers/consumer";
import {connectConsumer} from "./clients/kafkaClient";

const app = express();

app.use(express.json());

export const startServer = async () => {
    await connectConsumer();
    await consumeMessages();
    app.listen(3100, () => {
        logger.info('Server is running on port 3100');
    });
};
