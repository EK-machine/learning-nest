import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustommerMiddleware } from './middlewares/vlidate-customer.middleware';
import { ValidateCustommerAccountMiddleware } from './middlewares/vlidate-customer-account.middleware';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCustommerMiddleware, ValidateCustommerAccountMiddleware)
      .exclude({ path: 'api/customers/create', method: RequestMethod.POST })
      .forRoutes(CustomersController);
  }
}
