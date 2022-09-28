import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import configuration from './config/configuration';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { provideRedis } from './providers/redis';
import { providePostgres } from './providers/postgres';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import {
	healthCheckResponseTimeProvider,
	postgresErrorProvider,
	redisErrorProvider,
} from './monitoring/metrics';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: providePostgres,
			dataSourceFactory: async (options) => {
				return new DataSource(options).initialize();
			},
		}),
		RedisModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: provideRedis,
		}),
		PrometheusModule.register({
			path: '/metrics',
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		healthCheckResponseTimeProvider,
		redisErrorProvider,
		postgresErrorProvider,
	],
})
export class AppModule {}
