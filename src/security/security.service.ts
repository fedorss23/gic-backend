import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateSecutiryDto, UpdateSecurityDto } from './dto/security.dto'

@Injectable()
export class SecurityService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return await this.prismaService.security.findMany()
    }

    async getById(id: string) {
        return await this.prismaService.security.findUnique({
            where: {
                id,
            },
        })
    }

    async create(dto: CreateSecutiryDto, userId: string) {
        return await this.prismaService.security.create({
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

    async update(id: string, dto: UpdateSecurityDto, userId: string) {
        const security = await this.prismaService.security.findUnique({
            where: {
                id,
            },
        })

        if (!security) {
            throw new NotFoundException('security was not found')
        }

        if (security.userId !== userId) {
            throw new ForbiddenException('you are not allowed to update this security')
        }

        return await this.prismaService.security.update({
            where: {
                id,
            },
            data: dto,
        })
    }

    async delete(id: string, userId: string) {
        const security = await this.prismaService.security.findUnique({
            where: {
                id,
            },
        })

        if (!security) {
            throw new NotFoundException('security was not found')
        }

        if (security.userId !== userId) {
            throw new ForbiddenException('you are not allowed to delete this security')
        }

        return await this.prismaService.security.delete({
            where: {
                id,
            },
        })
    }
}
