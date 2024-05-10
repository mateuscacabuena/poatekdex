export interface Trainer {
  id: number;
  name: string;
  imageUrl: string;
  pokemons: TrainerPokemon[];
}

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  imageUrl: string;
  types: String[];
  abilities: String[];
  stats: Stat[];
  description: string;
}

interface Stat {
  name: string;
  base_stat: number;
}

export interface TrainerPokemon {
  id: number;
  name: string;
  imageUrl: string;
}
