import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		if (
			await this.prisma.user.findUnique({
				where: { email: createUserDto.email },
			})
		) {
			throw new ConflictException('이미 존재하는 이메일입니다.');
		}

		return this.prisma.user.create({
			data: createUserDto,
		});
	}

	async findAll() {
		return this.prisma.user.findMany();
	}

	async findOne(id: number) {
		return this.prisma.user.findUnique({
			where: { id },
		});
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		return this.prisma.user.update({
			where: { id },
			data: updateUserDto,
		});
	}

	async remove(id: number) {
		return this.prisma.user.delete({
			where: { id },
		});
	}

	async findByProviderId(providerId: string) {
		return this.prisma.user.findUnique({
			where: { providerId },
		});
	}

	async findByRefreshToken(refreshToken: string) {
		return this.prisma.user.findUnique({
			where: { hashedRefreshToken: refreshToken },
		});
	}
}
