import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { GoogleStrategy } from './utils/google.strategy';


@Module({
  imports: [PassportModule,
    JwtModule.register({
      secret: "Ef96EbFOPqeyCNhSHdnK14lyKwzWYQz3",
      signOptions:{expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN']}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService,GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
