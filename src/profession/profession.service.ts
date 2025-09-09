import { Injectable } from '@nestjs/common';
import { ProfessionCreateDto, ProfessionUpdateDto } from './dto/profession.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfessionService {
    constructor(private prisma: PrismaService) { }

    async get(userId: string) {
        return this.prisma.profession.findMany({
            where: {
                userId
            }
        })
    }

    async create(dto: ProfessionCreateDto, userId: string) {
        return this.prisma.profession.create({
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

    async update(dto: ProfessionUpdateDto, id: string) {
        return this.prisma.profession.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }

}
