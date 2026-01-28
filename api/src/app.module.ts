import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ManagerRequestModule } from './manager-request/manager-request.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/globalticket'),
    EventModule,
    UserModule,
    AuthModule,
    ProfileModule,
    ManagerRequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
