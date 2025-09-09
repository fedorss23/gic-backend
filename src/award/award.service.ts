import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AwardCreateDto, AwardUpdateDto } from './dto/award.dto';

@Injectable()
export class AwardService {

    constructor(private prisma: PrismaService) { }

    async get(userId: string) {
        return this.prisma.award.findMany({
            where: {
                userId
            }
        })
    }

    async create(dto: AwardCreateDto, userId: string) {
        return this.prisma.award.create({
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

    async update(dto: AwardUpdateDto, id: string) {
        return this.prisma.award.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }

}
