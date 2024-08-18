import { IsString, IsNumber, IsNotEmpty, IsOptional, IsEmail, IsPositive, IsIn, Length } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @Length(1, 10)
  @IsNotEmpty()
  merchant_site_code: string;

  @IsString()
  @Length(1, 150)
  @IsNotEmpty()
  order_code: string;

  @IsString()
  @Length(0, 255)
  @IsOptional()
  order_description?: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @Length(3, 3)
  @IsIn(['VND'])
  @IsNotEmpty()
  currency: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  buyer_fullname: string;

  @IsEmail()
  @Length(1, 255)
  @IsNotEmpty()
  buyer_email: string;

  @IsString()
  @Length(1, 11)
  @IsNotEmpty()
  buyer_mobile: string;

  @IsString()
  @Length(1, 500)
  @IsNotEmpty()
  buyer_address: string;

  @IsString()
  @Length(1, 500)
  @IsNotEmpty()
  return_url: string;

  @IsString()
  @Length(0, 500)
  @IsOptional()
  cancel_url?: string;

  @IsString()
  @Length(0, 500)
  @IsOptional()
  notify_url?: string;

  @IsString()
  @Length(2, 3)
  @IsIn(['vi', 'en'])
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsOptional()
  payment_method_code?: string;

  @IsString()
  @IsOptional()
  bank_code?: string;

  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  checksum: string;
}