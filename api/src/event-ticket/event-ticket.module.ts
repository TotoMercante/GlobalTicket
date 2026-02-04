import { Module } from '@nestjs/common';
import { EventTicketService } from './event-ticket.service';
import { EventTicketController } from './event-ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventTicketSchema } from './entities/event-ticket.entity';
import { UserModule } from 'src/user/user.module';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EventTicket', schema: EventTicketSchema },
    ]),
    UserModule,
    EventModule,
  ],
  controllers: [EventTicketController],
  providers: [EventTicketService],
  exports: [MongooseModule],
})
export class EventTicketModule {}
