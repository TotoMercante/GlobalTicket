import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/auth/user.decorator';
import { EventShortDto } from 'src/event/dto/response/event-short.dto';
import { EventService } from 'src/event/event.service';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Login required' })
export class ProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly eventService: EventService,
  ) {}

  @Get()
  @ApiOkResponse({ type: UserDto })
  getProfile(@User() user: UserDto) {
    return user;
  }

  @Get('events')
  @ApiOkResponse({ type: [EventShortDto] })
  @ApiForbiddenResponse({ description: 'Only managers have events' })
  async getMyEvents(@User() user: UserDto) {
    if (user.type !== 'manager') {
      throw new ForbiddenException('Only managers can access their events');
    }
    return await this.eventService.getByManager(user._id);
  }

  @Put()
  @ApiOkResponse()
  async updateProfile(@User() user: UserDto, @Body() data: UpdateProfileDto) {
    await this.userService.update(user._id, data);
  }

  @Delete()
  @ApiOkResponse({ description: 'Profile deleted' })
  async deleteProfile(@User() user: UserDto) {
    await this.userService.delete(user._id);
    return { deleted: true };
  }
}
