import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from './category.schema';

export type ArtWorkDocument = HydratedDocument<ArtWork>;

@Schema()
export class ArtWork {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ArtWorkSchema = SchemaFactory.createForClass(ArtWork);
