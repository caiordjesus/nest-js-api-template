import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT || 3000;

async function bootstrap(): Promise<void> {
	const logLevel = process.env.LOG_LEVEL?.toLowerCase() || 'log'
	const logsTypes = ['error', 'warn', 'log', 'debug'];
	const enableLogs = [];
	for (const log of logsTypes) {
		enableLogs.push(log);
		if (logLevel === log) {
			break;
		}
	}

	const app = await NestFactory.create(AppModule, {
		logger: enableLogs,
	});

	const options = new DocumentBuilder()
		.setTitle('api')
		.setDescription('api mapped routes')
		.setVersion('0.1')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('openapi', app, document);

	await app.listen(port);
}
bootstrap();
