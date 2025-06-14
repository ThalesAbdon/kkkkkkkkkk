import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';
import { ROLES_KEY } from '../roles.decorator';
import { AuthService } from './auth.service';
import { HttpContext } from './http.context';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(HttpContext) private readonly httpContext: HttpContext,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;
    const decoded = await this.authService.checkToken(
      authorization?.split(' ')[1] ?? '',
    );
    if (!decoded?.user?.emailVerified) {
      throw new BadRequestException('User not verified!');
    }
    request['user'] = decoded.user;
    return requiredRoles.some((role) => decoded?.user?.type === role);
  }
}
