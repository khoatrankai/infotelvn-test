import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';


@Module({
  imports: [PassportModule,
    JwtModule.register({
      secret: "Ef96EbFOPqeyCNhSHdnK14lyKwzWYQz3",
      signOptions:{expiresIn: "1h"}
    })
  ],
  controllers: [BookingController],
  providers: [BookingService,UserService],
  exports: [BookingService]
})
export class BookingModule {}
