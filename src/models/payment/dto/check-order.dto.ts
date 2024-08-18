import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CheckOrderDto {
  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  function: string;

  @IsString()
  @Length(1, 10)
  @IsNotEmpty()
  merchant_site_code: string;

  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  token_code: string;

  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  checksum: string;
}