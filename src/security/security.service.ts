import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSecutiryDto, UpdateSecurityDto } from './dto/security.dto';

@Injectable()
export class SecurityService {
    constructor(private prismaService: PrismaService) { }

    async getAll() {
        return this.prismaService.security.findMany()
    }

    async getById(id: string) {
        return this.prismaService.security.findUnique({
            where: {
                id
            }
        })
    }

    async create(dto: CreateSecutiryDto, userId: string) {
        return this.prismaService.security.create({
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

    async update(id: string, dto: UpdateSecurityDto) {
        return this.prismaService.security.update({
            where: {
                id
            },
            data: dto
        })
    }

    async delete(id: string) {
        return this.prismaService.security.delete({
            where: {
                id
            }
        })
    }
}
