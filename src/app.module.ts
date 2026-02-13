import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { CarModule } from './car/car.module'
import { SecurityModule } from './security/security.module'
import { PlaceModule } from './place/place.module'
import { BookingModule } from './booking/booking.module'
import { EventModule } from './event/event.module'
import { TransferModule } from './transfer/transfer.module'
import { FlyingModule } from './flying/flying.module'
import { YachtModule } from './yacht/yacht.module'
import { ServiceModule } from './service/service.module'
import { ChatModule } from './chat/chat.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        CarModule,
        SecurityModule,
        PlaceModule,
        BookingModule,
        EventModule,
        TransferModule,
        FlyingModule,
        YachtModule,
        ServiceModule,
        ChatModule,
    ],
})
export class AppModule {}
