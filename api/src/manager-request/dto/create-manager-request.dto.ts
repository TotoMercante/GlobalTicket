import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ManagerRequestDto } from './manager-request.dto';

export class CreateManagerRequestDto extends OmitType(ManagerRequestDto, [
  '_id',
  'user',
]) {
  @ApiProperty()
  user: string;
}
