export interface VerificationTokenDTO {
    username: string;
    token: string;
    createdAt: Date;
    expiresAt: Date;
}