import { Module } from '@nestjs/common';
import { ManagerRequestService } from './manager-request.service';
import { ManagerRequestController } from './manager-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ManagerRequest,
  ManagerRequestSchema,
} from './entities/manager-request.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: ManagerRequest.name, schema: ManagerRequestSchema },
    ]),
  ],
  controllers: [ManagerRequestController],
  providers: [ManagerRequestService],
})
export class ManagerRequestModule {}
