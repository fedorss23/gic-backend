import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PhysiquesModule } from './physiques/physiques.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, 
    UserModule, PhysiquesModule
  ],
})
export class AppModule {}
