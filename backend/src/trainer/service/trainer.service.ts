import { Injectable } from '@nestjs/common';
import { TrainerRepository } from '../repository/trainer.repository';
import { Trainer } from '../trainer.schema';

@Injectable()
export class TrainerService {
  constructor(private readonly trainerRepository: TrainerRepository) {}

  findAll() {
    return this.trainerRepository.getAll();
  }

  findOne(id: string): Promise<Trainer> {
    return this.trainerRepository.getById(id);
  }

  insertOne(trainer: Trainer): Promise<Trainer> {
    return this.trainerRepository.add(trainer);
  }

  updateOne(id: string, trainer: Trainer): Promise<Trainer> {
    return this.trainerRepository.update(id, trainer);
  }

  deleteOne(id: string): Promise<Trainer> {
    return this.trainerRepository.delete(id);
  }
}
