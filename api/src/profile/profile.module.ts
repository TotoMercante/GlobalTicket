import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { UserModule } from 'src/user/user.module';
import { RegisterController } from './register.controller';

@Module({
  imports: [UserModule],
  controllers: [ProfileController, RegisterController],
})
export class ProfileModule {}
