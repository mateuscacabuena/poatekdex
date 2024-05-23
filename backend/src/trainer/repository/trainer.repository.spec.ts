import { Test, TestingModule } from '@nestjs/testing';
import { TrainerRepository } from '../repository/trainer.repository';
import { Trainer } from '../trainer.schema';
import { TrainerDto } from '../trainer.dto';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

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

describe('TrainerRepository', () => {
  let trainerRepository: TrainerRepository;
  let model: Model<Trainer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainerRepository,
        {
          provide: getModelToken(Trainer.name),
          useValue: {
            find: jest.fn().mockResolvedValue(trainerList),
            findOne: jest.fn().mockResolvedValue(trainerList[0]),
            create: jest.fn().mockResolvedValue(newTrainer),
            findOneAndUpdate: jest.fn().mockResolvedValue(updatedTrainer),
            findOneAndDelete: jest.fn().mockResolvedValue(trainerList[0]),
          },
        },
      ],
    }).compile();

    trainerRepository = module.get<TrainerRepository>(TrainerRepository);
    model = module.get<Model<Trainer>>(getModelToken(Trainer.name)); // Obter o modelo mockado
  });

  it('should be defined', () => {
    expect(trainerRepository).toBeDefined();
    expect(model).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of trainers', async () => {
      // Act
      const result = await trainerRepository.getAll();

      // Assert
      expect(result).toEqual(trainerList);
      expect(typeof result).toBe('object');
      expect(model.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no Trainers are found', async () => {
      // Arrange
      jest.spyOn(model, 'find').mockResolvedValueOnce([]);

      // Act
      const result = await trainerRepository.getAll();

      // Assert
      expect(result).toEqual([]);
      expect(model.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return a trainer', async () => {
      // Arrange
      const id = '1';

      // Act
      const result = await trainerRepository.getById(id);

      // Assert
      expect(result).toEqual(trainerList[0]);
      expect(model.findOne).toHaveBeenCalledWith({ id: id });
      expect(model.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return undefined when Trainer is not found', async () => {
      // Arrange
      const id = '1';
      jest.spyOn(model, 'findOne').mockResolvedValueOnce({} as Trainer);

      // Act
      const result = await trainerRepository.getById(id);

      // Assert
      expect(result).toEqual({} as Trainer);
      expect(model.findOne).toHaveBeenCalledWith({ id: id });
      expect(model.findOne).toHaveBeenCalledTimes(1);
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
      const result = await trainerRepository.add(body);

      // Assert
      expect(result).toEqual(newTrainer);
      expect(model.create).toHaveBeenCalledTimes(1);
      expect(model.create).toHaveBeenCalledWith(body);
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
      jest.spyOn(trainerRepository, 'add').mockRejectedValueOnce(new Error());

      // Act and Assert
      expect(trainerRepository.add(body)).rejects.toThrow(new Error());
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
      const result = await trainerRepository.update(id, body);

      // Assert
      expect(result).toEqual(updatedTrainer);
      expect(model.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, body, {
        new: true,
      });
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
      jest.spyOn(model, 'findOneAndUpdate').mockRejectedValueOnce(new Error());

      // Act and Assert
      expect(trainerRepository.update(id, body)).rejects.toThrow(new Error());
    });
  });

  describe('delete', () => {
    it('should delete a trainer successfully', async () => {
      // Arrange
      const id = '1';

      // Act
      const result = await trainerRepository.delete(id);

      // Assert
      expect(result).toEqual(trainerList[0]);
      expect(model.findOneAndDelete).toHaveBeenCalledTimes(1);
      expect(model.findOneAndDelete).toHaveBeenCalledWith({ id: id });
    });

    it('should throw an exception', () => {
      // Arrange
      const id = '1';
      jest.spyOn(model, 'findOneAndDelete').mockRejectedValueOnce(new Error());

      // Act and Assert
      expect(trainerRepository.delete(id)).rejects.toThrow(new Error());
    });
  });
});
