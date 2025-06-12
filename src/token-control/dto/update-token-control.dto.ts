import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenControlDto } from './create-token-control.dto';

export class UpdateTokenControlDto extends PartialType(CreateTokenControlDto) {}
