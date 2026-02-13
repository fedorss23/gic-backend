import { Injectable } from '@nestjs/common'
import { CreatePlaceDto, UpdatePlaceDto } from './dto/place.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PlaceService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return this.prismaService.place.findMany()
    }

    async getById(id: string) {
        return this.prismaService.place.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreatePlaceDto, userId: string) {
        return this.prismaService.place.create({
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

    async update(id: string, dto: UpdatePlaceDto) {
        return this.prismaService.place.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string) {
        return this.prismaService.place.delete({
            where: {
                id,
            },
        })
    }
}
