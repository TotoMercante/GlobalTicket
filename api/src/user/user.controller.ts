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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Post(':id/upgrade')
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
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post(':id/purchase')
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
  async delete(@Param('id') id: string) {
    const found = await this.userService.delete(id);
    if (!found) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return { message: `User with id ${id} deleted successfully` };
  }
}
