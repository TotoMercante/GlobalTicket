import { ApiProperty } from '@nestjs/swagger';
import { UserShortDto } from 'src/user/dto/response/user-short.dto';

export class ManagerRequestDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  user: UserShortDto;

  @ApiProperty()
  businessName: string;

  @ApiProperty()
  cuit: number;
}
