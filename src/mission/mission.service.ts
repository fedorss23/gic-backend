import { Injectable } from '@nestjs/common';
import { MissionCreateDto, MissionUpdateDto } from './dto/mission.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MissionService {

    constructor(private prisma: PrismaService) {}

    async get(userId: string) {
        return this.prisma.mission.findMany({
            where: {
                userId
            }
        })
    }

    async create(dto: MissionCreateDto, userId: string) {
        return this.prisma.mission.create({
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

    async update(dto: MissionUpdateDto, id: string) {
        return this.prisma.mission.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }

}
