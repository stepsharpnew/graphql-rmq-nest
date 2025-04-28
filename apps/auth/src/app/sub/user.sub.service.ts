import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class UserSubService {
	private pubSub = new PubSub();
	
	async publish(eventName: string, payload: any) {
		this.pubSub.publish(eventName, payload);
		return '123'
	}

	getPubSub() {
		return this.pubSub;
	}

}
