import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
const pubSub = new PubSub();
@Module({
	imports : [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			csrfPrevention: false,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
			playground : false,
			context: ({ req, res }) => {
			const token = req?.headers?.authorization?.split(' ')[1] || null;
			return { req, res, token, cookies: req?.cookies || {} };
			},
			installSubscriptionHandlers : true,
			subscriptions: {
				'graphql-ws': {
				  onConnect: (context) => {
					console.log('Подключение WebSocket:');
					const authHeader = context.connectionParams?.Authorization;
					const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : null;
					return { token };
				  },
				},
			  },
			plugins : [
				ApolloServerPluginLandingPageLocalDefault({
					embed : {
						endpointIsEditable : true
					}
				})
			]
		  }),
		   
	],	
})
export class GraphqlModule {}
