import {consumer} from "../kafkaClient";
import logger from "../../config/logging/logger";
import {kafkaConfig} from "../../config/kafkaConfig";
import {KafkaMessage} from "kafkajs";
import * as notificationService from "./../../services/notificationService"
import {UserDTO} from "../../dtos/UserDTO";
import {VerificationTokenDTO} from "../../dtos/VerificationTokenDTO";

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
                    case kafkaConfig.topics.user_confirmation_event:
                        await consumeUserConfirmationEvent(topic, message);
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
        const {user, verificationToken}: {user: UserDTO, verificationToken: VerificationTokenDTO} = JSON.parse(message.value!.toString());
        logger.info(`Received message from topic ${topic}: ${user.username}`);
        await notificationService.sendUserTokenConfirmationNotification(user, verificationToken);
    } catch (error) {
        logger.error(`Error consuming topic '${topic}' with the following message '${message.value}': ${error}`);
    }
}

export const consumeUserConfirmationEvent = async (topic: string, message: KafkaMessage) => {
    try {
        const {user}: {user: UserDTO} = JSON.parse(message.value!.toString());
        logger.info(`Received message from topic ${topic}: ${user.username}`);
        await notificationService.sendUserSuccessfulConfirmationNotification(user);
    } catch (error) {
        logger.error(`Error consuming topic '${topic}' with the following message '${message.value}': ${error}`);
    }
}