import { Module } from '@nestjs/common';
import { PhysiquesService } from './physiques.service';
import { PhysiquesController } from './physiques.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PhysiquesController],
  providers: [PhysiquesService, PrismaService],
})
export class PhysiquesModule {}
