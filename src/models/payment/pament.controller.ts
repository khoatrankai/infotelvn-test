import { Body, Controller, Get, Param, Post,Query,Req,Res, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentResponseDto } from './dto/payment-res.dto';
import { CheckOrderDto } from './dto/check-order.dto';
import { GetBanksDto } from './dto/get-bank.dto';


@ApiTags('payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getHello(): string {
    return this.paymentService.getHello();
  }
  
  @UseGuards(JwtAuthGuard)
  @Post(':confirmation_no')
  async initiatePayment(
    @Param('confirmation_no') confirmationNo: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const amount = await this.paymentService.findAmount(confirmationNo)
      return res.json({amount: amount,code:200})
    } catch (error) {
      return res.json({error,code:400})
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  async createOrder(@Body() createOrderDTO:CreateOrderDto) {
    try {
      console.log(createOrderDTO)
      return {
        result_code: '0000',
        result_message:'',
        result_data:{
          checkout_url:'',
          token_code:''
        }
      }
    } catch (error) {
      return {
        result_code: '0001',
        result_message:'',
        result_data:{
          checkout_url:'',
          token_code:''
        }
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('payment-response')
  paymentResponse(@Query() queryPaymentRes:PaymentResponseDto 
  ) {
    console.log(queryPaymentRes)
    return {"result_code":"0000","result_message":"OK"};
  }
 
  @UseGuards(JwtAuthGuard)
  @Post('check-order')
  async checkOrder(@Body() checkOrderDTO:CheckOrderDto) {
    try {
      console.log(checkOrderDTO)
      return {
        "result_code": "0000",
        "result_message": "Success",
        "result_data": [
          {
            "token_code": "1234567890",
            "version": "1.0",
            "order_code": "ORD123456",
            "order_description": "Order description goes here",
            "amount": 25000.00,
            "sender_fee": 500.00,
            "receiver_fee": 200.00,
            "currency": "VND",
            "return_url": "https://merchant.com/success",
            "cancel_url": "https://merchant.com/cancel"
          }
        ]
      }
    } catch (error) {
      return {
        "result_code": "0001",
        "result_message": "Fail",
        "result_data": [
          {
            
          }
        ]
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('get-bank')
  async getBank(@Body() getBankDto:GetBanksDto) {
    try {
      console.log(getBankDto)
      return {
        "result_code": "0000",
        "result_message": "Success",
       
      }
    } catch (error) {
      return {
        "result_code": "0001",
        "result_message": "Fail",
      }
    }
  }
}
