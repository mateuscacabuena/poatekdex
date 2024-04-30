import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { DatabaseModule } from './database/database.module';
import { TrainerModule } from './trainer/trainer.module';

@Module({
  imports: [PokemonModule, DatabaseModule, TrainerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
