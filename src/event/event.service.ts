import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateEventDto, UpdateEventDto } from './dto/event.dto'

@Injectable()
export class EventService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return this.prismaService.event.findMany()
    }

    async getById(id: string) {
        return this.prismaService.event.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreateEventDto, userId: string) {
        return this.prismaService.event.create({
            data: {
                ...dto,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        })
    }

    async update(id: string, dto: UpdateEventDto, userId: string) {
        const event = await this.prismaService.event.findUnique({
            where: {
                id,
            },
        })

        if (!event) {
            throw new NotFoundException('event was not found')
        }

        if (event.userId !== userId) {
            throw new ForbiddenException('you are not allowed to update this event')
        }

        return this.prismaService.event.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string, userId: string) {
        const event = await this.prismaService.event.findUnique({
            where: {
                id,
            },
        })

        if (!event) {
            throw new NotFoundException('event was not found')
        }

        if (event.userId !== userId) {
            throw new ForbiddenException('you are not allowed to delete this event')
        }

        return this.prismaService.event.delete({
            where: {
                id,
            },
        })
    }
}
