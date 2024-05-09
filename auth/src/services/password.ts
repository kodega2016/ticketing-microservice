import { genSalt, hash, compare } from "bcrypt";

export class Password {
  static toHash(password: string) {
    return genSalt(10).then((salt: string) => hash(password, salt));
  }
  static compare(storedPassword: string, suppliedPassword: string) {
    return compare(suppliedPassword, storedPassword);
  }
}
