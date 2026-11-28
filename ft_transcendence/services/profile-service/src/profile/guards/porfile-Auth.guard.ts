import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ServiceUnavailableException,
} from '@nestjs/common';
import type { Request } from 'express';

interface AuthUser {
  id: number;
  userType?: string;
}

interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

@Injectable()
export class ProfileAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const token = request.headers.authorization;

    if (!token?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }

    const authUrl = process.env.AUTH_SERVICE_URL;

    if (!authUrl) {
      throw new ServiceUnavailableException('Auth URL not configured');
    }

    let response: Response;

    try {
        
      response = await fetch(`${authUrl}/auth/current-user`, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
        signal: AbortSignal.timeout(3007),
      });
    } catch {
      throw new ServiceUnavailableException(
        'Auth service is unavailable',
      );
    }

    console.log("Auth status:", response.status);
    console.log("Auth response:", await response.clone().text());
    console.log("yuossef");
    if (response.status === 401 || response.status === 403) {
        throw new UnauthorizedException('Invalid token');
    }
    console.log("yuossef");

    if (!response.ok) {
      throw new ServiceUnavailableException('Auth verification failed');
    }

    let user: AuthUser;

    try {
      user = (await response.json()) as AuthUser;
    } catch {
      throw new ServiceUnavailableException('Invalid Auth response');
    }

    if (!Number.isSafeInteger(user.id) || user.id <= 0) {
      throw new ServiceUnavailableException('Invalid user ID');
    }

    request.user = user;

    return true;
  }
}

