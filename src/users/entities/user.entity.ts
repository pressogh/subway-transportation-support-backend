import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
	constructor(partial: Partial<UserEntity>) {
		Object.assign(this, partial);
	}

	@ApiProperty()
	id: number;

	@ApiProperty()
	email: string;

	@ApiProperty()
	provider: string;

	@ApiProperty()
	providerId: string;

	@ApiProperty()
	nickname: string | null;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty()
	role: string;

	@ApiProperty()
	isActive: boolean;

	@Exclude()
	hashedRefreshToken: string | null;

	@Exclude()
	refreshTokenExpiresAt: Date | null;
}
