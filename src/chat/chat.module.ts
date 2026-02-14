import { Module } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatController } from './chat.controller'
import { ChatGateway } from './chat.gateway'
import { PrismaService } from 'src/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from 'src/auth/token/jwt.config'

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
        }),
    ],
    providers: [ChatService, ChatGateway, PrismaService],
    controllers: [ChatController],
    exports: [ChatService],
})
export class ChatModule {}
