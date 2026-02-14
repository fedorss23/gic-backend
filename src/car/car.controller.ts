import { Controller, Param, Get, Post, UsePipes, ValidationPipe, Body, Put, Delete } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CarService } from './car.service'
import { CreateCarDto, UpdateCarDto } from './dto/car.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('car')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @Get()
    async getAll() {
        return await this.carService.getAll()
    }

    @Get('getById/:id')
    async getById(@Param('id') id: string) {
        return await this.carService.getById(id)
    }

    @Post('create')
    @Auth()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateCarDto, @CurrentUser('id') userId: string) {
        return await this.carService.create(dto, userId)
    }

    @Put('update/:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() dto: UpdateCarDto, @CurrentUser("id") userId: string) {
        return await this.carService.update(id, dto, userId)
    }

    @Delete('delete/:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async delete(@Param('id') id: string, @CurrentUser("id") userId: string) {
        return await this.carService.delete(id, userId)
    }
}
