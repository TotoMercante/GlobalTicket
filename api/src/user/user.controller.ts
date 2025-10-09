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
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpgradeUserDto } from './dto/upgrade-user.dto';
import { EventTicketDto } from './dto/event-ticket.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ManagerUserDto } from './dto/manager-user.dto';
import { StandardUserDto } from './dto/standard-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: StandardUserDto, isArray: true })
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: StandardUserDto })
  @ApiNotFoundResponse()
  async getById(@Param('id') id: string) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  @ApiCreatedResponse({ type: StandardUserDto })
  async createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Put(':id/upgrade')
  @ApiOkResponse({ type: ManagerUserDto })
  @ApiNotFoundResponse()
  async upgradeUser(
    @Param('id') userId: string,
    @Body() userDto: UpgradeUserDto,
  ) {
    const user = await this.userService.upgradeUser(userId, userDto);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

  @Put(':id')
  @ApiOkResponse({ type: StandardUserDto })
  @ApiNotFoundResponse()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post(':id/purchase')
  @ApiCreatedResponse({ type: StandardUserDto })
  @ApiNotFoundResponse()
  async addPurchase(
    @Param('id') id: string,
    @Body() ticketDto: EventTicketDto,
  ) {
    const user = await this.userService.addPurchase(id, ticketDto);
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
