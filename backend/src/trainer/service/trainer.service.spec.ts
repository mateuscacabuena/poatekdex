import { Test, TestingModule } from '@nestjs/testing';
import { TrainerRepository } from "../repository/trainer.repository";
import { TrainerService } from "./trainer.service";
import { Trainer } from '../trainer.schema';
import { TrainerDto } from '../trainer.dto';

const trainerList: Trainer[] = [
    {
      id: 1,
      name: 'Ash Ketchum',
      imageUrl: 'https://example.com/ash.jpg',
      pokemons: [
        {
          id: 25,
          name: 'Pikachu',
          imageUrl: 'https://example.com/pikachu.jpg',
        },
      ],
    },
    {
      id: 2,
      name: 'Misty',
      imageUrl: 'https://example.com/misty.jpg',
      pokemons: [
        {
          id: 120,
          name: 'Staryu',
          imageUrl: 'https://example.com/staryu.jpg',
        },
      ],
    },
    {
      id: 3,
      name: 'Brock',
      imageUrl: 'https://example.com/brock.jpg',
      pokemons: [
        {
          id: 74,
          name: 'Geodude',
          imageUrl: 'https://example.com/geodude.jpg',
        },
      ],
    },
  ];
  
  const newTrainer: Trainer = {
    id: 4,
    name: 'May',
    imageUrl: 'https://example.com/may.jpg',
    pokemons: [
      {
        id: 1,
        name: 'Bulbasaur',
        imageUrl: 'https://example.com/bulbasaur.jpg',
      },
    ],
  };
  
  const updatedTrainer: Trainer = {
    id: 1,
    name: 'Ash Ketchum Updated',
    imageUrl: 'https://example.com/ash.jpg',
    pokemons: [
      {
        id: 25,
        name: 'Pikachu',
        imageUrl: 'https://example.com/pikachu.jpg',
      },
    ],
  };

describe('TrainerService', () => {
    let trainerService: TrainerService;
    let trainerRepository: TrainerRepository;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            TrainerService,
            {
            provide: TrainerRepository,
            useValue: {
                getAll: jest.fn().mockResolvedValue(trainerList),
                getById: jest.fn().mockResolvedValue(trainerList[0]),
                add: jest.fn().mockResolvedValue(newTrainer),
                update: jest.fn().mockResolvedValue(updatedTrainer),
                delete: jest.fn().mockResolvedValue(trainerList[0]),
            },
            },
        ],
        }).compile();
    
        trainerService = module.get<TrainerService>(TrainerService);
        trainerRepository = module.get<TrainerRepository>(TrainerRepository);
    });
    
    it('should be defined', () => {
        expect(trainerService).toBeDefined();
        expect(trainerRepository).toBeDefined();
    });
    
    describe('getAll', () => {
        it('should return a list of trainers', async () => {
        // Act
        const result = await trainerService.findAll();
    
        // Assert
        expect(result).toEqual(trainerList);
        expect(typeof result).toBe('object');
        expect(trainerRepository.getAll).toHaveBeenCalledTimes(1);
        });
    
        it('should throw an exception', () => {
        // Arrange
        jest
            .spyOn(trainerRepository, 'getAll')
            .mockRejectedValueOnce(new Error());
    
        // Act and Assert
        expect(trainerService.findAll()).rejects.toThrow(new Error());
        });
    });
    
    describe('getById', () => {
        it('should return a trainer', async () => {
        // Arrange
        const id = '1';
    
        // Act
        const result = await trainerService.findOne(id);
    
        // Assert
        expect(result).toEqual(trainerList[0]);
        expect(trainerRepository.getById).toHaveBeenCalledTimes(1);
        expect(trainerRepository.getById).toHaveBeenCalledWith(id);
        });
    
        it('should throw an exception', () => {
        // Arrange
        const id = '1';
        jest
            .spyOn(trainerRepository, 'getById')
            .mockRejectedValueOnce(new Error());
    
        // Act and Assert
        expect(trainerService.findOne(id)).rejects.toThrow(new Error());
        });
    });
    
    describe('add', () => {
        it('should create a new trainer successfully', async () => {
        // Arrange
        const body: TrainerDto = {
          id: 4,
          name: 'May',
          imageUrl: 'https://example.com/may.jpg',
          pokemons: [
            {
              id: 1,
              name: 'Bulbasaur',
              imageUrl: 'https://example.com/bulbasaur.jpg',
            },
          ],
        };
    
        // Act
        const result = await trainerService.insertOne(body);
    
        // Assert
        expect(result).toEqual(newTrainer);
        expect(trainerRepository.add).toHaveBeenCalledTimes(1);
        expect(trainerRepository.add).toHaveBeenCalledWith(body);
        });
    
        it('should throw an exception', () => {
        // Arrange
        const body: TrainerDto = {
          id: 4,
          name: 'May',
          imageUrl: 'https://example.com/may.jpg',
          pokemons: [
            {
              id: 1,
              name: 'Bulbasaur',
              imageUrl: 'https://example.com/bulbasaur.jpg',
            },
          ],
        };
        jest
            .spyOn(trainerRepository, 'add')
            .mockRejectedValueOnce(new Error());
    
        // Act and Assert
        expect(trainerService.insertOne(newTrainer)).rejects.toThrow(new Error());
        });
    });

    describe('update', () => {
        it('should update a trainer successfully', async () => {
        // Arrange
        const id = '1';
        const body: TrainerDto = {
          id: 1,
          name: 'Ash Ketchum Updated',
          imageUrl: 'https://example.com/ash.jpg',
          pokemons: [
            {
              id: 25,
              name: 'Pikachu',
              imageUrl: 'https://example.com/pikachu.jpg',
            },
          ],
        };
    
        // Act
        const result = await trainerService.updateOne(id, body);
    
        // Assert
        expect(result).toEqual(updatedTrainer);
        expect(trainerRepository.update).toHaveBeenCalledTimes(1);
        expect(trainerRepository.update).toHaveBeenCalledWith(id, body);
        });
    
        it('should throw an exception', () => {
        // Arrange
        const id = '1';
        const body: TrainerDto = {
          id: 1,
          name: 'Ash Ketchum Updated',
          imageUrl: 'https://example.com/ash.jpg',
          pokemons: [
            {
              id: 25,
              name: 'Pikachu',
              imageUrl: 'https://example.com/pikachu.jpg',
            },
          ],
        };
        jest
            .spyOn(trainerRepository, 'update')
            .mockRejectedValueOnce(new Error());
    
        // Act and Assert
        expect(trainerService.updateOne(id, body)).rejects.toThrow(new Error());
        });
    });

    describe('delete', () => {
        it('should delete a trainer successfully', async () => {
        // Arrange
        const id = '1';
    
        // Act
        const result = await trainerService.deleteOne(id);
    
        // Assert
        expect(result).toEqual(trainerList[0]);
        expect(trainerRepository.delete).toHaveBeenCalledTimes(1);
        expect(trainerRepository.delete).toHaveBeenCalledWith(id);
        });
    
        it('should throw an exception', () => {
        // Arrange
        const id = '1';
        jest
            .spyOn(trainerRepository, 'delete')
            .mockRejectedValueOnce(new Error());
    
        // Act and Assert
        expect(trainerService.deleteOne(id)).rejects.toThrow(new Error());
        });
    });
});