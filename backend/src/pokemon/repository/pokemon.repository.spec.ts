import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon.schema';
import { PokemonRepository } from '../repository/pokemon.repository';
import { find } from 'rxjs';
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

describe('PokemonRepository', () => {
  let pokemonRepository: PokemonRepository;
  let model: Model<Pokemon>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonRepository,
        {
          provide: getModelToken(Pokemon.name), // Fornecer o token do modelo como o provedor
          useValue: {
            find: jest.fn().mockResolvedValue(pokemonList),
            findOne: jest.fn().mockResolvedValue(pokemonList[0]),
            create: jest.fn().mockReturnValue(newPokemon),
            findOneAndUpdate: jest.fn().mockResolvedValue(updatedPokemon),
            findOneAndDelete: jest.fn().mockResolvedValue(pokemonList[0]),
          },
        },
      ],
    }).compile();

    pokemonRepository = module.get<PokemonRepository>(PokemonRepository);
    model = module.get<Model<Pokemon>>(getModelToken(Pokemon.name)); // Obter o modelo mockado
  });

  it('should be defined', () => {
    expect(pokemonRepository).toBeDefined();
    expect(model).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of Pokemons', async () => {
      // Act
      const result = await pokemonRepository.getAll();

      // Assert
      expect(result).toEqual(pokemonList);
      expect(typeof result).toBe('object');
      expect(model.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no Pokemons are found', async () => {
      // Arrange
      jest.spyOn(model, 'find').mockResolvedValueOnce([]);

      // Act
      const result = await pokemonRepository.getAll();

      // Assert
      expect(result).toEqual([]);
      expect(model.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return a Pokemon by ID', async () => {
      // Arrange
      const id = '1';

      // Act
      const result = await pokemonRepository.getById(id);

      // Assert
      expect(result).toEqual(pokemonList[0]);
      expect(model.findOne).toHaveBeenCalledWith({ id: id });
      expect(model.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return undefined when Pokemon is not found', async () => {
      // Arrange
      const id = '1';
      jest.spyOn(model, 'findOne').mockResolvedValueOnce({} as Pokemon);
      
      // Act
      const result = await pokemonRepository.getById(id);

      // Assert
      expect(result).toEqual({} as Pokemon);
      expect(model.findOne).toHaveBeenCalledWith({ id: id });
      expect(model.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('add', () => {
    it('should add a new Pokemon', async () => {
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
      const result = await pokemonRepository.add(newPokemon);

      // Assert
      expect(result).toEqual(newPokemon);
      expect(model.create).toHaveBeenCalledTimes(1);
      expect(model.create).toHaveBeenCalledWith(body);
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
      jest.spyOn(model, 'create').mockRejectedValueOnce(new Error());

      // Act and Assert
      expect(pokemonRepository.add(body)).rejects.toThrow(new Error());
    });
  });

  describe('update', () => {
    it('should update an existing Pokemon', async () => {
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
      const result = await pokemonRepository.update(id, body);

      // Assert
      expect(result).toEqual(updatedPokemon);
      expect(model.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, body, {
        new: true,
      });
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
      jest.spyOn(model, 'findOneAndUpdate').mockRejectedValueOnce(new Error());

      // Act and Assert
      expect(pokemonRepository.update(id, body)).rejects.toThrow(new Error());
    });
  });

  describe('delete', () => {
    it('should delete a Pokemon by ID', async () => {
      // Arrange
      const id = '1';

      // Act
      const result = await pokemonRepository.delete(id);

      // Assert
      expect(result).toEqual(pokemonList[0]);
      expect(model.findOneAndDelete).toHaveBeenCalledTimes(1);
      expect(model.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });
  });

  it('should throw an exception', () => {
    // Arrange
    const id = '1';
    jest.spyOn(model, 'findOneAndDelete').mockRejectedValueOnce(new Error());

    // Act and Assert
    expect(pokemonRepository.delete(id)).rejects.toThrow(new Error());
  });
});
