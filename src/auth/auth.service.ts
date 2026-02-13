import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignJWT } from 'jose';
import { UserService } from 'src/user/user.service';
import { sign } from './jwt';

@Injectable()
export class AuthService {
    constructor (private userService: UserService) {}

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByColumn({email})

        if (!user) {
            throw new UnauthorizedException('Invalid credential')
        }
        if (user?.password != password) {
            throw new UnauthorizedException()
        }

        const token = await sign({sub: user.id, name: user.name, email: user.email, role: user.role})
        
        return {access_token: token}
    }

    async signUp({name, email, password, imageUrl, role}): Promise<any> {
        const result = this.userService.create({name, email, password, imageUrl, role})
        return result
    }
}
