import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.token;
	
    if (!token) return false;
    
    try {
      const decoded = this.jwtService.verify(token);
      ctx.user = decoded; 
      return true;
    } catch (e) {
      return false;
    }
  }
}