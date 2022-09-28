/*
  eslint-disable
    @typescript-eslint/explicit-function-return-type,
    @typescript-eslint/naming-convention,
    @typescript-eslint/explicit-module-boundary-types
 */

export default () => ({
	// Postgres
	PG_HOST: process.env.PG_HOST || 'localhost',
	PG_PORT: parseInt(process.env.PG_PORT, 10) || 5432,
	PG_USER: process.env.PG_USER || 'root',
	PG_PASS: process.env.PG_PASS || 'root',
	PG_DATABASE: process.env.PG_DATABASE || 'root',

	// Redis
	REDIS_HOST: process.env.REDIS_HOST || 'localhost',
	REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
	REDIS_PASS: process.env.REDIS_PASS,

	// General
	LOG_LEVEL: process.env.LOG_LEVEL || 'debug', // Debug, Log, Warn, Error
});
