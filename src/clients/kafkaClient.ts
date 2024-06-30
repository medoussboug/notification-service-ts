import { Kafka } from 'kafkajs';
import {kafkaConfig} from "../config/kafkaConfig";
import logger from "../config/logging/logger";

logger.info(kafkaConfig);
const kafka = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers,
    logLevel: 1
});

export const consumer = kafka.consumer({ groupId: "group-id" });

export const connectConsumer = async () => {
    await consumer.connect();
};
