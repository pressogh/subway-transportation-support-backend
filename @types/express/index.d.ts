import { UserEntity } from '../../src/users/entities/user.entity';

declare global {
	namespace Express {
		interface Request extends Express.Request {
			user: UserEntity;
		}
	}
}

export {};
