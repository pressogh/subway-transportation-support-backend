import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		UsersModule,
		ConfigModule.forRoot({ envFilePath: '.env' }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
