import { Injectable } from '@nestjs/common';
import { DocumentDto } from './dto/document.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DocumentService {
    constructor(private prisma: PrismaService) {}

    async get(userId: string) {
        return this.prisma.document.findMany({
            where: {
                userId
            }
        })
    }

    async create(dto: DocumentDto, userId: string) {
        return this.prisma.document.create({
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

    async delete(id: string) {
        return this.prisma.document.delete({
            where: {
                id
            }
        })
    }
}
