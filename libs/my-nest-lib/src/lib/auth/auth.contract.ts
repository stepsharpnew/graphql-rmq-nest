import { IsEmail } from 'class-validator';
export namespace AuthLogin {
  export class Request {
    @IsEmail()
    email!: string;
  }

  export class Response {
    email!: string;
    text!: string;
  }
}
