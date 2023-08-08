import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [PrismaModule, PassportModule, ConfigModule, UsersModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
