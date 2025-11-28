import jwt, { JsonWebTokenError, TokenExpiredError, type JwtPayload } from "jsonwebtoken";

export class JwtService {
    constructor(private jwtSecret: string) {}
    sign(input: { payload: JwtPayload }) {
        return jwt.sign(input.payload, this.jwtSecret, { expiresIn: "1h" })
    }

    verify(input: { unknownToken: string }) {
        try {
            return jwt.verify(input.unknownToken, this.jwtSecret)
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new Error("TOKEN_EXPIRED")
            } else if (error instanceof JsonWebTokenError) {
                throw new Error("TOKEN_INVALID");
            }
            throw error
        }
    }
}