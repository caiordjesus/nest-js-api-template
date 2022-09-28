import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Logger,
	UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTimeInterceptor } from './interceptors/responseTime.interceptor';

@Controller('healthcheck')
@UseInterceptors(ResponseTimeInterceptor)
export class AppController {
	private readonly logger = new Logger(AppController.name);
	constructor(private readonly appService: AppService) {}

	@Get()
	async getHealthCheck(): Promise<string> {
		const isHealthy = await this.appService.healthCheck();
		this.logger.log(`Service is healthy? ${isHealthy}`);
		if (isHealthy) return 'Service is on';

		throw new HttpException(
			'Service is off. See logs for details',
			HttpStatus.INTERNAL_SERVER_ERROR,
		);
	}
}
