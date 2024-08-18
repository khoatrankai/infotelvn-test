import { Controller, Get, Param,Req,Res, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  getHello(): string {
    return this.bookingService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':confirmation_no')
  async initiatePayment(
    @Param('confirmation_no') confirmationNo: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
   
     return res.json(await this.bookingService.findXml(confirmationNo))
  }
  
}
