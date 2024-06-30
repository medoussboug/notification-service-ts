import {consumer} from "../kafkaClient";
import logger from "../../config/logging/logger";
import {kafkaConfig} from "../../config/kafkaConfig";
import {KafkaMessage} from "kafkajs";
import {plainToInstance} from "class-transformer";
import {UserDTO} from "../../dtos/UserDTO";

export const subscribeToTopics = async () => {
    try {
        await Promise.all(
            Object.values(kafkaConfig.topics).map(topic =>
                consumer.subscribe({ topic, fromBeginning: true })
            )
        )
    } catch (error) {
        logger.error(`Error subscribing to topics: ${error}`);
    }
};

export const consumerEventDispatcher = async () => {
    try {
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                switch (topic) {
                    case kafkaConfig.topics.user_registration_event:
                        await consumeUserRegistrationEvent(topic, message);
                        break;
                }
            },
        });
    } catch (error) {
        logger.error(`Error in consumer: ${error}`);
    }
};

export const consumeUserRegistrationEvent = async (topic: string, message: KafkaMessage) => {
    try {
        const user: UserDTO = JSON.parse(message.value!.toString());
        logger.info(`Received message from topic ${topic}: ${message.value}`);
        logger.info("Sending email to: " + user.email)
    } catch (error) {
        logger.error(`Error consuming topic '${topic}' with the following message '${message.value}': ${error}`);
    }
}