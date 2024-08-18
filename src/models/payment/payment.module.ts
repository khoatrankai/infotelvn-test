import { Module } from '@nestjs/common';
import {  PaymentController } from './pament.controller';
import { PaymentService } from './payment.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { BookingService } from '../booking/booking.service';


@Module({
  imports: [PassportModule,
    JwtModule.register({
      secret: "Ef96EbFOPqeyCNhSHdnK14lyKwzWYQz3",
      signOptions:{expiresIn: "1h"}
    })
  ],
  controllers: [PaymentController],
  providers: [PaymentService,UserService,BookingService],
  exports: [PaymentService]
})
export class PaymentModule {}
