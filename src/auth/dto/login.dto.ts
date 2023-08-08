import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty()
	username: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@ApiProperty()
	password: string;
}
