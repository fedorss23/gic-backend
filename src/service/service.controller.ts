import { Controller, Param, Get, Post, UsePipes, ValidationPipe, Body, Put, Delete } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ServiceService } from './service.service'
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto'

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) {}

    @Get()
    async getAll() {
        return await this.serviceService.getAll()
    }

    @Get('getById/:id')
    async getById(@Param('id') id: string) {
        return await this.serviceService.getById(id)
    }

    @Post('create')
    @Auth()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateServiceDto, @CurrentUser('id') userId: string) {
        return await this.serviceService.create(dto, userId)
    }

    @Put('update/:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() dto: UpdateServiceDto, @CurrentUser("id") userId: string) {
        return await this.serviceService.update(id, dto, userId)
    }

    @Delete('delete/:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async delete(@Param('id') id: string,  @CurrentUser("id") userId: string) {
        return await this.serviceService.delete(id, userId)
    }
}
