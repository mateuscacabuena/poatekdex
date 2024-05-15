import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
  let pokemonController: PokemonController;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [{ provide: PokemonService, useValue: {
        findAll: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue({}),
        insertOne: jest.fn().mockResolvedValue({}),
        updateOne: jest.fn().mockResolvedValue({}),
        deleteOne: jest.fn().mockResolvedValue({}),
      } }],
    }).compile();

    pokemonController = module.get<PokemonController>(PokemonController);
    pokemonService = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(pokemonController).toBeDefined();
    expect(pokemonService).toBeDefined();
  });

  // describe('findAll', () => {
  //   it('should return an array of trainers', () => {
  //     expect(controller.findAll()).toEqual(trainers);
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a trainer', () => {
  //     expect(controller.findOne(1)).toEqual(trainers[0]);
  //   });
  // });

  // describe('create', () => {
  //   it('should create a trainer', () => {
  //     expect(controller.create(newTrainer)).toEqual(newTrainer);
  //   });
  // });

  // describe('update', () => {
  //   it('should update a trainer', () => {
  //     expect(controller.update(1, updatedTrainer)).toEqual(updatedTrainer);
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a trainer', () => {
  //     expect(controller.remove(1)).toEqual(trainers[0]);
  //   });
  // });
});
