import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [PokemonModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
