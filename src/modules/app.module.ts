import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigRootModule } from 'src/config/index.module';
import ExampleModule from './example';
import { CatModule } from 'src/examples/01_modules/cat.module';
import { LoggerMiddleware } from 'src/examples/02_middlewares/logger.middleware';
import { CatsController } from 'src/examples/01_modules/cat.controller';

@Module({
  imports: [ConfigRootModule, ExampleModule, CatModule],
})
class MainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // ! Common use
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'cats', method: RequestMethod.GET },
      //   { path: 'cats', method: RequestMethod.POST },
      //   'cats/(.*)',
      // )
      .forRoutes(CatsController);

    // ! Apply with route string
    // forRoutes('cats');
    // ! Apply with request method
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });

    // ! Apply with route wildcards
    // forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
  }
}

export default MainModule;
