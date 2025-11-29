import jwt, { JsonWebTokenError, TokenExpiredError, type JwtPayload } from "jsonwebtoken";

class JwtService {
  constructor(private jwtSecret: string) {}
  sign(input: { payload: JwtPayload }) {
    return jwt.sign(input.payload, this.jwtSecret, { expiresIn: "1h" });
  }

  verify(input: { unknownToken: string }) {
    try {
      return jwt.verify(input.unknownToken, this.jwtSecret);
    } catch (error) {
      if (error instanceof TokenExpiredError) throw new Error("TOKEN_EXPIRED");
      if (error instanceof JsonWebTokenError) throw new Error("TOKEN_INVALID");
      throw error;
    }
  }
}

const jwtService = new JwtService(process.env.JWT_SECRET!);

export { jwtService };
