import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderItem])], // imports model, class User extends Model
  controllers: [OrderController],
  providers: [OrderService],
})

export class OrderModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('order')
  }
}
