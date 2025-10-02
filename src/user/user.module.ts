import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { ManagerUser, ManagerUserSchema } from './entities/manager-user.entity';
import {
  StandardUser,
  StandardUserSchema,
} from './entities/standard-user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [
          { name: StandardUser.name, schema: StandardUserSchema },
          { name: ManagerUser.name, schema: ManagerUserSchema },
        ],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule],
})
export class UserModule {}
