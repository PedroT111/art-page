import { PartialType } from '@nestjs/mapped-types';
import { CreateArtWorkDto } from './create-art-work.dto';

export class UpdateArtWorkDto extends PartialType(CreateArtWorkDto) {}
