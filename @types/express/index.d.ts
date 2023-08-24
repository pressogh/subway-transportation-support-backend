declare global {
	namespace Express {
		interface Request extends Express.Request {
			user: {
				email: string;
				provider: string;
				providerId: string;
			};
		}
	}
}

export {};
