import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop([String])
    type: string[];

    @Prop()
    baseExperience: number;

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
    imageUrl: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);