import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TrainerDto {
  @ApiProperty({ example: 1, description: 'The id of the Trainer'})
  id: number;

  @ApiProperty({ example: 'Ash Ketchum', description: 'The name of the Trainer'})
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainer/1.png', description: 'The image of the Trainer'})
  imageUrl: string;

  @ApiProperty({ example: [
    {
      id: 1,
      name: 'Bulbasaur',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    }
  ], description: 'The pokemons of the Trainer'})
  pokemons: {
    id: number;
    name: string;
    imageUrl: string;
  }[];
}