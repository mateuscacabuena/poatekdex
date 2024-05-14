import { Test, TestingModule } from '@nestjs/testing';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { Trainer } from './trainer.schema';
import { TrainerDto } from './trainer.dto';

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
            findOne: jest.fn().mockResolvedValue(trainerList[0]),
            insertOne: jest.fn().mockResolvedValue(newTrainer),
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
      jest
        .spyOn(trainerService, 'findAll')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(trainerController.findAll()).rejects.toThrow();
    });
  });

  describe('store', () => {
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
      const result = await trainerController.create(body);

      // Assert
      expect(result).toEqual(newTrainer);
      expect(trainerService.insertOne).toHaveBeenCalledTimes(1);
      expect(trainerService.insertOne).toHaveBeenCalledWith(body);
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
        .spyOn(trainerService, 'insertOne')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(trainerController.create(newTrainer)).rejects.toThrow();
    });
  });

  describe('show', () => {
    it('should get a trainer successfully', async () => {
      // Arrange
      const id = '1';

      // Act
      const result = await trainerController.findOne(id);

      // Assert
      expect(result).toEqual(trainerList[0]);
      expect(trainerService.findOne).toHaveBeenCalledTimes(1);
      expect(trainerService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      // Arrange
      const id = '1';

      jest
        .spyOn(trainerService, 'findOne')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(trainerController.findOne(id)).rejects.toThrow();
    });
  });
});
