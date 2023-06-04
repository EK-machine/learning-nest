import { ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, UseInterceptors } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser, User } from 'src/users/types';

@Controller('users')
export class UsersController {
	constructor(@Inject('USER_SERVICE') private userService: UsersService) { }

	@Get()
	@UseInterceptors(ClassSerializerInterceptor)
	getUsers(): Omit<User, "password">[] {
		return this.userService.getUsers();
	}

	@Get('/:username')
	@UseInterceptors(ClassSerializerInterceptor)
	getByUserByName(@Param('username') userName: string): User {
		const user = this.userService.getUserByUserName(userName);
		if (user) {
			return new SerializedUser(user)
		} else {
			throw new HttpException('user not found!', HttpStatus.BAD_REQUEST);
		}
	}
}
