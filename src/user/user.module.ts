import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';

@Module({
  imports: [ // only import module
    SequelizeModule.forFeature([User, Address]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService] // for export only service (not controller and module)
})
export class UserModule {}
