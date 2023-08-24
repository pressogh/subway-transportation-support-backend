import {
	Controller,
	Get,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCookieAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

import dayjs from '../etc/dayjs';
import { KakaoGuard } from './kakao.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UsersService,
		private readonly configService: ConfigService,
	) {}

	@Get('google/login')
	@ApiCreatedResponse()
	@UseGuards(GoogleOauthGuard)
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async googleAuth() {}

	@Get('google/callback')
	@ApiCreatedResponse()
	@UseGuards(GoogleOauthGuard)
	async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore : 이미 @/types/express/index에 선언되어 있음
		const loginUser: {
			email: string;
			provider: string;
			providerId: string;
		} = req.user;

		let user = await this.userService.findByProviderId(
			loginUser.providerId,
		);

		if (!user)
			user = await this.userService.create(loginUser as CreateUserDto);

		const { accessToken, refreshToken, refreshTokenExpiresAt } =
			await this.authService.generateJwt(user);

		const updateDto = {
			hashedRefreshToken: refreshToken,
			refreshTokenExpiresAt: refreshTokenExpiresAt,
		};

		await this.userService.update(user.id, updateDto);

		res.cookie('accessToken', accessToken);
		res.cookie('refreshToken', refreshToken);

		res.redirect(this.configService.get('DOMAIN'));
	}

	@Get('kakao/login')
	@UseGuards(KakaoGuard)
	@ApiCreatedResponse()
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async kakaoAuth() {}

	@Get('kakao/callback')
	@UseGuards(KakaoGuard)
	@ApiCreatedResponse()
	async kakaoAuthCallback(@Req() req: Request, @Res() res: Response) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore : 이미 @/types/express/index에 선언되어 있음
		const loginUser: {
			email: string;
			provider: string;
			providerId: string;
		} = req.user;

		let user = await this.userService.findByProviderId(
			loginUser.providerId,
		);

		if (!user)
			user = await this.userService.create(loginUser as CreateUserDto);

		const { accessToken, refreshToken, refreshTokenExpiresAt } =
			await this.authService.generateJwt(user);

		const updateDto = {
			hashedRefreshToken: refreshToken,
			refreshTokenExpiresAt: refreshTokenExpiresAt,
		};

		await this.userService.update(user.id, updateDto);

		res.cookie('accessToken', accessToken);
		res.cookie('refreshToken', refreshToken);

		res.redirect(this.configService.get('DOMAIN'));
	}

	@Post('refresh')
	@ApiCookieAuth()
	async refresh(@Req() req: Request, @Res() res: Response) {
		const { refreshToken } = req.cookies;

		const user = await this.userService.findByRefreshToken(refreshToken);

		if (!user) throw new UnauthorizedException();

		if (dayjs(user.refreshTokenExpiresAt).isBefore(dayjs().tz().format())) {
			throw new UnauthorizedException();
		}

		const accessToken = await this.authService.generateAccessToken(user);

		res.cookie('accessToken', accessToken);
		res.send({ accessToken });
	}
}
