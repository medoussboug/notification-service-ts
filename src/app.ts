import express from 'express';
import logger from "./config/logging/logger";
import {connectConsumer} from "./clients/kafkaClient";
import {consumerEventDispatcher} from "./clients/consumers/eventConsumer";

const app = express();

app.use(express.json());

export const startServer = async () => {
    await connectConsumer();
    await consumerEventDispatcher();
    app.listen(3100, () => {
        logger.info('Server is running on port 3100');
    });
};
