import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from '../service/pokemon.service';
import { PokemonRepository } from '../repository/pokemon.repository';
import { Pokemon } from '../pokemon.schema';
import { PokemonDto } from '../pokemon.dto';

const pokemonList: Pokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    weight: 6.9,
    height: 0.7,
    imageUrl: 'https://example.com/bulbasaur.jpg',
    types: ['Grass', 'Poison'],
    abilities: ['Overgrow', 'Chlorophyll'],
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
      specialAttack: 65,
      specialDefense: 65,
    },
    description: 'Bulbasaur can be seen napping in bright sunlight.',
  },
  {
    id: 2,
    name: 'Ivysaur',
    weight: 13.0,
    height: 1.0,
    imageUrl: 'https://example.com/ivysaur.jpg',
    types: ['Grass', 'Poison'],
    abilities: ['Overgrow', 'Chlorophyll'],
    stats: {
      hp: 60,
      attack: 62,
      defense: 63,
      speed: 60,
      specialAttack: 80,
      specialDefense: 80,
    },
    description: 'There is a bud on this Pokémon’s back.',
  },
  {
    id: 3,
    name: 'Venusaur',
    weight: 100.0,
    height: 2.0,
    imageUrl: 'https://example.com/venusaur.jpg',
    types: ['Grass', 'Poison'],
    abilities: ['Overgrow', 'Chlorophyll'],
    stats: {
      hp: 80,
      attack: 82,
      defense: 83,
      speed: 80,
      specialAttack: 100,
      specialDefense: 100,
    },
    description: 'The plant blooms when it is absorbing solar energy.',
  },
];

const newPokemon: Pokemon = {
  id: 4,
  name: 'Charmander',
  weight: 8.5,
  height: 0.6,
  imageUrl: 'https://example.com/charmander.jpg',
  types: ['Fire'],
  abilities: ['Flamethrower', 'Ember'],
  stats: {
    hp: 39,
    attack: 52,
    defense: 43,
    speed: 65,
    specialAttack: 60,
    specialDefense: 50,
  },
  description: 'The flame on its tail shows the strength of its life force.',
};

