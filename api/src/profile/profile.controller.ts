import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/auth/user.decorator';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Login required' })
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserDto })
  getProfile(@User() user: UserDto) {
    return user;
  }

  @Put()
  @ApiOkResponse({ type: UserDto })
  async updateProfile(@User() user: UserDto, @Body() data: UpdateProfileDto) {
    const updatedUser = await this.userService.update(user._id, data);
    return updatedUser!;
  }

  @Delete()
  @ApiOkResponse({ description: 'Profile deleted' })
  async deleteProfile(@User() user: UserDto) {
    await this.userService.delete(user._id);
    return { deleted: true };
  }
}
