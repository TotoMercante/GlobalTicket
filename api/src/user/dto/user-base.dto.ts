import { ApiProperty } from '@nestjs/swagger';

export class UserBaseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  _v: number;

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

  @ApiProperty({ example: 'Empresa S.A.' })
  bussinessName: string;

  @ApiProperty({ example: 30500000038 })
  cuit: number;

  @ApiProperty({ type: String, isArray: true })
  managedEvents: string[];
}
