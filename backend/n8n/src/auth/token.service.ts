import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async generateTokens(userId: string, email: string) {
        const payload = {
            id: userId,
            email
        }
        const [ar, rt] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m'
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d'
            })
        ]);
        return { accessToken: ar, refreshToken: rt };
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        await this.prisma.client.session.upsert({
            where: { refreshToken },
            update: { refreshToken },
            create: {
                userId,
                refreshToken
            }
        })
    }
}