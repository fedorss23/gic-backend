import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateYachtDto, UpdateYachtDto } from './dto/yacht.dto'

@Injectable()
export class YachtService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return await this.prismaService.yacht.findMany()
    }

    async getById(id: string) {
        return await this.prismaService.yacht.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreateYachtDto, userId: string) {
        return await this.prismaService.yacht.create({
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

    async update(id: string, dto: UpdateYachtDto, userId: string) {
        const yacht = await this.prismaService.yacht.findUnique({
            where: {
                id
            }
        })

        if (!yacht) {
            throw new NotFoundException("yacht was not found")
        }

        if (yacht.userId !== userId) {
            throw new ForbiddenException("you are not allowed to update this yacht")
        }

        return await this.prismaService.yacht.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string, userId: string) {
        const yacht = await this.prismaService.yacht.findUnique({
            where: {
                id
            }
        })

        if (!yacht) {
            throw new NotFoundException("yacht was not found")
        }

        if (yacht.userId !== userId) {
            throw new ForbiddenException("you are not allowed to delete this yacht")
        }

        return await this.prismaService.yacht.delete({
            where: {
                id,
            },
        })
    }
}
