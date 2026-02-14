import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserCreate } from './dto/user.dto'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return await this.prismaService.user.findMany()
    }

    async getByEmail(email: string) {
        return await this.prismaService.user.findUnique({
            where: {
                email,
            },
        })
    }

    async getById(userId: string) {
        return await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        })
    }

    async create(dto: UserCreate) {
        const user = {
            ...dto,
            password: await hash(dto.password, 5),
        } as User

        return await this.prismaService.user.create({ data: user })
    }

    async update(dto: User) {
        let data = dto

        if (dto.password) {
            data = { ...dto, password: await hash(dto.password, 5) }
        }

        return await this.prismaService.user.update({
            where: {
                email: dto.email,
            },
            data,
        })
    }
}
