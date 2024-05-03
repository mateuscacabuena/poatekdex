import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TrainerDocument = HydratedDocument<Trainer>;

@Schema({ versionKey: false })
export class Trainer {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  imageUrl: string;

  @Prop()
  pokemons: {
    id: number;
    name: string;
    imageUrl: string;
  }[];
};

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
