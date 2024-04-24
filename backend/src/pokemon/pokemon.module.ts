import { Module } from "@nestjs/common";
import { PokemonController } from "./pokemon.controller";
import { PokemonService } from "./pokemon.service";
import { PokemonRepository } from "./repository/pokemon.repository";

@Module({
    controllers: [PokemonController],
    providers: [PokemonService, PokemonRepository],
})

export class PokemonModule {}