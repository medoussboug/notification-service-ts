import sendEmail from './../clients/email/emailClient';
import {UserDTO} from "../dtos/UserDTO";
import {VerificationTokenDTO} from "../dtos/VerificationTokenDTO";

export async function sendUserTokenConfirmationNotification(user: UserDTO, verificationToken: VerificationTokenDTO) {
    const subject = `Confirm user registration for ${user.username}`;
    const text = `We confirm the user registration for ${user.username}, token expires at ${verificationToken.expiresAt}, ${verificationToken.token}`;

    await sendEmail({
        to: user.email,
        subject,
        text,
    });
}

export async function sendUserSuccessfulConfirmationNotification(user: UserDTO) {
    const subject = `Congratulations User registration for ${user.username} is Confirmed`;
    const text = `The user '${user.username}' has been confirmed`;

    await sendEmail({
        to: user.email,
        subject,
        text,
    });
}