import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateArtWorkDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  category: ObjectId;
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
