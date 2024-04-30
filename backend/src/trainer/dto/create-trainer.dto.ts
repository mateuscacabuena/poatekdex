export class CreateTrainerDto {
  id: number;
  name: string;
  pokemons: {
    id: number;
    name: string;
    image: string;
  }[];
}