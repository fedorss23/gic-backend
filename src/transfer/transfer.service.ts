import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateTransferDto, UpdateTransferDto } from './dto/transfer.dto'

@Injectable()
export class TransferService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return await this.prismaService.transfer.findMany()
    }

    async getById(id: string) {
        return await this.prismaService.transfer.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreateTransferDto, userId: string) {
        return await this.prismaService.transfer.create({
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

    async update(id: string, dto: UpdateTransferDto, userId: string) {
        const transfer = await this.prismaService.transfer.findUnique({
            where: {
                id,
            },
        })

        if (!transfer) {
            throw new NotFoundException('transfer was not found')
        }

        if (transfer.userId !== userId) {
            throw new ForbiddenException('you are not allowed to update this transfer')
        }

        return await this.prismaService.transfer.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string, userId: string) {
        const transfer = await this.prismaService.transfer.findUnique({
            where: {
                id,
            },
        })

        if (!transfer) {
            throw new NotFoundException('transfer was not found')
        }

        if (transfer.userId !== userId) {
            throw new ForbiddenException('you are not allowed to delete this transfer')
        }

        return await this.prismaService.transfer.delete({
            where: {
                id,
            },
        })
    }
}
