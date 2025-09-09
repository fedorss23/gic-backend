import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EducactionCreateDto, EducationUpdateDto } from './dto/education.dto';

@Injectable()
export class EducationService {

    constructor(private prisma: PrismaService) {}
    
        async get(userId: string) {
            return this.prisma.education.findMany({
                where: {
                    userId
                }
            })
        }
    
        async create(dto: EducactionCreateDto, userId: string) {
            return this.prisma.education.create({
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
    
        async update(dto: EducationUpdateDto, id: string) {
            return this.prisma.education.update({
                where: {
                    id
                },
                data: {
                    ...dto
                }
            })
        }
    
}
