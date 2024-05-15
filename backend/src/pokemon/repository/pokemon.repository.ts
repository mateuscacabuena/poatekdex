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

  getById(id: string): Promise<Pokemon> {
    return this.pokemonModel.findOne({ id: id }).exec();
  }

  async add(pokemon: Pokemon): Promise<Pokemon> {
    return await this.pokemonModel.create(pokemon);
  }

  async update(id: string, pokemon: Pokemon): Promise<Pokemon> {
    return await this.pokemonModel
      .findOneAndUpdate({ id: id }, pokemon, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Pokemon> {
    return await this.pokemonModel.findOneAndDelete({ id: id }).exec();
  }
}
