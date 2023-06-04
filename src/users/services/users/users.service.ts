import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
	private users: User[] = [
		{
			userName: 'Danny',
			password: 'Danny'
		},
		{
			userName: 'Anna',
			password: 'Anna'
		},
		{
			userName: 'Alina',
			password: 'Alina'
		},
		{
			userName: 'Michael',
			password: 'Michael'
		},
	]

	getUsers(): Omit<User, 'password'>[] {
		return this.users.map((user) =>
			new SerializedUser(user));
	}

	getUserByUserName(username: string): User | undefined {
		return this.users.find(user => user.userName === username);
	}
}
