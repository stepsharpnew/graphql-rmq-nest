import {  IPaymentCreateReq, IPaymentCreateRes, PaymentCreate, TopicsEnum } from '@my-workspace/my-nest-lib';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RMQRoute } from 'nestjs-rmq';
import axios from 'axios'

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  @RMQRoute(TopicsEnum.PaymentCreate)
  async handleUserCreated(
    data: IPaymentCreateReq
  ): Promise<PaymentCreate.Response> {
    // if (!data || !data) {
    //   throw new HttpException(
    //     'Email not found in the payload',
    //     HttpStatus.NOT_FOUND
    //   );
    // }

    const paymentObj:IPaymentCreateReq = {
      PublicId: data.PublicId,
      Currency: data.Currency,
      Amount: data.Amount,
      Scheme:data.Scheme,
      Description: data.Description,
      Email: data.Email
    } 
    console.log(data);
    try {
      const response = await axios.post('https://api.cloudpayments.ru/payments/qr/sbp/link',
        paymentObj
      )
      // console.log(response.data.Model.QrUrl);
      return response.data
    } catch (error) {
      console.log(error);
    }
  }
}
