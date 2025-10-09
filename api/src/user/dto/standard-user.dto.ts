import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { UserBaseDto } from './user-base.dto';

const optionalProps: (keyof UserBaseDto)[] = [
  'bussinessName',
  'cuit',
  'managedEvents',
];

export class StandardUserDto extends IntersectionType(
  OmitType(UserBaseDto, optionalProps),
  PartialType(PickType(UserBaseDto, optionalProps)),
) {}
