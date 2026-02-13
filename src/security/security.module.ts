import { Module } from '@nestjs/common'
import { SecurityService } from './security.service'
import { SecurityController } from './security.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
    controllers: [SecurityController],
    providers: [SecurityService, PrismaService],
})
export class SecurityModule {}
