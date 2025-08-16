import { Injectable, UsePipes, ValidationPipe, Post, HttpCode } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { PrismaService } from 'src/prisma.service';
import { PhysiquesDto } from './dto/physiques.dto';
import { Physiques } from '@prisma/client';

@Injectable()
export class PhysiquesService {

    constructor (private prisma: PrismaService) {}

    
    async create(userId: string, dto: PhysiquesDto) {
        const dataset = {
            growth: dto.growth,
            hairColor: dto.hairColor,
            weight: dto.weight,
            eyeColor: dto.eyeColor
        }

        return this.prisma.physiques.create({
            data: {
                ...dataset,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }

    async update(userId: string, dto: PhysiquesDto) {
        return this.prisma.physiques.update({
            where: {
                userId,
            },
            data: dto
        })
    }

    async delete(userId: string) {
        return this.prisma.physiques.delete({
            where: {
                userId
            }
        })
    }
}
