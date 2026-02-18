import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback, Profile } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

export interface GoogleUser {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    accessToken: string;
    provider: string;
    providerId: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!,
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
        const { name, emails, photos, id } = profile;

        const googleUser: GoogleUser = {
            email: emails?.[0].value ?? '',
            firstName: name?.givenName ?? '',
            lastName: name?.familyName ?? '',
            picture: photos?.[0].value ?? '',
            accessToken,
            provider: 'google',
            providerId: id,
        };

        try {
            const user = await this.authService.validateOAuthUser(googleUser);
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
}