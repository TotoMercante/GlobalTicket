import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { ManagerData, ManagerDataSchema } from './entities/manager-data.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: ManagerData.name,
        schema: ManagerDataSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule],
})
export class UserModule {}
