import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TokenService } from './token.service';
import { GoogleUser } from './strategies/google.stategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private tokenService: TokenService) { }

    async validateOAuthUser(profile: GoogleUser) {
        try {
            const existingAccount = await this.prisma.client.account.findUnique({
                where: {
                    provider_providerAccountId: {
                        provider: profile.provider,
                        providerAccountId: profile.providerId,
                    },
                },
                include: { user: true },
            });

            if (existingAccount) return existingAccount.user;

            // 2. Account doesn't exist. Check if a user with this email exists
            let user = await this.prisma.client.user.findUnique({
                where: { email: profile.email },
            });

            if (!user) {
                // 3. Brand new user - Create them
                user = await this.prisma.client.user.create({
                    data: {
                        email: profile.email,
                        name: `${profile.firstName} ${profile.lastName}`.trim(),
                    },
                });
            }

            // 4. Link the social account to the user (new or existing)
            await this.prisma.client.account.create({
                data: {
                    userId: user.id,
                    provider: profile.provider,
                    providerAccountId: profile.providerId,
                },
            });

            return user;
        } catch (error) {
            console.error('OAuth Validation Error:', error);
            throw new InternalServerErrorException('Failed to authenticate with Google');
        }
    }

    async login(user: any) {
        // Generate industry-grade tokens (Access + Refresh)
        return this.tokenService.generateTokens(user.id, user.email);
    }
}