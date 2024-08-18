import { Body, Controller, Get, Post,Req,Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CraeteUserDTO } from './dto/create-user.dto';
import { Response,Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
  
  @Post('/sign-in')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  signIn(@Body() userDTO:CraeteUserDTO,@Res() res: Response){
    return this.authService.signIn(userDTO,res);
  }

  @Post('/refreshToken')
  refreshToken(@Res() res: Response,@Req() req:Request){
    return this.authService.refreshTokens(req,res);
  }
  @Get('/sign-in-google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(){

  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req,@Res() res){
    return this.authService.googleLogin(req,res)
  }
}
