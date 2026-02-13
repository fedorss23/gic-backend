import { Module } from '@nestjs/common'
import { FlyingService } from './flying.service'
import { FlyingController } from './flying.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
    controllers: [FlyingController],
    providers: [FlyingService, PrismaService],
})
export class FlyingModule {}
