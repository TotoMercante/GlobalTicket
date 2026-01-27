import { Injectable, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { UserService } from 'src/user/user.service';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: Record<string, unknown>) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const res = await fetch(`${process.env.AUTH0_ISSUER_URL}userinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = (await res.json()) as Record<string, unknown>;
    if (res.ok) {
      const user = await this.userService.getByEmail(data['email'] as string);
      if (!user) {
        throw new HttpException({ registered: false }, 401);
      }
      return [user, payload];
    } else throw new HttpException(data, res.status);
  }
}
