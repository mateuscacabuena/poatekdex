import { Injectable } from '@nestjs/common';
import { Pokemon } from './pokemon.schema';
import { PokemonRepository } from './pokemon.repository';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.getAll();
  }

  findOne(id: string): Promise<Pokemon> {
    return this.pokemonRepository.getById(id);
  }

  insertOne(pokemon: Pokemon): Promise<Pokemon> {
    return this.pokemonRepository.add(pokemon);
  }

  updateOne(id: string, pokemon: Pokemon): Promise<Pokemon> {
    return this.pokemonRepository.update(id, pokemon);
  }

  deleteOne(id: string): Promise<Pokemon> {
    return this.pokemonRepository.delete(id);
  }
}
