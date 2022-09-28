import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule } from '@nestjs/common';

export const typeOrmSqliteTestingModule = (): DynamicModule[] => [
	TypeOrmModule.forRoot({
		type: 'better-sqlite3',
		database: ':memory:',
		dropSchema: true,
		entities: [], // Add entities
		synchronize: true,
	}),
	// TypeOrmModule.forFeature([]), // Add for entities
];
