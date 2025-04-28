import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

export const createRmqClient = (queue: string, options: { url?: string } = {}): ClientProxy => {
  return ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
	  urls: [options.url || process.env['RABBITMQ_URL'] || 'amqp://localhost:5672'],
      queue,
      queueOptions: { durable: true },
    },
  });
};