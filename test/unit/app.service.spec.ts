import { AppService } from '../../src/app.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRedisToken } from '@liaoliaots/nestjs-redis';
import { typeOrmSqliteTestingModule } from '../../src/test-utils/TypeOrmSqliteTestingModule';
import {
	postgresErrorProvider,
	redisErrorProvider,
} from '../../src/monitoring/metrics';

describe('appService', () => {
	let service: AppService;
	let ping: jest.Mock;

	beforeEach(async () => {
		ping = jest.fn();

		const module: TestingModule = await Test.createTestingModule({
			imports: [...typeOrmSqliteTestingModule()],
			providers: [
				AppService,
				{
					provide: getRedisToken('default'),
					useValue: {
						ping,
					},
				},
				redisErrorProvider,
				postgresErrorProvider,
			],
		}).compile();

		service = module.get<AppService>(AppService);
	});

	test('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('healthCheck', () => {
		test('return true', async () => {
			ping.mockResolvedValue(null);

			const result = await service.healthCheck();

			expect(ping).toHaveBeenCalledTimes(1);
			expect(result).toBe(true);
		});

		test('ping fails, return false', async () => {
			ping.mockRejectedValue(new Error('error'));

			const result = await service.healthCheck();

			expect(ping).toHaveBeenCalledTimes(1);
			expect(result).toBe(false);
		});
	});
});
