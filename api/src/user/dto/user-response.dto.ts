import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  __v: number;

  @ApiProperty({ example: 'direccion@ejemplo.com' })
  email: string;

  @ApiProperty({ example: 'PasswordSegura123!' })
  password: string;

  @ApiProperty({ example: '+542211234567' })
  phoneNumber: string;

  @ApiProperty({ example: 'Juan' })
  firstName: string;

  @ApiProperty({ example: 'Pérez' })
  lastName: string;

  @ApiProperty({ example: 12345678 })
  dni: number;

  @ApiProperty({ example: new Date(1990, 0, 1).toISOString() })
  birthdate: Date;

  @ApiProperty({ type: String, isArray: true })
  eventTickets: string[];

  @ApiPropertyOptional()
  __t: string;

  @ApiPropertyOptional({ example: 'Empresa S.A.' })
  bussinessName: string;

  @ApiPropertyOptional({ example: 30500000038 })
  cuit: number;

  @ApiPropertyOptional({ type: String, isArray: true })
  managedEvents: string[];
}
