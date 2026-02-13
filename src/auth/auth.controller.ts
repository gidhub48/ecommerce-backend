import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './authguard.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    async Login(
        @Body() body: any
    ): Promise<any> {
        const { email, password } = body
        return this.authService.signIn(email, password)
    }

    @Post('register')
    async Register(
        @Body() body: any
    ) {
        const { name, email, password, imageUrl, role } = body;

        return this.authService.signUp({
            name,
            email,
            password,
            imageUrl,
            role,
        });
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async Profile (@Req() req: any) {
        return req?.user
    }
}
