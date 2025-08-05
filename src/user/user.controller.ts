import { Controller, Get, UsePipes, ValidationPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async allUsers() {
    return this.userService.getAll()
  }

  @Post()
  async updateUser(dto: User) {
    return this.userService.update(dto)
  }
}
