import { Injectable, UseFilters } from '@nestjs/common';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      userName: 'Danny',
      password: 'Danny',
    },
    {
      id: 2,
      userName: 'Anna',
      password: 'Anna',
    },
    {
      id: 3,
      userName: 'Alina',
      password: 'Alina',
    },
    {
      id: 4,
      userName: 'Michael',
      password: 'Michael',
    },
  ];

  getUsers(): Omit<User, 'password'>[] {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUserName(username: string): User | undefined {
    return this.users.find((user) => user.userName === username);
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
