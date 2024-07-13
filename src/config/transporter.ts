import nodemailer from 'nodemailer';
import logger from "./logging/logger";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT as string, 10),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.verify(function(error, success) {
    if (error) {
        logger.error(error);
    } else {
        logger.info("Server is ready to take our messages");
    }
});

export default transporter;