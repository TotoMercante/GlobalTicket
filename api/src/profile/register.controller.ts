import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { RegisterProfileDto } from './dto/register-profile.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async registerProfile(@Body() data: RegisterProfileDto) {
    try {
      const [user, error] = await this.userService.createUser({
        ...data,
        type: 'standard',
      });
      if (error) {
        throw new BadRequestException(`Email ${data.email} is already used`);
      }
      return user;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new BadRequestException(error);
      }
      throw error;
    }
  }
}
