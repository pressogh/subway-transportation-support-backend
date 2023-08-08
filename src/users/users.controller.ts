import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiCreatedResponse({ type: UserEntity })
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@ApiCreatedResponse({ type: UserEntity, isArray: true })
	async findAll() {
		const users = await this.usersService.findAll();
		return users.map((user) => new UserEntity(user));
	}

	@Get(':id')
	@ApiCreatedResponse({ type: UserEntity })
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return new UserEntity(await this.usersService.findOne(id));
	}

	@Patch(':id')
	@ApiCreatedResponse({ type: UserEntity })
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return new UserEntity(
			await this.usersService.update(id, updateUserDto),
		);
	}

	@Delete(':id')
	@ApiCreatedResponse({ type: UserEntity })
	async remove(@Param('id', ParseIntPipe) id: number) {
		return new UserEntity(await this.usersService.remove(id));
	}
}
