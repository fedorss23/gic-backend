import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCarDto, UpdateCarDto } from './dto/car.dto';

@Injectable()
export class CarService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return this.prismaService.car.findMany()
    }

    async getById(id: string) {
        return this.prismaService.car.findUnique({
            where: {
                id
            }
        })
    }

    async create(dto: CreateCarDto, userId: string) {
        return this.prismaService.car.create({
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

    async update(id: string, dto: UpdateCarDto) {
        return this.prismaService.car.update({
            where: {
                id
            },
            data: dto
        })
    }

    async delete(id: string) {
        return this.prismaService.car.delete({
            where: {
                id
            }
        })
    }
}
