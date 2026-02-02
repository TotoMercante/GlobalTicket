import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { UserModule } from 'src/user/user.module';
import { RegisterController } from './register.controller';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [UserModule, EventModule],
  controllers: [ProfileController, RegisterController],
})
export class ProfileModule {}
