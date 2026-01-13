import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserShortDto } from './dto/response/user-short.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

// TODO Implementar permisos
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserShortDto, isArray: true })
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  async getById(@Param('id') id: string) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  @ApiCreatedResponse({ type: UserShortDto })
  @ApiBadRequestResponse({ type: BadRequestException })
  async create(@Body() userDto: CreateUserDto) {
    try {
      return await this.userService.createUser(userDto);
    } catch (error) {
      if (error instanceof Error && error.message === 'duplicate email') {
        throw new BadRequestException(`Email ${userDto.email} is already used`);
      }
      if (!(error instanceof mongoose.Error)) throw error;
      if (error instanceof mongoose.Error.ValidationError) {
        throw new BadRequestException(error.message);
      }
    }
  }

  /* 
  @Post(':id/upgrade-request')
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  async upgrade(
    @Param('id') userId: string,
    @Body() userDto: RequestUserUpgradeDto,
  ) {
    const user = await this.userService.upgradeUser(userId, userDto);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }
 */

  @Put(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string) {
    const found = await this.userService.delete(id);
    if (!found) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
