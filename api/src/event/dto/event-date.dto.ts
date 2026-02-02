import { ApiProperty } from '@nestjs/swagger';

export class EventDateDto {
  @ApiProperty({ type: Date })
  datetime: string;

  @ApiProperty()
  sold: number;
}
