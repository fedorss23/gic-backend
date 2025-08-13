import { Injectable, UsePipes, ValidationPipe, Post, HttpCode } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { PrismaService } from 'src/prisma.service';
import { PhysiquesDto } from './dto/physiques.dto';

@Injectable()
export class PhysiquesService {

    constructor (private prisma: PrismaService) {}

    
    async create(userId: string, dto: PhysiquesDto) {
        return this.prisma.physiques.create({
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
