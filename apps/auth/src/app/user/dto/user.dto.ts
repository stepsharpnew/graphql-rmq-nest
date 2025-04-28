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