import { IsEmail } from 'class-validator';

export namespace PaymentCreate {
  export class Request {
    PublicId!:string
    
    Amount!: number;

    Currency!:string

    Scheme!: string

    Description?:string

    Email?:string
  }

  export class Response {
    Model !: {
      QrUrl : string,
      TransactionId : string
      Message:string
    }
    Success!:boolean
  }
}
