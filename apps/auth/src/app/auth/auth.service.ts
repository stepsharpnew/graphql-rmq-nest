import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserLoginInput, UserRegisterInput, UserResponse } from '../user/dto/user.dto';
import { User } from '../user/user.schema';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config'
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
	constructor(
		@Inject('NOTIFICATIONS_CLIENT') private readonly notificationsClient: ClientProxy,
		@InjectModel(User.name) private userModel : Model<User>,
		private jwtService: JwtService
	){}
	async registration(dto : UserRegisterInput):Promise<UserResponse>{
		const userConsist = await this.userModel.findOne({email : dto.email})
		if (userConsist) {
			throw new HttpException('Email already consist',HttpStatus.NOT_FOUND )
		}
		const hashPass = await bcrypt.hash(dto.password,4)
		let newUser = await new this.userModel({...dto, password : hashPass}).save()
		const tokens = await this.createToken(dto.email, newUser._id as string)
		newUser.refresh = tokens.refreshToken; 
		await this.updateRefreshToken(newUser._id, tokens.refreshToken)
		return tokens
	}


	async login(dto : UserLoginInput):Promise<UserResponse>{
		let userConsist = await this.userModel.findOne({email : dto.email})
		if (!userConsist) {
			throw new HttpException('User didnt fined',HttpStatus.NOT_FOUND )
		}
		const validPass = await bcrypt.compare(dto.password, userConsist.password)
		if (!validPass) {
			throw new HttpException('Password Incorrect',HttpStatus.FORBIDDEN )
		}
		const tokens = await this.createToken(dto.email, userConsist._id as string)
		userConsist.refresh = tokens.refreshToken; 
		await this.updateRefreshToken(userConsist._id, tokens.refreshToken)
		await this.notificationsClient.emit('user.created', {email : dto.email})
		return tokens
	}

	async updateRefreshToken(userId: string, refreshToken: string) : Promise<any> {
        const hashedRefreshToken = await bcrypt.hash(refreshToken,5);
        return await this.updateUser(userId, hashedRefreshToken);
    }


	async updateUser(userId : string, refreshToken : string ){
		const objectId = new Types.ObjectId(userId);
		let newUser = await this.userModel.findById(objectId).exec()
		newUser?.set('refresh',refreshToken).save()
	}



	async changeTokens(userId : string, refreshToken : string):Promise<UserResponse>{
		const objectId = new Types.ObjectId(userId);
		const user = await this.userModel.findById(objectId).exec()
		
		if (!user || !user.refresh) {
			throw new HttpException('Refresh dont exist',HttpStatus.FORBIDDEN )
		}
		// console.log('tokens',refreshToken, user.refresh);		
		const checkRefreshToken = await bcrypt.compare(refreshToken, user.refresh)
		if (!checkRefreshToken) {
			throw new HttpException('Token Invalid',HttpStatus.FORBIDDEN )
		}
		const userObject = user.toObject();
		const tokens = await this.createToken(user.email, userId)
		return {...tokens, ...userObject}
		
	}

	async createToken(email : string, id : string):Promise<any>{
		const payload = {
			sub: id,
			email,
		}
		return {
			accessToken : await this.jwtService.signAsync(payload,{secret : process.env.JWT_ACCESS_SECRET, expiresIn : '60s'}),
			refreshToken : await this.jwtService.signAsync(payload,{secret : process.env.JWT_REFRESH_SECRET,expiresIn : '7d'}),
			id
		}
	}
}
