export const kafkaConfig = {
    clientId: process.env.KAFKA_CLIENT_ID as string,
    brokers: [process.env.KAFKA_HOST as string],
    consumerGroupId: process.env.KAFKA_CONSUMER_GROUPID as string,
    topics: ['register-user'],
};
