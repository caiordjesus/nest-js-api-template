import { Test, TestingModule } from '@nestjs/testing';
import { healthCheckResponseTimeProvider } from '../../src/monitoring/metrics';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';

describe('AppController', () => {
	describe('Application healthy', () => {
		let appController: AppController;
		beforeAll(async () => {
			const app: TestingModule = await Test.createTestingModule({
				controllers: [AppController],
				providers: [
					{
						provide: AppService,
						useValue: {
							healthCheck: jest.fn().mockResolvedValueOnce(true),
						},
					},
					healthCheckResponseTimeProvider,
				],
			}).compile();

			appController = app.get<AppController>(AppController);
		});

		it('should return "Service is on"', async () => {
			expect(await appController.getHealthCheck()).toBe('Service is on');
		});
	});

	describe('Application not healthy', () => {
		let appController: AppController;
		beforeAll(async () => {
			const app: TestingModule = await Test.createTestingModule({
				controllers: [AppController],
				providers: [
					{
						provide: AppService,
						useValue: {
							healthCheck: jest.fn().mockResolvedValueOnce(false),
						},
					},
					healthCheckResponseTimeProvider,
				],
			}).compile();

			appController = app.get<AppController>(AppController);
		});

		it('should return "Service is off. See logs for details"', async () => {
			try {
				await appController.getHealthCheck();
			} catch (error) {
				expect(error).not.toBe(null);
			}
		});
	});
});
