import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './auth.dto';
import { HttpContext } from './http.context';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(HttpContext)
    protected httpContext: HttpContext,
  ) {}

  async createToken(user: AuthUser) {
    return this.jwtService.sign(
      { user: user },
      { privateKey: process.env.JWT_SECRET },
    );
  }

  async checkToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token.replace('Bearer ', ''), {
        secret: process.env.JWT_SECRET,
      });
      return decoded.user;
    } catch (err) {
      return false;
    }
  }
}
