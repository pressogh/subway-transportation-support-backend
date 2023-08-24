import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import dayjs from '../etc/dayjs';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async generateJwt(user: User) {
		const accessToken = this.jwtService.sign(
			{
				id: user.id,
				email: user.email,
			},
			{
				secret: this.configService.get('JWT_ACCESS_SECRET'),
				expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION_TIME'),
			},
		);

		const refreshToken = this.jwtService.sign(
			{
				id: user.id,
				email: user.email,
			},
			{
				secret: this.configService.get('JWT_REFRESH_SECRET'),
				expiresIn: this.configService.get(
					'JWT_REFRESH_EXPIRATION_TIME',
				),
			},
		);

		const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

		return {
			accessToken,
			refreshToken: hashedRefreshToken,
			refreshTokenExpiresAt: dayjs().tz().add(7, 'day').toDate(),
		};
	}

	async generateAccessToken(user: User) {
		return this.jwtService.sign(
			{
				id: user.id,
				email: user.email,
			},
			{
				secret: this.configService.get('JWT_ACCESS_SECRET'),
				expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION_TIME'),
			},
		);
	}
}
