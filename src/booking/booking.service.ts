import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto'

@Injectable()
export class BookingService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return this.prismaService.booking.findMany()
    }

    async getById(id: string) {
        return this.prismaService.booking.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreateBookingDto, userId: string) {
        return this.prismaService.booking.create({
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

    async update(id: string, dto: UpdateBookingDto) {
        return this.prismaService.booking.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string) {
        return this.prismaService.booking.delete({
            where: {
                id,
            },
        })
    }
}