const updatedPokemon: Pokemon = {
  id: 1,
  name: 'Bulbasaur With Razor Leaf',
  weight: 6.9,
  height: 0.7,
  imageUrl: 'https://example.com/bulbasaur.jpg',
  types: ['Grass', 'Poison'],
  abilities: ['Razor Leaf'],
  stats: {
    hp: 45,
    attack: 49,
    defense: 49,
    speed: 45,
    specialAttack: 65,
    specialDefense: 65,
  },
  description: 'Bulbasaur can be seen napping in bright sunlight.',
};

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let pokemonRepository: PokemonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: PokemonRepository, // Fornecer a classe PokemonRepository como o provedor
          useValue: {
            getAll: jest.fn().mockResolvedValue(pokemonList),
            getById: jest.fn().mockResolvedValue(pokemonList[0]),
            add: jest.fn().mockResolvedValue(newPokemon),
            update: jest.fn().mockResolvedValue(updatedPokemon),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
    pokemonRepository = module.get<PokemonRepository>(PokemonRepository); // Obter a instância mockada do PokemonRepository
  });

  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
    expect(pokemonRepository).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of pokemons', async () => {
      // Act
      const result = await pokemonService.findAll();

      // Assert
      expect(result).toEqual(pokemonList);
      expect(typeof result).toBe('object');
      expect(pokemonRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(pokemonRepository, 'getAll')
        .mockRejectedValueOnce(new Error());

      // Act and Assert
      expect(pokemonService.findAll()).rejects.toThrow(new Error());
    });
  });

  describe('getById', () => {
    it('should return a pokemon', async () => {
      // Arrange
      const id = '1';

      // Act
      const result = await pokemonService.findOne(id);

      // Assert
      expect(result).toEqual(pokemonList[0]);
      expect(pokemonRepository.getById).toHaveBeenCalledTimes(1);
      expect(pokemonRepository.getById).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      // Arrange
      const id = '1';
      jest
        .spyOn(pokemonRepository, 'getById')
        .mockRejectedValueOnce(new Error());

      // Act and Assert
      expect(pokemonService.findOne(id)).rejects.toThrow(new Error());
    });
  });

  describe('add', () => {
    it('should create a new pokemon', async () => {
      // Arrange
      const body: PokemonDto = {
        id: 4,
        name: 'Charmander',
        weight: 8.5,
        height: 0.6,
        imageUrl: 'https://example.com/charmander.jpg',
        types: ['Fire'],
        abilities: ['Flamethrower', 'Ember'], // ?
        stats: {
          hp: 39,
          attack: 52,
          defense: 43,
          speed: 65,
          specialAttack: 60,
          specialDefense: 50,
        },
        description:
          'The flame on its tail shows the strength of its life force.',
      };

      // Act
      const result = await pokemonService.insertOne(body);

      // Assert
      expect(result).toEqual(newPokemon);
      expect(pokemonRepository.add).toHaveBeenCalledTimes(1);
      expect(pokemonRepository.add).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: PokemonDto = {
        id: 4,
        name: 'Charmander',
        weight: 8.5,
        height: 0.6,
        imageUrl: 'https://example.com/charmander.jpg',
        types: ['Fire'],
        abilities: ['Flamethrower', 'Ember'],
        stats: {
          hp: 39,
          attack: 52,
          defense: 43,
          speed: 65,
          specialAttack: 60,
          specialDefense: 50,
        },
        description:
          'The flame on its tail shows the strength of its life force.',
      };
      jest.spyOn(pokemonRepository, 'add').mockRejectedValueOnce(new Error());

      // Act and Assert
      expect(pokemonService.insertOne(body)).rejects.toThrow(new Error());
    });
  });

  describe('update', () => {
    it('should update a pokemon', async () => {
      // Arrange
      const id = '1';
      const body: PokemonDto = {
        id: 1,
        name: 'Bulbasaur With Razor Leaf',
        weight: 6.9,
        height: 0.7,
        imageUrl: 'https://example.com/bulbasaur.jpg',
        types: ['Grass', 'Poison'],
        abilities: ['Razor Leaf'],
        stats: {
          hp: 45,
          attack: 49,
          defense: 49,
          speed: 45,
          specialAttack: 65,
          specialDefense: 65,
        },
        description: 'Bulbasaur can be seen napping in bright sunlight.',
      };

      // Act
      const result = await pokemonService.updateOne(id, body);

      // Assert
      expect(result).toEqual(updatedPokemon);
      expect(pokemonRepository.update).toHaveBeenCalledTimes(1);
      expect(pokemonRepository.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      // Arrange
      const id = '1';
      const body: PokemonDto = {
        id: 1,
        name: 'Bulbasaur With Razor Leaf',
        weight: 6.9,
        height: 0.7,
        imageUrl: 'https://example.com/bulbasaur.jpg',
        types: ['Grass', 'Poison'],
        abilities: ['Razor Leaf'],
        stats: {
          hp: 45,
          attack: 49,
          defense: 49,
          speed: 45,
          specialAttack: 65,
          specialDefense: 65,
        },
        description: 'Bulbasaur can be seen napping in bright sunlight.',
      };
      jest
        .spyOn(pokemonRepository, 'update')
        .mockRejectedValueOnce(new Error());

      // Act and Assert
      expect(pokemonService.updateOne(id, body)).rejects.toThrow(new Error());
    });
  });

  describe('delete', () => {
    it('should delete a pokemon', async () => {
      // Arrange
      const id = '1';

      // Act
      const result = await pokemonService.deleteOne(id);

      // Assert
      expect(result).toBeUndefined();
      expect(pokemonRepository.delete).toHaveBeenCalledTimes(1);
      expect(pokemonRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      // Arrange
      const id = '1';
      jest
        .spyOn(pokemonRepository, 'delete')
        .mockRejectedValueOnce(new Error());

      // Act and Assert
      expect(pokemonService.deleteOne(id)).rejects.toThrow(new Error());
    });
  });
});
