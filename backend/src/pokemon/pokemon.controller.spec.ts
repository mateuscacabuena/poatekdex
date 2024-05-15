import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.schema';
import { PokemonDto } from './pokemon.dto';

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

describe('PokemonController', () => {
  let pokemonController: PokemonController;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(pokemonList),
            findOne: jest.fn().mockResolvedValue(pokemonList[0]),
            insertOne: jest.fn().mockResolvedValue(newPokemon),
            updateOne: jest.fn().mockResolvedValue(updatedPokemon),
            deleteOne: jest.fn().mockResolvedValue('Pokemon successfully deleted!'),
          },
        },
      ],
    }).compile();

    pokemonController = module.get<PokemonController>(PokemonController);
    pokemonService = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(pokemonController).toBeDefined();
    expect(pokemonService).toBeDefined();
  });

  describe('index', () => {
    it('should return a pokemon list successfully', async () => {
      // Act
      const result = await pokemonController.findAll();
      // Assert
      expect(result).toEqual(pokemonList);
      expect(typeof result).toBe('object');
      expect(pokemonService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(pokemonService, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(pokemonController.findAll()).rejects.toThrow();
    });
  });

  describe('show', () => {
    it('should get a pokemon successfully', async () => {
      // Arrange
      const id = '1';

      // Act
      const result = await pokemonController.findOne(id);

      // Assert
      expect(result).toEqual(pokemonList[0]);
      expect(pokemonService.findOne).toHaveBeenCalledTimes(1);
      expect(pokemonService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      // Arrange
      const id = '1';

      jest.spyOn(pokemonService, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(pokemonController.findOne(id)).rejects.toThrow();
    });
  });

  describe('store', () => {
    it('should create a new pokemon successfully', async () => {
      // Arrange
      const body: PokemonDto = {
        id: 4,
        name: 'Charmander',
        weight: 8.5,
        height: 0.6,
        imageUrl: 'https://example.com/charmander.jpg',
        types: ['Fire'],
        abilities: ['Flamethrower'], // ?
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
      const result = await pokemonController.create(body);

      // Assert
      expect(result).toEqual(newPokemon);
      expect(pokemonService.insertOne).toHaveBeenCalledTimes(1);
      expect(pokemonService.insertOne).toHaveBeenCalledWith(body);
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

      jest
        .spyOn(pokemonService, 'insertOne')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(pokemonController.create(body)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a pokemon successfully', async () => {
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
      const result = await pokemonController.updateOne(id, body);

      // Assert
      expect(result).toEqual(updatedPokemon);
      expect(pokemonService.updateOne).toHaveBeenCalledTimes(1);
      expect(pokemonService.updateOne).toHaveBeenCalledWith(id, body);
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
        .spyOn(pokemonService, 'updateOne')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(pokemonController.updateOne(id, body)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should delete a pokemon successfully', async () => {
        // Arrange
        const id = '1';
    
        // Act
        const result = await pokemonController.delete(id);
    
        // Assert
        expect(result).toEqual('Pokemon successfully deleted!');
        expect(pokemonService.deleteOne).toHaveBeenCalledTimes(1);
        expect(pokemonService.deleteOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
        // Arrange
        const id = '1';
    
        jest
          .spyOn(pokemonService, 'deleteOne')
          .mockRejectedValueOnce(new Error());
    
        // Assert
        expect(pokemonController.delete(id)).rejects.toThrow();
    });
  });
});
