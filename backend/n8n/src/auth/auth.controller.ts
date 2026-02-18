import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req: Request) {
        // Guard redirects to Google
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        // req.user is now the database user object returned by AuthService.validateOAuthUser
        // However, typescript might not know the shape of req.user unless we cast it or extend Request.
        // Assuming req.user has the shape returned by validateOAuthUser.

        const user = req.user;
        const tokens = await this.authService.handleGoogleLogin(user);

        // Ensure FRONTEND_URL is set in environment
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

        res.redirect(`${frontendUrl}/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`);
    }
}
