import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetBanksDto {
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
  checksum: string;
}
