import { Injectable } from '@nestjs/common';
import { Pokemon } from './pokemon.schema';
import { PokemonRepository } from './repository/pokemon.repository';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.getAll();
  }
}
