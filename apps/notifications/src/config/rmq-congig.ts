import { ConfigModule, ConfigService } from "@nestjs/config";
import { IRMQServiceAsyncOptions } from "nestjs-rmq";
export const getRMQConfig = ():IRMQServiceAsyncOptions => ({
	inject : [ConfigService],
	imports : [ConfigModule],
	useFactory: async(configService: ConfigService) => ({
		exchangeName : configService.get('RMQ_EXCHANGE'),
		connections : [
			{
				login : configService.get('RMQ_LOGIN'),
				password : configService.get('RMQ_PASSWORD'),
				host : configService.get('RMQ_HOST'),
			}
		],
		queueName : 'second_queue',
		prefetchCount : 32,
		serviceName : 'email'
	})
})