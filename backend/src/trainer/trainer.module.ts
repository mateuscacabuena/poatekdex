import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trainer, TrainerSchema } from './trainer.schema';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TrainerRepository } from './repository/trainer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trainer.name, schema: TrainerSchema }]),
  ],
  controllers: [TrainerController],
  providers: [TrainerService, TrainerRepository],
})

export class TrainerModule {}
