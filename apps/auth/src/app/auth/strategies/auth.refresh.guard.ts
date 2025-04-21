import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.cookies.refreshToken;
    // console.log(token);
    ctx.refreshToken = token;
    
    if (!token) return false;
	
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
      ctx.user = decoded;
      return true;
    } catch (e) {
      return false;
    }
  }
}