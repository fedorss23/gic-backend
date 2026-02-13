import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransferDto, UpdateTransferDto } from './dto/transfer.dto';


@Injectable()
export class TransferService {
    constructor(private prismaService: PrismaService) { }

    async getAll() {
        return this.prismaService.transfer.findMany()
    }

    async getById(id: string) {
        return this.prismaService.transfer.findUnique({
            where: {
                id
            }
        })
    }

    async create(dto: CreateTransferDto, userId: string) {
        return this.prismaService.transfer.create({
            data: {
                ...dto,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }

    async update(id: string, dto: UpdateTransferDto) {
        return this.prismaService.transfer.update({
            where: {
                id
            },
            data: dto
        })
    }

    async delete(id: string) {
        return this.prismaService.transfer.delete({
            where: {
                id
            }
        })
    }
}
