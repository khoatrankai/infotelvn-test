import { Injectable,  } from '@nestjs/common';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class PaymentService {
  constructor(private readonly bookingService:BookingService){}
  getHello(): string {
    return 'Hello World!';
  }
  
  async findAmount(id:any){
    const dataAmount = await this.bookingService.findXml(id)
    return dataAmount.result_1.rateamount?.['amount']
  }

  
  
}
