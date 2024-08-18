import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUrl, Length, Min } from 'class-validator';

export class PaymentResponseDto {
  @IsString()
  @Length(1, 255)
  @IsOptional()
  token_code?: string;

  @IsString()
  @Length(1, 10)
  @IsOptional()
  version?: string;

  @IsString()
  @Length(1, 150)
  @IsNotEmpty()
  order_code: string;

  @IsString()
  @Length(0, 255)
  @IsOptional()
  order_description?: string;

  @IsNumber()
  @Min(2000)
  @IsNotEmpty()
  amount: number;

  @IsString()
  @Length(3, 3)
  @IsNotEmpty()
  currency: string;

  @IsString()
  @Length(1, 20)
  @IsOptional()
  payment_method_code?: string;

  @IsString()
  @Length(0, 255)
  @IsOptional()
  payment_method_name?: string;

  @IsNumber()
  @IsOptional()
  sender_fee?: number;

  @IsNumber()
  @IsOptional()
  receiver_fee?: number;

  @IsString()
  @Length(1, 11)
  @IsNotEmpty()
  status: string;

  @IsUrl()
  @Length(1, 500)
  @IsNotEmpty()
  return_url: string;

  @IsUrl()
  @Length(1, 500)
  @IsNotEmpty()
  cancel_url: string;

  @IsUrl()
  @Length(0, 500)
  @IsOptional()
  notify_url?: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  checksum: string;
}