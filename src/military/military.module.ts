import { Module } from '@nestjs/common';
import { MilitaryService } from './military.service';
import { MilitaryController } from './military.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MilitaryController],
  providers: [MilitaryService, PrismaService],
})
export class MilitaryModule {}
