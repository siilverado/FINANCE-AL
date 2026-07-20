import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: `${configService.get('BACK_URL')}/auth/google/callback`,
      scope: ['profile', 'email'],
      profileFields: ['id', 'displayName', 'name', 'emails', 'picture.type(large)'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const { given_name, family_name, email, picture } = profile._json;

    const user = {
      firstName: given_name,
      lastName: family_name,
      email,
      image: picture,
      accessToken,
    };
    return done(null, user);
  }
}
