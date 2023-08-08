import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
