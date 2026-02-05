import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserShortDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional({ type: String })
  phoneNumber?: string;
}
