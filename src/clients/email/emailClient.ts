import transporter from './../../config/transporter';
import logger from "../../config/logging/logger";

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

async function sendEmail(options: EmailOptions) {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
    };
    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Email sent to ${options.to}`);
    } catch (error) {
        logger.error(`Error sending email to ${options.to}: `, error);
    }
};


export default sendEmail;