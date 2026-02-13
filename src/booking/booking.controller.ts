import { Controller, Get, Param, Post, UsePipes, ValidationPipe, Body, Put, Delete } from '@nestjs/common'
import { BookingService } from './booking.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Get()
    async getAll() {
        return this.bookingService.getAll()
    }

    @Get('getById:id')
    async getById(@Param('id') id: string) {
        return this.bookingService.getById(id)
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    @Auth()
    async create(@Body() dto: CreateBookingDto, @CurrentUser('id') userId: string) {
        return this.bookingService.create(dto, userId)
    }

    @Put('update:id')
    @UsePipes(new ValidationPipe())
    @Auth()
    async update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
        return this.bookingService.update(id, dto)
    }

    @Delete('delete:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async delete(@Param('id') id: string) {
        return this.bookingService.delete(id)
    }
}
