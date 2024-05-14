import { Test, TestingModule } from '@nestjs/testing';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { Trainer } from './trainer.schema';

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

describe('TrainerController', () => {
  let trainerController: TrainerController;
  let trainerService: TrainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainerController],
      providers: [
        {
          provide: TrainerService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(trainerList),
            findOne: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    trainerController = module.get<TrainerController>(TrainerController);
    trainerService = module.get<TrainerService>(TrainerService);
  });

  it('should be defined', () => {
    expect(trainerController).toBeDefined();
    expect(trainerService).toBeDefined();
  });

  describe('index', () => {
    it('should return a trainer list successfully', async () => {
      // Arrange (Prepare the data)
      // Act (Run the test)
      const result = await trainerController.findAll();
      // Assert (Check the output)
      expect(result).toEqual(trainerList);
      expect(typeof result).toBe('object');
      expect(trainerService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(trainerService, 'findAll').mockRejectedValue(new Error('Failed to fetch trainers'));
      
      // Assert
      expect(trainerController.findAll()).rejects.toThrowError('Failed to fetch trainers');
    });
  });
});
