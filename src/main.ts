import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import MainModule from './modules/app.module';
import { AppConfigService } from 'src/config/app/app.service';
import { AllExceptionsFilter } from 'src/examples/03_exceptions/all.exception';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const appConfig: AppConfigService = await app.get(AppConfigService);

  await app.listen(appConfig.port);
}
bootstrap();
