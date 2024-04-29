import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop([String])
  types: string[];

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop([String])
  abilities: string[];

  @Prop({ type: Object })
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
  };

  @Prop()
  image: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
