import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export async function providePostgres(
	configService: ConfigService,
): Promise<TypeOrmModuleOptions> {
	return {
		type: 'postgres',
		host: configService.get('PG_HOST'),
		port: +configService.get('PG_PORT'),
		username: configService.get('PG_USER'),
		password: configService.get('PG_PASS'),
		database: configService.get('PG_DATABASE'),
		entities: [__dirname + './**/*.entity.{js, ts}'],
		synchronize: true, // disable in the future
	};
}
