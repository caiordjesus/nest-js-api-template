import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { postgresErrors, redisErrors } from './monitoring/metrics';

@Injectable()
export class AppService {
	private readonly logger = new Logger(AppService.name);

	constructor(
		@InjectDataSource() private readonly connection: DataSource,
		@InjectRedis() private readonly redisClient: Redis,
		@InjectMetric(redisErrors) public redisErrorCounter: Counter<string>,
		@InjectMetric(postgresErrors) public postgresErrorCounter: Counter<string>,
	) {}

	async healthCheck(): Promise<boolean> {
		try {
			await this.redisClient.ping();
		} catch (err) {
			this.logger.error('Redis connection is off!', err);
			this.redisErrorCounter.labels(AppService.name).inc();
			return false;
		}
		this.logger.debug('redis connection OK');

		try {
			await this.connection.query('select 1');
		} catch (err) {
			this.logger.error('Postgres connection is off!', err);
			this.postgresErrorCounter.labels(AppService.name).inc();
			return false;
		}
		this.logger.debug('Postgres connection OK');

		return true;
	}
}
