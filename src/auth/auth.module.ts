import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { KakaoStrategy } from './kakao.strategy';

@Module({
	imports: [
		PrismaModule,
		PassportModule,
		ConfigModule,
		UsersModule,
		JwtModule.register({}),
	],
	controllers: [AuthController],
	providers: [AuthService, GoogleStrategy, KakaoStrategy, JwtStrategy],
})
export class AuthModule {}
