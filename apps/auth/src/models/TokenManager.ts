import bcrypt from "bcryptjs";
import debug from "debug";
import { LRUCache } from "lru-cache";

type TokenKey = string;
type ActiveTokenValue = {
  token: string;
  expiresAt: Date;
  createdAt: Date;
};
type ExpiredTokenValue = {
  token: string;
  expiredAt: Date;
};

class TokenManager {
  private logger = debug("santarepo:auth:models:tokenManager");

  private expiredTokens: LRUCache<string, ExpiredTokenValue> = new LRUCache({
    max: 2500,
    maxSize: 25000,
    ttl: 1000 * 60 * 60 * 24,
    sizeCalculation: () => 1,
    ttlAutopurge: true,
  });

  private activeTokens: LRUCache<string, ActiveTokenValue> = new LRUCache({
    max: 25000,
    maxSize: 250000,
    ttl: 1000 * 60 * 60,
    sizeCalculation: () => 1,
    dispose: (value, key) => {
      this.expiredTokens.set(key, {
        ...value,
        expiredAt: new Date(),
      });
    },
    ttlAutopurge: true,
  });

  public createToken(): TokenKey {
    const salt = bcrypt.genSaltSync(10);
    const phrase =
      process.env.BCRYPT_SECRET_PHRASE + Math.random().toString(36).slice(10);
    const token = bcrypt.hashSync(phrase, salt);
    this.activeTokens.set(token, {
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      createdAt: new Date(),
    });
    return token;
  }

  public validateToken(token: TokenKey): boolean {
    const tokenValue = this.activeTokens.get(token);
    if (!tokenValue) {
      return false;
    }

    if (tokenValue.expiresAt < new Date() || this.expiredTokens.has(token)) {
      this.logger("Token expired: %o", tokenValue);
      return false;
    }

    return true;
  }

  public removeToken(token: TokenKey): void {
    this.activeTokens.delete(token);
    this.expiredTokens.delete(token);
  }
}

export default new TokenManager();
