import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService){}

    @Get()
    findAll() {
        return this.pokemonService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.pokemonService.findOne(id);
    }
}