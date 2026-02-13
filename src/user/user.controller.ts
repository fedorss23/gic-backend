import { Controller, Get, UsePipes, ValidationPipe, Post, HttpCode, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Auth()
    async allUsers() {
        return this.userService.getAll()
    }

    @HttpCode(200)
    @Auth()
    @UsePipes(new ValidationPipe())
    @Post('update')
    async updateUser(@Body() dto: User) {
        return this.userService.update(dto)
    }

    @Get('profile')
    @Auth()
    async getProfile(@CurrentUser('email') email: string) {
        return this.userService.getByEmail(email)
    }
}
