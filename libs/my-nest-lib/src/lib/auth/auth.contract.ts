import { IsEmail, IsString, IsOptional, Min, Max } from 'class-validator';
export namespace AuthLogin {
	export class Request {
		
	  @IsEmail()
	  email!: string;
	}
  
	export class Response {
		email!: string;
		text!:string
	}
  }