import { AuthLogin, TopicsEnum } from '@my-workspace/my-nest-lib';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RMQRoute } from 'nestjs-rmq';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
  constructor(private readonly configService:ConfigService){}
  private readonly transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 587,
    secure: false,
    auth: {
      user: this.configService.get('EMAIL_LOGIN'), 
      pass: this.configService.get('EMAIL_PASS'), 
    },
  });

  
  @RMQRoute(TopicsEnum.AuthRegister)
  async handleUserCreated(data: AuthLogin.Request):Promise<AuthLogin.Response> {
    if (!data || !data.email) {
      console.error('Email not found in the payload');
      throw new HttpException('Email not found in the payload', HttpStatus.NOT_FOUND)
    } 
    console.log(`Sending email to ${data.email}`);
    const mailOptions = {
      from: this.configService.get('EMAIL_LOGIN'),
      to: data.email,
      subject: 'Добро пожаловать!',
      text: 'Спасибо за регистрацию!',
    };
    try {
      await this.transporter.sendMail(mailOptions);
      return {email : data.email, text: mailOptions.text}

    } catch (error) {
      console.error(`Failed to send email to ${data.email}`, error);
      throw new HttpException('Email not found in the payload', HttpStatus.NOT_FOUND)
    }
  }

  // @RMQRoute(TopicsEnum.AuthLogin)
  // async handleUserCreated(data: AuthLogin.Request):Promise<AuthLogin.Response> {
  //   if (!data || !data.email) {
  //     console.error('Email not found in the payload');
  //     throw new HttpException('Email not found in the payload', HttpStatus.NOT_FOUND)

  //   } 
  //   console.log(`Sending email to ${data.email}`);
  //   const mailOptions = {
  //     from: this.configService.get('EMAIL_LOGIN'),
  //     to: data.email,
  //     subject: 'Добро пожаловать!',
  //     text: 'Спасибо за регистрацию!',
  //   };
  //   try {
  //     await this.transporter.sendMail(mailOptions);
  //     return {email : data.email, text: mailOptions.text}

  //   } catch (error) {
  //     console.error(`Failed to send email to ${data.email}`, error);
  //     throw new HttpException('Email not found in the payload', HttpStatus.NOT_FOUND)
  //   }
  // }
}
