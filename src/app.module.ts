import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { MariaDbModule } from './config/database.provider';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [MariaDbModule,ProductModule, UserModule, OrderModule, CartModule, PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply()
  }
  
}
