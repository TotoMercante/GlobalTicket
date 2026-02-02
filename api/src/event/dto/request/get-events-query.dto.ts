import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetEventsQuery {
  // Pagination
  @ApiPropertyOptional({ default: 1 })
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  ['per-page']?: number;

  // Date range
  @ApiPropertyOptional()
  from?: Date;

  @ApiPropertyOptional()
  to?: Date;

  @ApiPropertyOptional({ description: 'Búsqueda simple' })
  search?: string;
}
