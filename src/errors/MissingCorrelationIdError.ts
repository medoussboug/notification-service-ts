

export class MissingCorrelationIdError extends Error {
    constructor(message: string = "The event you received doesn't contain a correlation ID inside of the message.\n" +
                                  "Please include the correlation ID with your request so that we can track the request." ) {
        super(message);
    }
}