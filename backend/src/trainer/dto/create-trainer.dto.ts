import { Pokemon } from "src/pokemon/pokemon.schema";

export class CreateTrainerDto {
  id: number;
  name: string;
  pokemons: [Pokemon];
}