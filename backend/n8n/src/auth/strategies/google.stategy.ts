import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback, Profile } from "passport-google-oauth20";


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
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!,
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
        const { name, emails, photos, id } = profile;

        const user: GoogleUser = {
            email: emails?.[0].value ?? '',
            firstName: name?.givenName ?? '',
            lastName: name?.familyName ?? '',
            picture: photos?.[0].value ?? '',
            accessToken,
            provider: 'google',
            providerId: id,
        };

        done(null, user);
    }
}