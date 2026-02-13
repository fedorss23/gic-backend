import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFlyingDto, UpdateFlyingDto } from './dto/flying.dto';

@Injectable()
export class FlyingService {
    constructor(private prismaService: PrismaService) { }

    async getAll() {
        return this.prismaService.flying.findMany()
    }

    async getById(id: string) {
        return this.prismaService.flying.findUnique({
            where: {
                id
            }
        })
    }

    async create(dto: CreateFlyingDto, userId: string) {
        return this.prismaService.flying.create({
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

    async update(id: string, dto: UpdateFlyingDto) {
        return this.prismaService.flying.update({
            where: {
                id
            },
            data: dto
        })
    }

    async delete(id: string) {
        return this.prismaService.flying.delete({
            where: {
                id
            }
        })
    }
}
