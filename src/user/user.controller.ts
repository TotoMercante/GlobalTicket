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
import { CreateStandardUserDto } from './dto/create-standard-user.dto';
import { CreateManagerUserDto } from './dto/create-manager-user.dto';
import { EventPurchaseDto } from './dto/event-purchase.dto';

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

  @Post('standard')
  async createStandardUser(@Body() userDto: CreateStandardUserDto) {
    return this.userService.createStandardUser(userDto);
  }

  @Post('manager')
  async createManagerUser(@Body() userDto: CreateManagerUserDto) {
    return this.userService.createManagerUser(userDto);
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
    @Body() purchaseDto: EventPurchaseDto,
  ) {
    const user = await this.userService.addPurchase(id, purchaseDto);
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
