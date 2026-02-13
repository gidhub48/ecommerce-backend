import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { MariaDbModule } from './config/database.provider';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { logger } from './common/middleware/logger.middleware';
import { ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from './auth/auth.module';
import helmet from 'helmet';
import { RatelimitModule } from './config/ratelimiting';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MariaDbModule, 
    RatelimitModule, 
    ProductModule, 
    UserModule, 
    OrderModule, 
    CartModule, 
    PaymentModule, 
    AuthModule,
    ConfigModule.forRoot({isGlobal:true})
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerModule
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(helmet(), logger)
      .forRoutes('*')
    consumer
      .apply(AuthModule)
      .forRoutes()
  }
}
