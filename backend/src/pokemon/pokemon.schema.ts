import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  weight: number;
  
  @Prop()
  height: number;

  @Prop()
  imageUrl: string;

  @Prop([String])
  types: string[];

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
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);