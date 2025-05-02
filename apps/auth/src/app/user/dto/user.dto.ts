import { IPaymentCreateRes, PaymentCreate } from "@my-workspace/my-nest-lib";
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserResponse{
	@Field(()=>String, {nullable : true})
	id ?: string 

	@Field(()=>String, {nullable : true})
	email ?: string

	@Field(()=>Int, {nullable : true})
	age ?: number

	@Field(()=>String)
	accessToken ?: string

	@Field(()=>String)
	refreshToken ?: string

	@Field(()=>String)
	rmq_data ?: string
}



// export interface IPaymentCreateRes {
// 	Model: {
// 	  QrUrl: string;
// 	  TransactionId: string;
// 	  Message: string;
// 	};
// 	Success: boolean;
//   }
  
@ObjectType()
export class ModelRespose{
	@Field(()=>String, {nullable : true})
	QrUrl : string 

	@Field(()=>String, {nullable : true})
	TransactionId : string 

	@Field(()=>String, {nullable : true})
	Message : string 

}

@ObjectType()
export class PaymentResponse implements IPaymentCreateRes{
	@Field(()=>ModelRespose, {nullable : true})
	Model : ModelRespose 

	@Field(()=>Boolean, {nullable : true})
	Success : boolean
}


@InputType()
export class PaymentInputDTO implements PaymentCreate.Request{
	@Field(()=>String, {nullable : true})
	PublicId : string 

	@Field(()=>Int, {nullable : true})
	Amount : number

	@Field(()=>String, {nullable : true})
	Currency : string

	@Field(()=>String)
	Scheme : string

	@Field(()=>String)
	Description ?: string

	@Field(()=>String)
	Email ?: string
}



@InputType()
export class UserRegisterInput{
	@Field()
	email : string

	@Field()
	password : string

	@Field(()=> String,{nullable : true})
	description? : string

	@Field(()=> Int, {nullable : true})
	age? : number
}


@InputType()
export class UserLoginInput{
	@Field()
	email : string

	@Field()
	password : string

}