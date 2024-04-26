import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id);
  }

  @Post()
  create(@Body() CreatePokemonDto: CreatePokemonDto) {
    return this.pokemonService.insertOne(CreatePokemonDto);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() UpdatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.updateOne(id, UpdatePokemonDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pokemonService.deleteOne(id);
  }
}
