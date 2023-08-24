import {
	IsBoolean,
	IsDate,
	IsEmail,
	IsNotEmpty,
	IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty()
	email: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	provider: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	providerId: string;

	@IsString()
	@ApiProperty()
	nickname: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	role: string;

	@IsBoolean()
	@IsNotEmpty()
	@ApiProperty()
	isActive: boolean;

	@IsDate()
	@IsNotEmpty()
	@ApiProperty()
	createdAt: Date;

	@IsString()
	@ApiProperty()
	hashedRefreshToken: string;

	@IsDate()
	@ApiProperty()
	refreshTokenExpiresAt: Date;
}
