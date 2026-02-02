import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateManagerRequestDto } from './dto/create-manager-request.dto';
import { ManagerRequestDto } from './dto/manager-request.dto';
import { ManagerRequestService } from './manager-request.service';

@Controller('manager-request')
export class ManagerRequestController {
  constructor(private readonly managerRequestService: ManagerRequestService) {}

  @Get()
  @ApiOkResponse({ type: [ManagerRequestDto] })
  async getAll() {
    return this.managerRequestService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ManagerRequestDto })
  @ApiNotFoundResponse({ description: 'Manager request not found' })
  async getById(@Param('id') id: string) {
    const request = await this.managerRequestService.getById(id);
    if (!request) {
      throw new NotFoundException(`Manager request with id ${id} not found`);
    }
    return request;
  }

  @Post()
  @ApiCreatedResponse({ type: ManagerRequestDto })
  @ApiBadRequestResponse({
    description: 'Error during manager request creation',
  })
  async create(@Body() data: CreateManagerRequestDto) {
    const [request, error] = await this.managerRequestService.create(data);
    if (error) {
      if (error.duplicateRequest)
        throw new BadRequestException(
          `There's already a manager request for user ${data.user}`,
        );
      if (error.alreadyManager)
        throw new BadRequestException(`User ${data.user} is already a manager`);
    }
    return request;
  }

  @Put(':id/accept')
  @ApiOkResponse({
    description: 'Manager request accepted successfully',
  })
  @ApiNotFoundResponse({ description: 'Manager request not found' })
  async accept(@Param('id') id: string) {
    const found = await this.managerRequestService.accept(id);
    if (!found) {
      throw new NotFoundException(`Manager request with id ${id} not found`);
    }
  }

  @Put(':id/reject')
  @ApiOkResponse({ description: 'Manager request rejected successfully' })
  @ApiNotFoundResponse({ description: 'Manager request not found' })
  async reject(@Param('id') id: string) {
    const result = await this.managerRequestService.reject(id);
    if (!result) {
      throw new NotFoundException(`Manager request with id ${id} not found`);
    }
    return { success: true };
  }
}
