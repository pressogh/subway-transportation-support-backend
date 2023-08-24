import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, VerifyCallback, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('GOOGLE_CLIENT_ID'),
			clientSecret: configService.get('GOOGLE_SECRET'),
			callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
			scope: ['profile', 'email'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	) {
		const { id, emails } = profile;
		const user = {
			provider: 'google',
			providerId: id,
			email: emails[0].value,
		};

		done(null, user);
	}
}
