import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@ObjectType()
@Schema() 
export class User extends Document {
  @Field(() => ID) 
  _id: string;

  @Field()
  @Prop({ required: true, default: "" }) 
  email: string;

  @Field(()=> String)
  @Prop({ required: true, default: ""  }) 
  password: string;

  @Field({ nullable: true }) 
  @Prop() 
  description: string;

  @Field(() => String) 
  @Prop({ default: ""  }) 
  refresh: string;

  @Field(() => Number, { nullable: true }) 
  @Prop() 
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);