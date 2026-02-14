import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateCarDto, UpdateCarDto } from './dto/car.dto'

@Injectable()
export class CarService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return await this.prismaService.car.findMany()
    }

    async getById(id: string) {
        return await this.prismaService.car.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreateCarDto, userId: string) {
        return await this.prismaService.car.create({
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

    async update(id: string, dto: UpdateCarDto, userId: string) {
        const car = await this.prismaService.car.findUnique({
            where: {
                id,
            },
        })

        if (!car) {
            throw new NotFoundException('car was not found')
        }

        if (car.userId !== userId) {
            throw new ForbiddenException('you are not allowed to update this car')
        }

        return await this.prismaService.car.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string, userId: string) {
        const car = await this.prismaService.car.findUnique({
            where: {
                id,
            },
        })

        if (!car) {
            throw new NotFoundException('car was not found')
        }

        if (car.userId !== userId) {
            throw new ForbiddenException('you are not allowed to delete this car')
        }

        return await this.prismaService.car.delete({
            where: {
                id,
            },
        })
    }
}
