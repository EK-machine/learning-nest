import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
	findCustomer() {
		return {
			email: 'some@mail.com',
			createdAt: new Date(),
			id: 1,
		}
	}
}
