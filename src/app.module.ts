import { Module } from '@nestjs/common';

import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './models/payment/payment.module';
import { BookingModule } from './models/booking/booking.module';

@Module({
  imports: [PaymentModule,BookingModule,AuthModule,UserModule,ConfigModule.forRoot({
    isGlobal: true, 
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
