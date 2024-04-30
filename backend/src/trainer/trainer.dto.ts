export class TrainerDto {
  id: number;
  name: string;
  pokemons: {
    id: number;
    name: string;
    image: string;
  }[];
}