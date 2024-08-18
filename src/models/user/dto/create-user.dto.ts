import { ApiProperty } from '@nestjs/swagger';

export class CraeteUserDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}