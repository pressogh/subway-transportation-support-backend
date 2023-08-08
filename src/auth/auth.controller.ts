import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('google/login')
	@UseGuards(GoogleOauthGuard)
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async googleAuth() {}

	@Get('google/callback')
	@UseGuards(GoogleOauthGuard)
	googleAuthCallback(@Req() req: Request, @Res() res: Response) {
		const token =
	}
}
