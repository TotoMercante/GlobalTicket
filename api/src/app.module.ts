import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ManagerRequestModule } from './manager-request/manager-request.module';
import { EventTicketModule } from './event-ticket/event-ticket.module';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    EventModule,
    UserModule,
    AuthModule,
    ProfileModule,
    ManagerRequestModule,
    EventTicketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
