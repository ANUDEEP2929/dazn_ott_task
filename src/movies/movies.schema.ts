import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MoviesDocument = HydratedDocument<Movies>;

@Schema()
export class Movies {
  @Prop({ required: true }) title: string;

  @Prop({ required: true }) genre: string;

  @Prop({ required: true }) rating: number;

  @Prop({ required: true }) streaming_link: string;

  @Prop() created_at: Date;

  @Prop() updated_at: Date;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
