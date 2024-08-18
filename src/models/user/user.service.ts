import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import * as fs from 'fs';
import * as path from 'path';
import { CraeteUserDTO } from './dto/create-user.dto';
@Injectable()
export class UserService {
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

  async createUserTxt(){
     await this.createFile('0 admin 123456')
     return {
      statusCode:'201',
      result: 'success txt user'
     }
  }
  async signUp(createUserDTO:CraeteUserDTO){
    const dataTxt = await this.readFile();
    const dataArray = dataTxt.split('\n')
    const hashPass = await this.hashPassword(createUserDTO.password)
    const checkdata = dataArray.find((dt:any)=>{
      const dtArray = dt.split(' ')
      if(createUserDTO.email === dtArray[1]){
        return dt
      }
    })
    if(checkdata){
      return {
        error: 'Email has been used',
        statusCode: 400
      }
    }
    this.createFile(dataTxt+'\n'+dataArray.length+' '+createUserDTO.email+' '+hashPass)
    return {
      message: 'Create success',
      statusCode:201
    }
  }
  
  async findOne(email:string){
    const dataTxt = await this.readFile();
    const dataArray = dataTxt.split('\n')
    const checkdata = dataArray.find((dt:any)=>{
      const dtArray = dt.split(' ')
      if(email === dtArray[1]){
        return dt
      }
    })
    if(checkdata){
      return{email: checkdata.split(' ')[1],password: checkdata.split(' ')[2]}
    }
    return undefined
  }
  
}
