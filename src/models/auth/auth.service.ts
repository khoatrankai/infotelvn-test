import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt'
import { CraeteUserDTO } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,private userService:UserService){}
  getHello(): string {
    return 'Hello World!';
  }

  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    return hashedPassword;
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  async createFile(content:string): Promise<void> {
    const filePath = path.join(__dirname,'../../../..','/public/userTest/user.txt');
    fs.writeFileSync(filePath, content, { encoding: 'utf8' });
  }

  async readFile(): Promise<string> {
    const filePath = path.join(__dirname,'../../../..','/public/userTest/user.txt');
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  }

  async signIn(userDTO:CraeteUserDTO,@Res() res: Response){
    const dataTxt = await this.readFile();
    const dataArray = dataTxt.split('\n')
    const checkdata = dataArray.find((dt:any)=>{
      const dtArray = dt.split(' ')
      if(userDTO.email === dtArray[1]){
        return dt
      }
    })
    if(checkdata){
      const checkPass = await this.comparePassword(userDTO.password,checkdata.split(' ')[2])
      if(checkPass){
        const payload = { email: userDTO.email, sub: checkdata.split(' ')[0] };
        const accessToken = this.jwtService.sign(payload, { expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env['JWT_REFRESH_TOKEN_EXPIRES_IN'] });
        res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        });
  
        res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        });
        return res.json({
          message:'Đăng nhập thành công'
        })
      }else{
        return res.json({
          message:'Vui lòng kiểm tra lại mật khẩu'
        })
      }
    }
    return res.json({
      message: 'Thông tin đăng nhập không phù hợp',
      statusCode: 400
    })
  }
  async refreshTokens(req: Request, res: Response) {  
    try {
      const payload = this.jwtService.verify(req.cookies["refreshToken"], {
        secret: process.env['JWT_ACCESS_TOKEN_SECRET'],
      });

      const newAccessToken = this.jwtService.sign({ sub: payload.sub }, { expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] });
      // const newRefreshToken = this.jwtService.sign({ sub: payload.sub }, { expiresIn: "30d" });

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      
      // res.cookie('refreshToken', newRefreshToken, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'strict',
      // });

      return res.json({ message: 'Tokens refreshed' });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  
  async googleLogin(req,res: Response){
    if(!req.user){
      return 'Error login google'
    }
    await this.userService.signUp({email: req.user.email,password:'123456' })
    await this.signIn({email: req.user.email,password:'123456' },res)
    // return {
    //   message: 'Login success',
    //   user: req.user
    // }
    // return res.json({
    //   message: 'Login success',
    //   statusCode: 200,
    //   user: req.user
    // })
  }
  
}
