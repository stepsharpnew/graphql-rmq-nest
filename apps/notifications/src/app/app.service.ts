import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
  private readonly transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_LOGIN, // замените на свой email
      pass: process.env.EMAIL_PASS, // замените на свой пароль или пароль приложения
    },
  });

  async handleUserCreated(@Payload() data: any) {
    if (!data || !data.email) {
      console.error('Email not found in the payload');
      return;
    }

    console.log(`Sending email to ${data.email}`);

    const mailOptions = {
      from: process.env.EMAIL_LOGIN,
      to: data.email,
      subject: 'Добро пожаловать!',
      text: 'Спасибо за регистрацию!',
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${data.email}`);
    } catch (error) {
      console.error(`Failed to send email to ${data.email}`, error);
    }
  }
}
