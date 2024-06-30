import {consumer} from "../kafkaClient";
import logger from "../../config/logging/logger";
import {kafkaConfig} from "../../config/kafkaConfig";


export const consumeMessages = async () => {
    try {
        await Promise.all(
            kafkaConfig.topics.map(topic =>
                consumer.subscribe({ topic, fromBeginning: true })
            )
        );

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                logger.info(`Received message from topic ${topic}: ${message.value}`);
                logger.debug("Sending email to")
            },
        });
    } catch (error) {
        logger.error(`Error in consumer: ${error}`);
    }
};
