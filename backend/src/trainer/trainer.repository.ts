import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trainer } from './trainer.schema';

@Injectable()
export class TrainerRepository {
  constructor(
    @InjectModel(Trainer.name) private trainerModel: Model<Trainer>,
  ) {}

  async getAll(): Promise<Trainer[]> {
    return await this.trainerModel.find().exec();
  }

  async getById(id: string): Promise<Trainer> {
    return await this.trainerModel.findOne({ id: id }).exec();
  }

  async add(trainer: Trainer): Promise<Trainer> {
    return await this.trainerModel.create(trainer);
  }

  async update(id: string, trainer: Trainer): Promise<Trainer> {
    return await this.trainerModel
      .findOneAndUpdate({ id: id }, trainer, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Trainer> {
    return await this.trainerModel.findOneAndDelete({ id: id }).exec();
  }
}
