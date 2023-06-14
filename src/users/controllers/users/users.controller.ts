import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UserNotFoundException } from 'src/users/exceptions/user-not-found.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser, User } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private userService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(): Omit<User, 'password'>[] {
    return this.userService.getUsers();
  }

  @Get('/username/:username')
  @UseInterceptors(ClassSerializerInterceptor)
  getByUserByName(@Param('username') userName: string): User {
    const user = this.userService.getUserByUserName(userName);
    if (user) {
      return new SerializedUser(user);
    } else {
      throw new HttpException('user not found!', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/id/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  getById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.userService.getUserById(id);
    if (user) {
      return new SerializedUser(user);
    } else {
      throw new UserNotFoundException();
    }
  }
}
