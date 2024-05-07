import { ApiProperty } from '@nestjs/swagger';

export class PokemonDto {
  @ApiProperty({ example: 1, description: 'The id of the Pokemon'})
  id: number;

  @ApiProperty({ example: 'bulbasaur', description: 'The name of the Pokemon'})
  name: string;

  @ApiProperty({ example: ['grass', 'poison'], description: 'The types of the Pokemon'})
  types: [string];

  @ApiProperty({ example: 7, description: 'The height of the Pokemon'})
  height: number;

  @ApiProperty({ example: 69, description: 'The weight of the Pokemon'})
  weight: number;

  @ApiProperty({ example: ['overgrow', 'chlorophyll'], description: 'The abilities of the Pokemon'})
  abilities: [string];

  @ApiProperty({ example: {
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45
  
  }, description: 'The base experience of the Pokemon'})
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };

  @ApiProperty({ example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', description: 'The image of the Pokemon'})
  imageUrl: string;

  @ApiProperty({ example: "Bulbasaur is a grass and poison Pokémon with 0.7m of height and 6.9kg of weight. In addition, use moves like Overgrow and Chlorophyll to defeat its enemies.", description: 'The description of the Pokemon'})
  description: string
}