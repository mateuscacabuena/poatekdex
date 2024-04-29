import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Pokemon } from 'src/pokemon/pokemon.schema';

export type TrainerDocument = HydratedDocument<Trainer>;

@Schema()
export class Trainer {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  pokemons: Pokemon[];
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
