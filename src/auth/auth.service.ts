import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { LoginDto, RegisterDto } from './dto/auth.dto'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { Response } from 'express'
import { IResultFromJwtVerify } from 'src/type.app'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
    EXPIRE_DAY_REFRESH_TOKEN = 1
    REFRESH_TOKEN_NAME = 'refreshToken'

    constructor(
        private jwt: JwtService,
        private userService: UserService,
    ) {}

    async login(dto: LoginDto) {
        const { password, ...user } = await this.validateUser(dto)

        const tokens = this.issueTokens(user.id)

        return {
            user,
            ...tokens,
        }
    }

    async register(dto: RegisterDto) {
        const oldUser = await this.userService.getByEmail(dto.email)

        if (oldUser) throw new BadRequestException('User already exists')

        const { password, ...user } = await this.userService.create(dto)

        const tokens = this.issueTokens(user.id)

        return {
            user,
            ...tokens,
        }
    }

    private issueTokens(userId: string) {
        const data = {
            id: userId,
        }

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        })

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d',
        })

        return { accessToken, refreshToken }
    }

    private async validateUser(dto: LoginDto): Promise<any> {
        const user = await this.userService.getByEmail(dto.email)

        // Поиск юзера в базе данных globe infinite

        // if (!user) {
        // 	const globeUser = await GetUser(dto.email)

        // 	if (globeUser) {
        // 		user = await this.userService.create({

        // 		})
        // 	} else {
        // 		throw new NotFoundException('User not found')
        // 	}
        // }

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const isValid = await compare(dto.password, user.password)

        if (!isValid) throw new UnauthorizedException('Invalid password')

        return user
    }

    async getNewTokens(refreshToken: string) {
        const result: IResultFromJwtVerify = await this.jwt.verifyAsync(refreshToken)

        if (!result) throw new UnauthorizedException('Invalid refresh token')

        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = (await this.userService.getById(result.id)) as any

        const tokens = this.issueTokens(user.id)

        return {
            user,
            ...tokens,
        }
    }

    addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: 'localhost',
            expires: expiresIn,
            secure: true,
            sameSite: 'none',
        })
    }

    removeRefreshTokenFromResponse(res: Response) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: 'localhost',
            expires: new Date(0),
            secure: true,
            sameSite: 'none',
        })
    }
}
