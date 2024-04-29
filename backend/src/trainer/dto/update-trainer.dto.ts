import { Pokemon } from "src/pokemon/pokemon.schema";

export class UpdateTrainerDto {
  id: number;
  name: string;
  pokemons: [Pokemon];
}