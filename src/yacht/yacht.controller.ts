import { Controller, Param, Get, Post, UsePipes, ValidationPipe, Body, Put, Delete } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { YachtService } from './yacht.service'
import { CreateYachtDto, UpdateYachtDto } from './dto/yacht.dto'

@Controller('yacht')
export class YachtController {
    constructor(private readonly yachtService: YachtService) {}

    @Get()
    async getAll() {
        return await this.yachtService.getAll()
    }

    @Get('getById/:id')
    async getById(@Param('id') id: string) {
        return await this.yachtService.getById(id)
    }

    @Post('create')
    @Auth()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateYachtDto, @CurrentUser('id') userId: string) {
        return await this.yachtService.create(dto, userId)
    }

    @Put('update/:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() dto: UpdateYachtDto, @CurrentUser("id") userId: string) {
        return await this.yachtService.update(id, dto, userId)
    }

    @Delete('delete/:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async delete(@Param('id') id: string, @CurrentUser("id") userId: string) {
        return await this.yachtService.delete(id, userId)
    }
}
