import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateFlyingDto, UpdateFlyingDto } from './dto/flying.dto'

@Injectable()
export class FlyingService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return this.prismaService.flying.findMany()
    }

    async getById(id: string) {
        return this.prismaService.flying.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreateFlyingDto, userId: string) {
        return this.prismaService.flying.create({
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

    async update(id: string, dto: UpdateFlyingDto, userId: string) {
        const flying = await this.prismaService.flying.findUnique({
            where: {
                id,
            },
        })

        if (!flying) {
            throw new NotFoundException('flying was not found')
        }

        if (flying.userId !== userId) {
            throw new ForbiddenException('you are not allowed to update this flying')
        }

        return this.prismaService.flying.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string, userId: string) {
        const flying = await this.prismaService.flying.findUnique({
            where: {
                id,
            },
        })

        if (!flying) {
            throw new NotFoundException('flying was not found')
        }

        if (flying.userId !== userId) {
            throw new ForbiddenException('you are not allowed to delete this flying')
        }

        return this.prismaService.flying.delete({
            where: {
                id,
            },
        })
    }
}
