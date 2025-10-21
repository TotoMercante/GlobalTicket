import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { EventTicketDto } from './dto/event-ticket.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpgradeUserDto } from './dto/upgrade-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse()
  async getById(@Param('id') id: string) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  @ApiCreatedResponse({ type: UserResponseDto })
  async create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Put(':id/upgrade')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse()
  async upgrade(@Param('id') userId: string, @Body() userDto: UpgradeUserDto) {
    const user = await this.userService.upgradeUser(userId, userDto);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

  @Put(':id')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post(':id/purchase')
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiNotFoundResponse()
  async addTicket(@Param('id') id: string, @Body() ticketDto: EventTicketDto) {
    const user = await this.userService.addTicket(id, ticketDto);
    if (!user) {
      throw new NotFoundException(`Standard user with id ${id} not found`);
    }
    return user;
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string) {
    const found = await this.userService.delete(id);
    if (!found) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return { message: `User with id ${id} deleted successfully` };
  }
}
