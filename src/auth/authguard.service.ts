import { CanActivate, ExecutionContext, Injectable, mixin } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { verify } from "./jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    
    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {

        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return false;
        }

        const token = authHeader.split(' ')[1];
        const payload = await verify(token);

        if (!payload) {
            return false;
        }

        request['user'] = payload;
        
        return true;
    }
}

export function RoleGuard(role: string) {
    @Injectable()
    class RoleGuardMixin implements CanActivate {
        async canActivate(context: ExecutionContext): 
           Promise<boolean> 
        {
            const request = context.switchToHttp().getRequest()
            
            if (!request.user) {
                const authHeader = request.headers.authorization;
                if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
                const token = authHeader.split(' ')[1];
                const payload = await verify(token);
                if (!payload) return false;
                request['user'] = payload;
            }

            return request.user?.role === role
        }
    }

    return mixin(RoleGuardMixin)
}


