import {
	makeCounterProvider,
	makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';
import {
	methodLabel,
	statusCodeLabel,
	serviceLabel,
	routeLabel,
} from './constants';

export const responseTimeMilliseconds = 'response_time_milliseconds';
export const healthCheckResponseTimeProvider = makeHistogramProvider({
	name: responseTimeMilliseconds,
	help: 'response time metric for route in milliseconds',
	labelNames: [methodLabel, statusCodeLabel, routeLabel],
});

export const redisErrors = 'redis_error_counter';
export const redisErrorProvider = makeCounterProvider({
	name: redisErrors,
	help: 'amount of errors for redis connection',
	labelNames: [serviceLabel],
});

export const postgresErrors = 'postgres_error_counter';
export const postgresErrorProvider = makeCounterProvider({
	name: postgresErrors,
	help: 'amount of errors for postgres connection',
	labelNames: [serviceLabel],
});
