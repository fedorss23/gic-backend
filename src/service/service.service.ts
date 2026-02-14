import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto'

@Injectable()
export class ServiceService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return await this.prismaService.service.findMany()
    }

    async getById(id: string) {
        return await this.prismaService.service.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreateServiceDto, userId: string) {
        return await this.prismaService.service.create({
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

    async update(id: string, dto: UpdateServiceDto, userId: string) {
        const service = await this.prismaService.service.findUnique({
            where: {
                id
            }
        })

        if (!service) {
            throw new NotFoundException("service was not found")
        }

        if (service.userId !== userId) {
            throw new ForbiddenException("you are not allowed to update this service")
        }

        return  await this.prismaService.service.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string, userId: string) {
        const service = await this.prismaService.service.findUnique({
            where: {
                id
            }
        })

        if (!service) {
            throw new NotFoundException("service was not found")
        }

        if (service.userId !== userId) {
            throw new ForbiddenException("you are not allowed to delete this service")
        }

        return await this.prismaService.service.delete({
            where: {
                id,
            },
        })
    }
}
