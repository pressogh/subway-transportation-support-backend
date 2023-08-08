import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';

import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private usersService: UsersService,
		private jwtService: JwtService,
		private config: ConfigService,
	) {}

	async generateJwt(payload: { userId: number; username: string }) {
		return this.jwtService.sign(payload);
	}

	async signIn(user) {
		if (!user) {
			throw new NotFoundException(`No user found`);
		}

		const userExists = await this.usersService.findUserByUsername(
			user.username,
		);

		if (!userExists) {
			return this.signUp(user);
		}

		return this.generateJwt({
			userId: userExists.id,
			username: userExists.username,
		});
	}

	async signUp(user) {}
}
