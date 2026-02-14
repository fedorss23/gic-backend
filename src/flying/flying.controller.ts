import { Controller, Param, Get, Post, UsePipes, ValidationPipe, Body, Put, Delete } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { FlyingService } from './flying.service'
import { CreateFlyingDto, UpdateFlyingDto } from './dto/flying.dto'

@Controller('flying')
export class FlyingController {
    constructor(private readonly flyingService: FlyingService) {}

    @Get()
    async getAll() {
        return await this.flyingService.getAll()
    }

    @Get('getById/:id')
    async getById(@Param('id') id: string) {
        return await this.flyingService.getById(id)
    }

    @Post('create')
    @Auth()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateFlyingDto, @CurrentUser('id') userId: string) {
        return await this.flyingService.create(dto, userId)
    }

    @Put('update/:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() dto: UpdateFlyingDto, @CurrentUser("id") userId: string) {
        return await this.flyingService.update(id, dto, userId)
    }

    @Delete('delete/:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async delete(@Param('id') id: string, @CurrentUser("id") userId: string) {
        return await this.flyingService.delete(id, userId)
    }
}
