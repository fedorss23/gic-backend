import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto'

@Injectable()
export class BookingService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return await this.prismaService.booking.findMany()
    }

    async getById(id: string) {
        return await this.prismaService.booking.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreateBookingDto, userId: string) {
        return await this.prismaService.booking.create({
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

    async update(id: string, dto: UpdateBookingDto, userId: string) {
        const booking = await this.prismaService.booking.findUnique({
            where: {
                id,
            },
        })

        if (!booking) {
            throw new NotFoundException('booking was not found')
        }

        if (booking.userId !== userId) {
            throw new ForbiddenException('you are not allowed to update this booking')
        }

        return await this.prismaService.booking.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string, userId: string) {
        const booking = await this.prismaService.booking.findUnique({
            where: {
                id,
            },
        })

        if (!booking) {
            throw new NotFoundException('booking was not found')
        }

        if (booking.userId !== userId) {
            throw new ForbiddenException('you are not allowed to delete this booking')
        }

        return await this.prismaService.booking.delete({
            where: {
                id,
            },
        })
    }
}
