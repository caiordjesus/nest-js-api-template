import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Histogram } from 'prom-client';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { responseTimeMilliseconds } from '../monitoring/metrics';
import {
	statusCodeLabel,
	methodLabel,
	routeLabel,
} from '../monitoring/constants';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
	constructor(
		@InjectMetric(responseTimeMilliseconds)
		public responseTime: Histogram<string>,
	) {}

	/* eslint-disable
        @typescript-eslint/no-explicit-any
     */
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const responseTimeTimerEnd = this.responseTime.startTimer();

		const responseTimerParams = {};
		responseTimerParams[methodLabel] = 'GET';
		responseTimerParams[routeLabel] = context
			.switchToHttp()
			.getRequest().originalUrl;

		return next.handle().pipe(
			tap(() => {
				responseTimerParams[statusCodeLabel] = context
					.switchToHttp()
					.getResponse().statusCode;
				return responseTimeTimerEnd(responseTimerParams);
			}),
			catchError((err) => {
				responseTimerParams[statusCodeLabel] = '503';
				responseTimeTimerEnd(responseTimerParams);

				throw err;
			}),
		);
	}
}
