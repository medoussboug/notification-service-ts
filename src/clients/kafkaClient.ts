import { Kafka } from 'kafkajs';
import {kafkaConfig} from "../config/kafkaConfig";
import {subscribeToTopics} from "./consumers/eventConsumer";
import logger from "../config/logging/logger";

const kafka = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers,
    logLevel: 1
});

export const consumer = kafka.consumer({ groupId: kafkaConfig.consumerGroupId });

export const connectConsumer = async () => {
    await consumer.connect();
    logger.info(`Kafka consumer connected for group id ${kafkaConfig.consumerGroupId}`)
    await subscribeToTopics();
    logger.info(`Subscribing to topics ${Object.values(kafkaConfig.topics).join(', ')}`);
};
