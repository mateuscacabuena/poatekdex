export class UpdatePokemonDto {
  id?: number;
  name?: string;
  types?: [string];
  height?: number;
  weight?: number;
  abilities?: [string];
  stats?: {
    hp?: number;
    attack?: number;
    defense?: number;
    specialAttack?: number;
    specialDefense?: number;
    speed?: number;
  };
  image?: string;
}