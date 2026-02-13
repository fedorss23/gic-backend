import { Module } from '@nestjs/common'
import { YachtService } from './yacht.service'
import { YachtController } from './yacht.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
    controllers: [YachtController],
    providers: [YachtService, PrismaService],
})
export class YachtModule {}
