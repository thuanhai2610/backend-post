import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean  {
        const roles = this.reflector.get<String[]>('roles', context.getHandler());
        if(!roles || roles.length === 0) return true;
        const req = context.switchToHttp().getRequest();
        const user = req['user'];
        if (!user || roles.includes(user.role)) {
            throw new ForbiddenException('Insufficient role')
        }
        return true;
    }
}