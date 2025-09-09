import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PhysiquesModule } from './physiques/physiques.module';
import { MissionModule } from './mission/mission.module';
import { MilitaryModule } from './military/military.module';
import { EducationModule } from './education/education.module';
import { AwardModule } from './award/award.module';
import { DocumentModule } from './document/document.module';
import { ProfessionModule } from './profession/profession.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, 
    UserModule, PhysiquesModule, MissionModule, MilitaryModule, EducationModule, AwardModule, DocumentModule, ProfessionModule
  ],
})
export class AppModule {}
