import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TrainerDocument = HydratedDocument<Trainer>;

@Schema()
export class Trainer {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  pokemons: {
    id: number;
    name: string;
    image: string;
  }[];
};

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
