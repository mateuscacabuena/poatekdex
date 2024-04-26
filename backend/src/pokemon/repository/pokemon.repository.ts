import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon.schema';
import { Model } from 'mongoose';

@Injectable()
export class PokemonRepository {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>,
  ) {}

  async getAll(): Promise<Pokemon[]> {
    return await this.pokemonModel.find().exec();
  }

  async getById(id: string): Promise<Pokemon> {
    return await this.pokemonModel.findOne({id: id}).exec();
  }
}
