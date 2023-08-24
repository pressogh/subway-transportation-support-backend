import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('KAKAO_CLIENT_ID'),
			clientSecret: configService.get('KAKAO_SECRET'),
			callbackURL: configService.get('KAKAO_CALLBACK_URL'),
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: any,
	) {
		const user = {
			provider: 'kakao',
			providerId: profile.id.toString(),
			email: profile._json.kakao_account.email,
		};

		done(null, user);
	}
}
