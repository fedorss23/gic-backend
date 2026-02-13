import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto'

@Injectable()
export class ServiceService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return this.prismaService.service.findMany()
    }

    async getById(id: string) {
        return this.prismaService.service.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreateServiceDto, userId: string) {
        return this.prismaService.service.create({
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

    async update(id: string, dto: UpdateServiceDto) {
        return this.prismaService.service.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string) {
        return this.prismaService.service.delete({
            where: {
                id,
            },
        })
    }
}
