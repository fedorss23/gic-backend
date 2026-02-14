import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { CreatePlaceDto, UpdatePlaceDto } from './dto/place.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PlaceService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return await this.prismaService.place.findMany()
    }

    async getById(id: string) {
        return await this.prismaService.place.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreatePlaceDto, userId: string) {
        return await this.prismaService.place.create({
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

    async update(id: string, dto: UpdatePlaceDto, userId: string) {
        const place = await this.prismaService.place.findUnique({
            where: {
                id,
            },
        })

        if (!place) {
            throw new NotFoundException('place was not found')
        }

        if (place.userId !== userId) {
            throw new ForbiddenException('you are not allowed to update this place')
        }

        return await this.prismaService.place.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string, userId: string) {
        const place = await this.prismaService.place.findUnique({
            where: {
                id,
            },
        })

        if (!place) {
            throw new NotFoundException('place was not found')
        }

        if (place.userId !== userId) {
            throw new ForbiddenException('you are not allowed to delete this place')
        }

        return await this.prismaService.place.delete({
            where: {
                id,
            },
        })
    }
}
