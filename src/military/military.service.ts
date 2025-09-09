import { Injectable } from '@nestjs/common';
import { MilitaryCreateDto, MilitaryUpdateDto } from './dto/military.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MilitaryService {

    constructor(private prisma: PrismaService) {}

    async get(userId: string) {
        return this.prisma.military.findMany({
            where: {
                userId
            }
        })
    }

    async create(dto: MilitaryCreateDto, userId: string) {
        return this.prisma.military.create({
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

    async update(dto: MilitaryUpdateDto, id: string) {
        return this.prisma.military.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }

}