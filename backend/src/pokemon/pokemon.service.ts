import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Pokemon } from "./pokemon.schema";
import { Model } from "mongoose";

@Injectable()
export class PokemonService {
    constructor(@InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>) {}

    async findAll(): Promise<Pokemon[]> {
        return await this.pokemonModel.find().exec();
    }
}