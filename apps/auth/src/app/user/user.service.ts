import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserLoginInput, UserRegisterInput, UserResponse } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';
import { Context } from '@nestjs/graphql';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel : Model<User>,
		private readonly authService : AuthService
	){}

	async registration(dto : UserRegisterInput):Promise<UserResponse>{
		const tokens = await this.authService.registration(dto)
		const { password, ...rest } = dto;
		return {...tokens, ...rest}
	}

	async login(dto : UserLoginInput):Promise<UserResponse>{
		const tokens = await this.authService.login(dto)
		const { password, ...rest } = dto;
		return {...tokens, ...rest}
	}

	async getUser():Promise<User[]>{
		const users = await this.userModel.find().exec()
		return users
	}

	async getMe(userId : string):Promise<User | null>{
		const user = await this.userModel.findOne({_id : userId})
		return user
	}

	async refresh(id : string,refreshToken : string):Promise<UserResponse>{
		const info = await this.authService.changeTokens(id, refreshToken)
		return info
	}
}
