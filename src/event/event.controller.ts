import { Controller, Put, Get, Post, UsePipes, ValidationPipe, Body, Param, Delete } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { EventService } from './event.service'
import { CreateEventDto, UpdateEventDto } from './dto/event.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get()
    async getAll() {
        return this.eventService.getAll()
    }

    @Get('getById:id')
    async getById(@Param('id') id: string) {
        return this.eventService.getById(id)
    }

    @Post('create')
    @Auth()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: CreateEventDto, @CurrentUser('id') userId: string) {
        return this.eventService.create(dto, userId)
    }

    @Put('update:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
        return this.eventService.update(id, dto)
    }

    @Delete('delete:id')
    @Auth()
    @UsePipes(new ValidationPipe())
    async delete(@Param('id') id: string) {
        return this.eventService.delete(id)
    }
}
