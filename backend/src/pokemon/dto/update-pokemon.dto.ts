export class UpdatePokemonDto {
  id: number;
  name: string;
  type: [string];
  baseExperience: number;
  height: number;
  weight: number;
  abilities: [string];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  imageUrl: string;
}
