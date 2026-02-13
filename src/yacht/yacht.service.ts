import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateYachtDto, UpdateYachtDto } from './dto/yacht.dto';

@Injectable()
export class YachtService {
    constructor(private prismaService: PrismaService) { }

    async getAll() {
        return this.prismaService.yacht.findMany()
    }

    async getById(id: string) {
        return this.prismaService.yacht.findUnique({
            where: {
                id
            }
        })
    }

    async create(dto: CreateYachtDto, userId: string) {
        return this.prismaService.yacht.create({
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

    async update(id: string, dto: UpdateYachtDto) {
        return this.prismaService.yacht.update({
            where: {
                id
            },
            data: dto
        })
    }

    async delete(id: string) {
        return this.prismaService.yacht.delete({
            where: {
                id
            }
        })
    }
}
