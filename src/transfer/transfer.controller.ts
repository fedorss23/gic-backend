import { Controller, Param, Get, Post, UsePipes, ValidationPipe, Body, Put, Delete } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { TransferService } from './transfer.service'
import { CreateTransferDto, UpdateTransferDto } from './dto/transfer.dto'

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) {}

    @Get()
    async getAll() {
        return await this.transferService.getAll()
    }

    @Get('getById/:id')
    async getById(@Param('id') id: string) {
        return await this.transferService.getById(id)
    }

    @Post('create')
    @Auth()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateTransferDto, @CurrentUser('id') userId: string) {
        return await this.transferService.create(dto, userId)
    }

    @Put('update/:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() dto: UpdateTransferDto, @CurrentUser("id") userId: string) {
        return await this.transferService.update(id, dto, userId)
    }

    @Delete('delete/:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async delete(@Param('id') id: string, @CurrentUser("id") userId: string) {
        return await this.transferService.delete(id, userId)
    }
}
