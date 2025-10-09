import { ApiProperty } from '@nestjs/swagger';

export class EventBaseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  _v: number;

  @ApiProperty({ example: 'Nombre de evento' })
  name: string;

  @ApiProperty({ example: [new Date(2025, 11, 17).toISOString()] })
  date: Date[];

  @ApiProperty({ example: 'Hipódromo de La Plata' })
  location: string;

  @ApiProperty({ example: 'Descripción del evento' })
  description: string;

  @ApiProperty({ example: new Date(2025, 10, 1).toISOString() })
  startSellDate: Date;

  @ApiProperty({ example: 25_000 })
  ticketPrice: number;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  managerId: string;
}
