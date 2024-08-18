import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CraeteUserDTO {

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}