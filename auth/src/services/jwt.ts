import jsonwebtoken from "jsonwebtoken";

export class Jwt {
  static sign(payload: any) {
    return jsonwebtoken.sign(payload, process.env.JWT_KEY!, {
      expiresIn: "15m",
    });
  }
  static verify(token: string): JwtPayload {
    return jsonwebtoken.verify(token, process.env.JWT_KEY!) as JwtPayload;
  }
}

export interface JwtPayload {
  id: string;
  email: string;
}
